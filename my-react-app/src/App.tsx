import {LoginForm} from "@/components/ui/login-form"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UserAuthForm } from "./components/ui/userAuthForm";
import { ForgotPass } from "./components/ui/forgot-password";
import { Dashboard } from "./components/ui/user/dashboard";
import {Booking} from "./components/ui/user/booking";
import { AdminDashboard } from "./components/ui/admin/admin-dashboard";
import { AuthProvider } from "./context/authContext";
import  ProtectedRoute  from "./components/protectedRoute";
import AdminLayout from "./components/layout/adminLayout";
import {EditFlight} from "./components/ui/admin/edit-flight";
import {EditUserPage} from './components/ui/admin/edit-user'
import { AdminSchedules } from "./components/ui/admin/admin-schedule";
import { AdminPassengers } from "./components/ui/admin/admin-passengers";
import HomePage from "./components/ui/home";
import { Search } from "./components/ui/search";
import AdminFlights from "./components/ui/admin/admin-flights";
import { AddFlight } from "./components/ui/admin/add-flights";
import { AdminRoutes } from "./components/ui/admin/admin-routes";
import  {AddRoute} from "./components/ui/admin/add-route";
import { EditRoute } from "./components/ui/admin/edit-route";
import { EditSchedule } from "./components/ui/admin/edit-schedule";
import { Profile } from "./components/ui/user/profile";

function App() {

    return (
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userAuth" element={<UserAuthForm />} />
          <Route path="/forgotPass" element={<ForgotPass />} />

          {/* User only routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Booking />
              </ProtectedRoute>
            }
          />

          {/* Admin-only route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="flights" element={<AdminFlights/>}/>
            <Route path="routes" element={<AdminRoutes/>}/>
            <Route path="schedules" element={<AdminSchedules/>}/>
            <Route path="passengers" element={<AdminPassengers/>}/>
            <Route path="flights/edit/:scheduleId" element={<EditFlight />} />
            <Route path="routes/edit/:routeId" element={<EditRoute />} />
            <Route path="schedules/edit/:scheduleId" element={<EditSchedule />} />
            <Route path="users/edit/:userId" element={<EditUserPage />} />
            <Route path="addflight" element={<AddFlight />} />
            <Route path="addroute" element={<AddRoute />}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
  
}

export default App;
