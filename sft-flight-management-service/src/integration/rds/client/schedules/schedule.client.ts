import type { Transaction } from 'sequelize';
import { sequelize } from '../../index';
import { Op, Sequelize } from 'sequelize';
import type { ScheduleAttributes } from '../../../../types/rds/schedule-attributes.type';
import { Schedule } from '../../models/schedule.model';
import { Route } from '../../models/route.model';
import { Flight } from '../../models/flight.model';

export const create = async (scheduleDetails: Omit<ScheduleAttributes, 'id'>): Promise<Schedule> => {
    const transaction: Transaction = await sequelize.transaction();
    console.log(">>>>>>>>>>>>>>>scheduleDetails",typeof scheduleDetails.flightId);
    
    try {
        console.log('Creating Schedule in DB...');
        const newSchedule: Schedule = await Schedule.create(scheduleDetails);
        console.log(`Created Schedule in DB with Id: ${newSchedule.id}`);
        await transaction.commit();
        return newSchedule;
    } catch (err) {
        await transaction.rollback();
        console.error(`Error creating Schedule in DB! Error => ${err}`);
        throw err;
    }
};

export const getScheduleById = async (id: number): Promise<Schedule | null> => {
    try {
        console.log(`Fetching Schedule with Id: ${id}`);
        const schedule = await Schedule.findByPk(id);
        if (schedule) {
            console.log('Schedule found:', schedule);
        }
        else { console.log('Schedule not found.'); }
        return schedule;
    }
    catch (err) {
        console.error(`Error fetching Schedule from DB! Error => ${err}`);
        throw err;
    }
};

export const getAllSchedules = async (
  filters?: { travelDuration?: number; availableDays?: string; departureTime?: Date },
  sortBy?: string | number | Date,
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  page: number = 1
): Promise<{ data: Schedule[]; totalCount: number }> => {
    try {
        console.log('Fetching schedules with filters:', filters || 'Fetching all schedules', `Sorting by: ${sortBy || 'None'} (${sortOrder})`);
        const whereClause: any = {
            isActive: 1
        };
        if (filters?.travelDuration) {
            whereClause.travelDuration = filters.travelDuration;
        }
        if (filters?.availableDays) {
            whereClause.availableDays = { [Op.like]: `%${filters.availableDays}%` };
        }
        if (filters?.departureTime) {
            whereClause.departureTime = filters.departureTime;
        }

        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        console.log('>>>>>sortBy ', sortBy)
        console.log('>>>>>sortOrder', sortOrder)

        const { count, rows } = await Schedule.findAndCountAll({
  where: whereClause,
  ...(sortBy && { order: [[`${sortBy}`, sortOrder]] }),
  offset,
  limit: pageSize,
  include: [
    { model: Flight, attributes: ['flightNumber'] },
    { model: Route, attributes: ['source', 'destination'] }
  ]
});

return { data: rows, totalCount: count };

    } catch (err) {
        console.error(`Error fetching schedules from DB! Error => ${err}`);
        throw err;
    }
};

export const updateScheduleById = async (
    id: number,
    updates: Partial<Schedule>
): Promise<Schedule | null> => {
    try {
        console.log(`Updating Schedule with ID: ${id}`, updates);

        const [affectedRows] = await Schedule.update(updates, {
            where: { id }
        });

        if (affectedRows === 0) {
            console.log('No Schedule updated. Schedule does not exist.');
            return null;
        }

        const updatedSchedule = await Schedule.findByPk(id);

        if (updatedSchedule) {
            console.log('Flight updated successfully:', updatedSchedule);
        }

        return updatedSchedule;
    } catch (err) {
        console.error(`Error updating Schedule in DB! Error => ${err}`);
        throw err;
    }
};