import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function EditSchedule({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const scheduleIdNum = Number(scheduleId);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    departureTime: "",
    travelDuration: "",
    availableDays: ""
  });

  useEffect(() => {
    if (!scheduleIdNum) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/schedules/${scheduleIdNum}`);
        const json = await res.json();
        const schedule = json.data;
        if (!schedule) throw new Error("Schedule not found");

        const dep = new Date(schedule.departureTime);
        const depISO = dep.toISOString().slice(0, 16);

        setFormData({
          departureTime: depISO,
          travelDuration: schedule.travelDuration.toString(),
          availableDays: schedule.availableDays || ""
        });
      } catch (err) {
        console.error("Failed to load schedule:", err);
      }
    })();
  }, [scheduleIdNum]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/schedules/${scheduleIdNum}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departureTime: new Date(formData.departureTime).toISOString(),
          travelDuration: Number(formData.travelDuration),
          availableDays: formData.availableDays
        })
      });

      setSuccessMsg("Schedule updated successfully!");
    } catch (err) {
      console.error("Failed to update schedule:", err);
    }
  };

  return (
    <div className={cn("flex flex-col min-h-screen", className)} {...props}>
      <div className="p-5">
        <a href="/admin/schedules" className="text-blue-500">🡠 Back to Schedules</a>
        <h1 className="text-3xl font-bold mt-5">Edit Schedule</h1>

        <div className="flex justify-center items-center p-5">
          <Card className="flex justify-center rounded-lg bg-card text-card-foreground shadow-sm w-full p-4">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Schedule Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                      <Input
                        type="datetime-local"
                        value={formData.departureTime}
                        onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                        className="p-1.5"
                        required
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Travel Duration (min)</label>
                      <Input
                        type="number"
                        value={formData.travelDuration}
                        onChange={(e) => setFormData({ ...formData, travelDuration: e.target.value })}
                        className="p-1.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                    <Input
                      type="text"
                      value={formData.availableDays}
                      onChange={(e) => setFormData({ ...formData, availableDays: e.target.value })}
                      className="p-1.5"
                      placeholder="e.g. MON WED FRI"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      className="flex flex-col justify-between p-1.5 border rounded-md min-h-[100px] w-full"
                      placeholder="Any additional notes for this schedule"
                      disabled
                    />
                  </div>

                  <div className="flex flex-row gap-3 justify-end">
                    <Button
                      type="button"
                      className="bg-white text-black h-9 w-20 px-2 border-black border pt-0 text-sm font-semibold"
                      onClick={() => navigate("/admin/schedules")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="h-9 w-32 px-2 pt-0 text-sm font-semibold">
                      Update Schedule
                    </Button>
                    {successMsg && (
                      <p className="mt-2 text-green-600 font-medium">{successMsg}</p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
