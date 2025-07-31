import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import flightRoutes from './routes/flights/flights.route';
import scheduleRoutes from './routes/schedules/schedule.route';
import routeRoutes from './routes/routes/routes.route';
import userRoutes from './routes/users/users.route'
import userProfileRoutes from './routes/users/users.profiles.route';

const app = new Hono();
app.use(cors());

// Flights Router

app.route('/flights', flightRoutes);
app.route('/schedules', scheduleRoutes);
app.route('/routes', routeRoutes);
app.route('/users', userRoutes);
app.route('/userprofiles', userProfileRoutes);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Listening on http://localhost:${info.port}`);
	}
);
