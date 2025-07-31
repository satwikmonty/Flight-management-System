import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function Profile() {
    const navigate = useNavigate();
    const logout = () => {
        navigate('/login');
    }
    const [profileData, setProfileData] = useState<{
        id: number;
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
        dob: string;
        gender: string;
        mobileNo: string;
        street: string;
        location: string;
        city: string;
        state: string;
        pincode: string;
    }>({
        id: 0,
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        mobileNo: "",
        street: "",
        location: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);


    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        console.log("Session userId:", userId);
        if (!userId) {
            console.warn("No userId found in sessionStorage. Skipping profile fetch.");
            return;
        }

        (async () => {
            try {
                const res = await fetch("http://localhost:3000/userprofiles/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId })
                });
                const json = await res.json();
                const user = json.data?.[0];
                console.log("Fetched user profile:", user);
                if (user) {
                    setProfileData(user);
                }
            } catch (err) {
                console.error("Failed to load profile:", err);
            }
        })();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const userId = Number(profileData.userId);
            const res = await fetch(`http://localhost:3000/userprofiles/${profileData.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData)
            });
            if (res.ok) {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/users/${profileData.userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: passwords.newPassword
                })
            });

            if (res.ok) {
                setPasswordSuccess("Password updated successfully.");
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                const msg = await res.text();
                setPasswordError("Password update failed: " + msg);
            }
        } catch (err) {
            console.error("Password update error:", err);
            setPasswordError("Something went wrong while updating the password.");
        }
    };


    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.id]: e.target.value });
    };


    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 py-2 mb-3 flex justify-between items-center p-2">
                    <h1 className="text-3xl font-bold">XYZ Flight Travel</h1>
                    <nav className="flex gap-4 items-center">
                        <a href="/dashboard" className="p-2">Dashboard</a>
                        <a href="/profile" className="p-2">Profile</a>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                            onClick={logout}>Logout</button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 mx-auto container px-4 py-4">
                <h2 className="text-5xl font-bold mb-4">My Profile</h2>
                <Tabs defaultValue={"personalInformations"}>
                    <TabsList className="w-full gap-3">
                        <TabsTrigger value="personalInformations" className="hover:bg-[#FFFFFF]">Personal Informations</TabsTrigger>
                        <TabsTrigger value="security" className="hover:bg-[#FFFFFF]">Security</TabsTrigger>
                        {/* <TabsTrigger value="preferences" className="hover:bg-[#FFFFFF]">Preferences</TabsTrigger> */}
                    </TabsList>

                    <TabsContent value="personalInformations">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                                    <div className="flex flex-col gap-6 p-2 rounded-lg">
                                        <div className="flex gap-10">
                                            <div className="grid gap-3 w-full">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    name="firstName"
                                                    value={profileData.firstName}
                                                    onChange={handleChange}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="grid gap-3 w-full">
                                                <Label htmlFor="lastName">Second Name</Label>
                                                <Input
                                                    name="lastName"
                                                    value={profileData.lastName}
                                                    onChange={handleChange}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={profileData.email}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="phoneNumber">Mobile Number</Label>
                                            <Input
                                                name="mobileNo"
                                                type="tel"
                                                value={profileData.mobileNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                name="street"
                                                value={profileData.street}
                                                onChange={handleChange}
                                                placeholder="Flat No. 302, Orchid Heights"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="gender">Gender</Label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={profileData.gender}
                                                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                                className="border border-input rounded-md px-3 py-2 w-sm mt-1"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-10">
                                            <div className="grid gap-3 w-full">
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    name="city"
                                                    value={profileData.city}
                                                    onChange={handleChange}
                                                    placeholder="City"
                                                />
                                            </div>
                                            <div className="grid gap-3 w-full">
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    name="state"
                                                    value={profileData.state}
                                                    onChange={handleChange}
                                                    placeholder="State"
                                                />
                                            </div>
                                            <div className="grid gap-3 w-full">
                                                <Label htmlFor="pincode">Pin Code</Label>
                                                <Input
                                                    name="pincode"
                                                    value={profileData.pincode}
                                                    onChange={handleChange}
                                                    placeholder="Pincode"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button type="submit" className="bg-black text-white">
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Change Password</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordUpdate}>
                                    <div className="flex flex-col gap-6 p-2 rounded-lg">
                                        <div className="grid gap-3">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <Input
                                                id="currentPassword"
                                                type="password"
                                                value={passwords.currentPassword}
                                                onChange={handlePasswordInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input
                                                id="newPassword"
                                                type="password"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                value={passwords.confirmPassword}
                                                onChange={handlePasswordInputChange}
                                                required
                                            />
                                        </div>
                                        {passwordError && (
                                            <p className="text-red-600 text-sm font-medium">{passwordError}</p>
                                        )}
                                        {passwordSuccess && (
                                            <p className="text-green-600 text-sm font-medium">{passwordSuccess}</p>
                                        )}
                                        <div className="flex justify-end">
                                            <Button type="submit" className="bg-black text-white">
                                                Update Password
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* 
      <TabsContent value="preferences">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Travel Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <h1 className="font-semibold mb-4">Seat Preference</h1>
              <RadioGroup className="grid grid-cols-1 md:grid-cols-3 gap-2" defaultValue="window">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="window" id="window" />
                  <Label htmlFor="window">Window</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="middle" id="middle" />
                  <Label htmlFor="middle">Middle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aisle" id="aisle" />
                  <Label htmlFor="aisle">Aisle</Label>
                </div>
              </RadioGroup>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      */}
                </Tabs>
            </main>

            <footer className="bg-gray-100 py-6 mt-8">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-600">
                        @2025 XYZ Travels Ltd. All rights are reserved.
                    </p>
                </div>
            </footer>
        </div>

    )
}

