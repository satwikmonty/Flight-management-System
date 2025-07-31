import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateUserRequestSchema } from "../../utils/schemas/users/create-user.schema";
import { handleErrorResponse, handleSuccessResponse } from "../../utils/helpers/response.helper";
import { loadSequelize } from "../../integration/rds";
import { loadModels } from "../../integration/rds/load-model";
import type { CreateUserRequest } from "../../types/dto/user-create-request.dto";
import type { CreateUserResponse, GetAllUsersResponse } from "../../types/dto/user-create-response.dto";
import { execute } from "../../services/usecases/users/create-user.usecase";
import { ERROR_MSG, SUCCESS_MSG } from "../../utils/constants/message.constant";
import { User } from "../../integration/rds/models/user.create.model";
import { executeGetAllUsers } from "../../services/usecases/users/get-all-user.usecase";
import { executeUpdateUserById } from "../../services/usecases/users/update-user.usercase";


const userRoutes = new Hono();

userRoutes.post(
	'/',
	zValidator('json', CreateUserRequestSchema, (result, c) => {
		if (!result.success) {
			return handleErrorResponse(c, 400, 'Invalid User Request Body', result.error.toString());
		}
	}),
	async (c) => {
		try {
			const sequelize = await loadSequelize(loadModels);
			if (!sequelize) {
				return handleErrorResponse(c, 500, "Database connection failed");
			}
			User.initialize(sequelize);

			const newUserDetails = await c.req.json<CreateUserRequest>();

			const baseId = `${newUserDetails.firstName.toLowerCase()}.${newUserDetails.lastName.toLowerCase()}`;
			let userId = baseId;
			let counter = 1;
			
			while (await User.findOne({ where: { userId } })) {
				userId = `${baseId}_${counter}`;
				counter++;
			}
			newUserDetails.userId = userId

			const existingUser = await User.findOne({ where: { email: newUserDetails.email } });


			if (existingUser) {
				return handleErrorResponse(c, 409, "An account with this email already exists");
			}

			const newUserResponse: CreateUserResponse = await execute(newUserDetails);

			return handleSuccessResponse<CreateUserResponse>(c, 201, newUserResponse, SUCCESS_MSG.CREATE_USER);
		} catch (err: any) {
			console.error("Failed to create user:", err);
			return handleErrorResponse(c, 500, ERROR_MSG.CREATE_USER, err as any);
		}
	}
);

userRoutes.post(
	'/search',
	async (c) => {
		try {
			await loadSequelize(loadModels);
			const { email, password, sortOrder } = await c.req.json();
			console.log("Sort Order: ", sortOrder)
			const users = await executeGetAllUsers({email},sortOrder);

			return handleSuccessResponse<GetAllUsersResponse[]>(c, 200, users, SUCCESS_MSG.GET_ALL_USER);
		} catch (err: any) {
			return handleErrorResponse(c, 500, ERROR_MSG.GET_ALL_USER, err as any);
		}
	}
);

userRoutes.patch(
  '/:id',
  async (c) => {
    try {
      await loadSequelize(loadModels);

      const userId = Number(c.req.param('id'));
      if (isNaN(userId)) {
        return handleErrorResponse(c, 400, 'Invalid User ID');
      }

      const updates = await c.req.json();

      const updatedUser = await executeUpdateUserById(userId, updates); 

      if (!updatedUser) {
        return handleErrorResponse(c, 404, 'User not found or not updated');
      }

      return handleSuccessResponse(c, 200, updatedUser, SUCCESS_MSG.UPDATE_USER);
    } catch (err: any) {
      return handleErrorResponse(c, 500, ERROR_MSG.UPDATE_USER, err);
    }
  }
);


export default userRoutes;


