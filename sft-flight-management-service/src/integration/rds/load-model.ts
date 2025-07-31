import { Sequelize } from 'sequelize';
import { Flight } from './models/flight.model.js';
import { Schedule } from './models/schedule.model.js';
import { Route } from './models/route.model.js';
import { User } from './models/user.create.model.js';
import { UserProfile } from './models/user.profile.model.js';

export const loadModels = async (sequelize: Sequelize) => {
  Flight.initialize(sequelize);
  Route.initialize(sequelize);
  Schedule.initialize(sequelize);
  User.initialize(sequelize);
  UserProfile.initialize(sequelize);

  Route.hasMany(Schedule, { foreignKey: "routeId" });
  Schedule.belongsTo(Route, { as: "Route", foreignKey: "routeId" });

  Flight.hasMany(Schedule, { foreignKey: "flightId" });
  Schedule.belongsTo(Flight, { as: "Flight", foreignKey: "flightId" });
};
