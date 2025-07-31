import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CalendarDays, ChartColumn, Clock4, Plane, Users } from "lucide-react";

export default function AdminLayout() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const clicked = () => {
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r bg-gray-100">
        <SidebarHeader>
          <div className="px-2 mb-8">
            <h2 className="text-xl font-bold">XYZ Air Travels</h2>
            <p className="text-gray-500 text-sm">Admin Dashboard</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="p-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/admin/dashboard"}
                onClick={() => setActiveLink("dashboard")}
                className={
                  location.pathname === "/admin/dashboard"
                    ? "bg-gray-200 text-black p-4 h-12"
                    : "hover:bg-gray-200 p-4 h-12"
                }
              >
                <a href="/admin/dashboard">
                  <ChartColumn />
                  <span className="text-[16px]">Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/admin/flights"}
                onClick={() => setActiveLink("flights")}
                className={
                  location.pathname === "/admin/flights"
                    ? "bg-gray-200 text-black p-4 h-12"
                    : "hover:bg-gray-200 p-4 h-12"
                }
              >
                <a href="/admin/flights">
                  <Plane />
                  <span className="text-[16px]">Flights</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/admin/routes"}
                onClick={() => setActiveLink("routes")}
                className={
                  location.pathname === "/admin/routes"
                    ? "bg-gray-200 text-black p-4 h-12"
                    : "hover:bg-gray-200 p-4 h-12"
                }
              >
                <a href="/admin/routes">
                  <CalendarDays />
                  <span className="text-[16px]">Routes</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/admin/schedules"}
                onClick={() => setActiveLink("schedules")}
                className={
                  location.pathname === "/admin/schedules"
                    ? "bg-gray-200 text-black p-4 h-12"
                    : "hover:bg-gray-200 p-4 h-12"
                }
              >
                <a href="/admin/schedules">
                  <Clock4 />
                  <span className="text-[16px]">Schedules</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/admin/passengers"}
                onClick={() => setActiveLink("passengers")}
                className={
                  location.pathname === "/admin/passengers"
                    ? "bg-gray-200 text-black p-4 h-12"
                    : "hover:bg-gray-200 p-4 h-12"
                }
              >
                <a href="/admin/passengers">
                  <Users />
                  <span className="text-[16px]">Passengers</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="p-4 border-b flex gap-6 items-start justify-items-start">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold ml-14">Admin User</h1>
          <Button variant="link"
            onClick={clicked}
            className='border rounded-lg'
          >Logout</Button>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
