import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { loadSequelize } from '../../integration/rds/index';
import { loadModels } from '../../integration/rds/load-model';
import { execute } from '../../services/usecases/schedules/create-schedule.usecase';
import type { CreateScheduleRequest } from '../../types/dto/schedules-request.dto';
import type { CreateScheduleResponse, GetAllSchedulesResponse, GetScheduleResponse } from '../../types/dto/schedules-response.dto';
import { ERROR_MSG, SUCCESS_MSG } from '../../utils/constants/message.constant.js';
import { handleErrorResponse, handleSuccessResponse } from '../../utils/helpers/response.helper.js';
import { CreateScheduleRequestSchema } from '../../utils/schemas/schedules/create-schedule.schema';
import { executeGetScheduleById } from '../../services/usecases/schedules/get-schedules.usecase';
import { executeUpdateScheduleById } from '../../services/usecases/schedules/update-schedule.usecase';
import { Op } from "sequelize";
import { Route } from '../../integration/rds/models/route.model';
import { Flight } from '../../integration/rds/models/flight.model';
import { Schedule } from '../../integration/rds/models/schedule.model';
import { Sequelize, DataTypes, Model } from 'sequelize';
import moment from "moment-timezone";

const scheduleRoutes = new Hono();

scheduleRoutes.post(
  '/',
  zValidator('json', CreateScheduleRequestSchema, (result, c) => {
    if (!result.success) {
      return handleErrorResponse(c, 400, 'Invalid Schedule Request Body', result.error.toString());
    }
  }),
  async (c) => {
    try {


      await loadSequelize(loadModels);
      const newScheduleDetails = await c.req.json<CreateScheduleRequest>();
      console.log(">>>>>>>>>>>>>>>>>>>>model", newScheduleDetails);
      const newScheduleResponse: CreateScheduleResponse = await execute(newScheduleDetails);
      return handleSuccessResponse<CreateScheduleResponse>(c, 201, newScheduleResponse, SUCCESS_MSG.CREATE_SCHEDULE);
    } catch (err: any) {
      return handleErrorResponse(c, 500, ERROR_MSG.CREATE_SCHEDULE, err as any);
    }
  }
);

scheduleRoutes.post('/search', async (c) => {
  try {
    await loadSequelize(loadModels);
    const {
      from,
      to,
      departure,
      maxFare,
      flightName,
      page,
      paginated = true
    } = await c.req.json();
    console.log("Received filters:", {
      from,
      to,
      departure,
      maxFare,
      flightName
    });
    const whereClause: any = {
      isActive: 1
    };
    const includeClause: any[] = [{
      model: Route,
      as: 'Route',
      where: {},
    },
    {
      model: Flight,
      as: 'Flight',
      where: {},
    },
    ];
    if (from) includeClause[0].where.source = from;
    if (to) includeClause[0].where.destination = to;
    if (flightName) includeClause[1].where.flightName = flightName;
    if (departure) {
      const startUTC = moment.tz(departure, "YYYY-MM-DD", "Asia/Kolkata").startOf("day").utc().format("YYYY-MM-DD HH:mm:ss");
      const endUTC = moment.tz(departure, "YYYY-MM-DD", "Asia/Kolkata").endOf("day").utc().format("YYYY-MM-DD HH:mm:ss");
      whereClause.departureTime = {
        [Op.between]: [startUTC, endUTC]
      };
    }
    if (maxFare) {
      includeClause[0].where.fare = {
        [Op.lte]: maxFare,
      };
    }
    if (!paginated) {
      const schedules = await Schedule.findAll({
        where: whereClause,
        include: includeClause
      });
      return handleSuccessResponse(c, 200, schedules, "Full schedule list returned");
    }
    const pageSize = 10;
    const currentPage = Number(page || 1);
    const offset = (currentPage - 1) * pageSize;
    const {
      count,
      rows
    } = await Schedule.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: pageSize,
      offset
    });
    return handleSuccessResponse(c, 200, {
      data: rows,
      totalCount: count
    }, "Filtered schedules returned");
  } catch (err) {
    console.error("Error fetching schedules:", err);
    return handleErrorResponse(c, 500, "Something went wrong while searching schedules");
  }
});




scheduleRoutes.get(
  '/:id',
  async (c) => {
    try {
      await loadSequelize(loadModels);
      const scheduleId = Number(c.req.param('id'));
      if (isNaN(scheduleId)) {
        return handleErrorResponse(c, 400, 'Invalid Schedule ID');
      }
      const schedule = await executeGetScheduleById(scheduleId);
      if (!schedule) {
        return handleErrorResponse(c, 404, 'Schedule not found');
      }
      return handleSuccessResponse<GetScheduleResponse>(c, 200, schedule, SUCCESS_MSG.GET_SCHEDULE);
    } catch (err: any) {
      return handleErrorResponse(c, 500, ERROR_MSG.GET_SCHEDULE, err as any);
    }
  }
);

scheduleRoutes.patch(
  '/:id',
  async (c) => {
    try {
      await loadSequelize(loadModels);
      const scheduleId = Number(c.req.param('id'));
      if (isNaN(scheduleId)) {
        return handleErrorResponse(c, 400, 'Invalid Schedule ID');
      }
      const updates = await c.req.json();

      if ("is_active" in updates) {
        updates.isActive = updates.is_active;
        delete updates.is_active;
      };

      const updatedSchedule = await executeUpdateScheduleById(scheduleId, updates);
      if (!updatedSchedule) {
        return handleErrorResponse(c, 404, 'Schedule not found or not updated');
      };

      return handleSuccessResponse(c, 200, updatedSchedule, SUCCESS_MSG.UPDATE_FLIGHT);
    } catch (err: any) {
      return handleErrorResponse(c, 500, ERROR_MSG.UPDATE_FLIGHT, err);
    }
  }
);

export default scheduleRoutes;