import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateUserProfileRequestSchema } from "../../utils/schemas/users/create-user-profile.schema";
import { handleErrorResponse, handleSuccessResponse } from "../../utils/helpers/response.helper";
import { loadSequelize } from "../../integration/rds";
import { loadModels } from "../../integration/rds/load-model";
import type { CreateUserProfileRequest } from "../../types/dto/user-profile-request.dto";
import type { CreateUserProfileResponse, GetUserProfileResponse } from "../../types/dto/user-profile-response.dto";
import { execute as createUserProfile } from "../../services/usecases/users/create-user-profile.usecase";
import { executeGetAllUserProfiles } from "../../services/usecases/users/get-all-user-profile.usecase";
import { UserProfile } from "../../integration/rds/models/user.profile.model";
import { ERROR_MSG, SUCCESS_MSG } from "../../utils/constants/message.constant";
import { executeUpdateUserProfileById } from "../../services/usecases/users/update-user-profile.usecase";

const userProfileRoutes = new Hono();

userProfileRoutes.post(
  '/',
  zValidator('json', CreateUserProfileRequestSchema, (result, c) => {
    if (!result.success) {
      return handleErrorResponse(c, 400, 'Invalid UserProfile Request Body', result.error.toString());
    }
  }),
  async (c) => {
    try {
      const sequelize = await loadSequelize(loadModels);
      if (!sequelize) {
        return handleErrorResponse(c, 500, "Database connection failed");
      }
      UserProfile.initialize(sequelize);

      const newProfileData = await c.req.json<CreateUserProfileRequest>();
      const newProfile: CreateUserProfileResponse = await createUserProfile(newProfileData);

      return handleSuccessResponse<CreateUserProfileResponse>(
        c,
        201,
        newProfile,
        SUCCESS_MSG.CREATE_USER_PROFILE
      );
    } catch (err: any) {
      console.error("Failed to create user profile:", err);
      return handleErrorResponse(c, 500, ERROR_MSG.CREATE_USER_PROFILE, err);
    }
  }
);

userProfileRoutes.post(
  '/search',
  async (c) => {
    try {
      await loadSequelize(loadModels);
      const { email, userId, sortOrder } = await c.req.json();
      const profiles = await executeGetAllUserProfiles({ email, userId }, sortOrder);

      return handleSuccessResponse<GetUserProfileResponse[]>(
        c,
        200,
        profiles,
        SUCCESS_MSG.GET_ALL_USER_PROFILE
      );
    } catch (err: any) {
      console.error("Error searching user profiles:", err);
      return handleErrorResponse(c, 500, ERROR_MSG.GET_ALL_USER_PROFILE, err);
    }
  }
);

userProfileRoutes.patch(
  '/:id',
  async (c) => {
    try {
      await loadSequelize(loadModels);

      const profileId = Number(c.req.param('id'));
      if (isNaN(profileId)) {
        return handleErrorResponse(c, 400, 'Invalid UserProfile ID');
      }

      const updates = await c.req.json();

      const updatedProfile = await executeUpdateUserProfileById(profileId, updates);

      if (!updatedProfile) {
        return handleErrorResponse(c, 404, 'User profile not found or not updated');
      }

      return handleSuccessResponse(c, 200, updatedProfile, SUCCESS_MSG.UPDATE_USER_PROFILE);
    } catch (err: any) {
      return handleErrorResponse(c, 500, ERROR_MSG.UPDATE_USER_PROFILE, err);
    }
  }
);


export default userProfileRoutes;