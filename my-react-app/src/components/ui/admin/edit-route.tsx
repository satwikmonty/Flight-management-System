import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const airportCodes = [
    "DEL", "BOM", "BLR", "MAA", "HYD", "CCU", "GOI", "COK", "IXC", "PNQ",
    "LKO", "IXB", "PAT", "JAI", "TRV", "VNS", "IXR", "RPR", "JDH", "UDR",
    "BDQ", "NAG", "IXJ", "BHU", "IXZ", "VTZ", "IMF", "GAU", "IXL", "DIB",
    "TEZ", "SHL", "RJA", "IXM", "IXE", "IXS", "ATQ", "GAY", "JLR", "IXW",
    "BBI", "BHO", "IXH", "SLV", "IXU", "SXR", "JRH", "IXN", "RUP", "LDA",
    "PBD", "HJR", "GWL", "PNY", "IDR", "JGB", "BEP", "NDC", "TNI", "HSS",
    "COH", "VGA", "IXY", "LUH", "KUU", "MZU", "IXV", "IXD"
];


export function EditRoute({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { routeId } = useParams();
    const routeIdNum = Number(routeId);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        distance: "",
        fare: "",
    });
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        if (!routeIdNum) return;
        (async () => {
            try {
                const res = await fetch(`http://localhost:3000/routes/${routeIdNum}`);
                const json = await res.json();
                const route = json.data;
                if (!route) throw new Error("Route not found");

                setFormData({
                    source: route.source,
                    destination: route.destination,
                    distance: route.distance.toString(),
                    fare: route.fare.toString(),
                });
            } catch (err) {
                console.error("Failed to fetch route data:", err);
            }
        })();
    }, [routeIdNum]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3000/routes/${routeIdNum}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: formData.source,
                    destination: formData.destination,
                    distance: Number(formData.distance),
                    fare: Number(formData.fare),
                }),
            });
            setSuccessMsg("Route updated successfully!");
        } catch (err) {
            console.error("Failed to update route:", err);
        }
    };

    return (
        <div className={cn("flex flex-col min-h-screen", className)} {...props}>
            <div className="p-5">
                <a href="/admin/routes" className="text-blue-500">🡠 Back to Routes</a>
                <h1 className="text-3xl font-bold mt-5">Edit Route</h1>

                <div className="flex justify-center items-center p-5">
                    <Card className="flex justify-center rounded-lg bg-card text-card-foreground shadow-sm w-full p-4">
                        <CardHeader>
                            <CardTitle className="font-bold text-2xl">Route Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5">
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 justify-between">
                                        <div className="w-full">
                                            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Origin Airport</label>
                                            <Select
                                                value={formData.source}
                                                onValueChange={(val) => setFormData({ ...formData, source: val })}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Origin Airport" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {airportCodes.map((code) => (
                                                        <SelectItem key={code} value={code} disabled={code === formData.destination}>
                                                            {code}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination Airport</label>
                                            <Select
                                                value={formData.destination}
                                                onValueChange={(val) => setFormData({ ...formData, destination: val })}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Destination Airport" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {airportCodes.map((code) => (
                                                        <SelectItem key={code} value={code} disabled={code === formData.source}>
                                                            {code}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                        <div className="w-full">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                                            <Input
                                                type="number"
                                                value={formData.distance}
                                                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                                                className="p-1.5"
                                                required
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fare (₹)</label>
                                            <Input
                                                type="number"
                                                value={formData.fare}
                                                onChange={(e) => setFormData({ ...formData, fare: e.target.value })}
                                                className="p-1.5"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                                        <textarea
                                            className="flex flex-col justify-between p-1.5 border rounded-md min-h-[100px] w-full"
                                            placeholder="Any special information about this route"
                                            disabled
                                        />
                                    </div>

                                    <div className="flex flex-row gap-3 justify-end">
                                        <Button
                                            type="button"
                                            className="bg-white text-black h-9 w-20 px-2 border-black border pt-0 text-sm font-semibold"
                                            onClick={() => navigate("/admin/routes")}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="h-9 w-32 px-2 pt-0 text-sm font-semibold">
                                            Update Route
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
