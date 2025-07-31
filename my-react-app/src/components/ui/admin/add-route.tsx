import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from "react";
import { routeSchema } from "@/components/schemas/route.schema";

const airportCodes = [
    "DEL", "BOM", "BLR", "MAA", "HYD", "CCU", "GOI", "COK", "IXC", "PNQ",
    "LKO", "IXB", "PAT", "JAI", "TRV", "VNS", "IXR", "RPR", "JDH", "UDR",
    "BDQ", "NAG", "IXJ", "BHU", "IXZ", "VTZ", "IMF", "GAU", "IXL", "DIB",
    "TEZ", "SHL", "RJA", "IXM", "IXE", "IXS", "ATQ", "GAY", "JLR", "IXW",
    "BBI", "BHO", "IXH", "SLV", "IXU", "SXR", "JRH", "IXN", "RUP", "LDA",
    "PBD", "HJR", "GWL", "PNY", "IDR", "JGB", "BEP", "NDC", "TNI", "HSS",
    "COH", "VGA", "IXY", "LUH", "KUU", "MZU", "IXV", "IXD"
];


export function AddRoute({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        distance: "",
        fare: ""
    });
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/routes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: formData.source,
                    destination: formData.destination,
                    distance: +formData.distance,
                    fare: +formData.fare
                })
            });

            const result = routeSchema.safeParse(formData);
            if (!result.success) {
                console.log("Validation errors:", result.error.format());
                return;
            }

            if (res.ok) {
                console.log("Route added!");
            } else {
                console.error("Failed to add route");
            }
            setSuccessMsg("Route added successfully!");
        } catch (err) {
            console.error("Request error:", err);
        }
    };


    return (
        <div className={cn("flex flex-col min-h-screen ", className)} {...props}>

            <div className="p-5">
                <a href="/admin/routes" className="text-blue-500">🡠 Back to Routes</a>
                <h1 className="text-3xl font-bold mt-5">Add New Route</h1>

                <div className="flex justify-center items-center p-5">
                    <Card className="flex justify-center rounded-lg bg-card text-card-foreground shadow-sm w-full p-4">
                        <CardHeader>
                            <CardTitle className="font-bold text-2xl">Route Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5 ">
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


                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
                                        <div className="w-full">
                                            <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">Distance(km)</label>
                                            <Input
                                                type="number"
                                                value={formData.distance}
                                                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                                                className="flex flex-col justify-between p-1.5"
                                                placeholder="For eg. 1500"
                                                required
                                            />

                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">Fare(₹)</label>
                                            <div className="flex flex-row gap-2">
                                                <Input
                                                    type="number"
                                                    value={formData.fare}
                                                    onChange={(e) => setFormData({ ...formData, fare: e.target.value })}
                                                    className="flex flex-col justify-between p-1.5"
                                                    placeholder="For eg. 9500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                                        <textarea className="flex flex-col justify-between p-1.5 border rounded-md min-h-[100px] w-full" placeholder="Any special information about this route" />
                                    </div>

                                    <div className="flex flex-row gap-3 justify-end">
                                        <Button
                                            type="submit"
                                            className="bg-white text-black h-9 w-20 px-2 py-0 border-black-300 border-1 pt-0 mt-0 text-sm font-semibold "
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" className=" h-9 w-32 px-2 py-0 border-black-300 border-1 pt-0 mt-0 text-sm font-semibold ">
                                            Add Routes
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
    )
}