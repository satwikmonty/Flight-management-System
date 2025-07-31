"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (form: RegisterFormData) => {
    setIsLoading(true);
    try {

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        userType: "1",
        loginStatus: 0
      };

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.status === 409) {
        setEmailError("An account with this email already exists.");
        return;
      };

      if (res.ok) {
        setSuccessMsg("Registered successfully!");
      } else {
        const errMsg = await res.text();
        console.error("Registration failed:", errMsg);
      }
    } catch (err) {
      console.error("Request error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="tracking-tight text-2xl font-bold">Create an account</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your information to create an account
          </CardDescription>
          <CardAction>
            <Button variant="link"
              onClick={handleClick}
              className="text-blue-500"
            >Login</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    autoComplete="off"
                    {...register("firstName", {
                      onChange: (e) => {
                        const value = e.target.value;
                        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                        setValue("firstName", capitalized);
                      },
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    autoComplete="off"
                    {...register("lastName", {
                      onChange: (e) => {
                        const value = e.target.value;
                        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                        setValue("lastName", capitalized);
                      },
                    })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</Label>
                <Input id="email" {...register("email")} placeholder="email@example.com" autoComplete="off" />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <div className="space-y-2"></div>
                <div>
                  <Label htmlFor="password" className="ext-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</Label>
                </div>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2"></div>
              <div className="space-y-2">
                <div className="space-y-2"></div>
                <div>
                  <Label htmlFor="password" className="ext-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <CardFooter className="flex-col gap-2 pt-8">
              <Button type="submit" disabled={isLoading} className="w-full text-white bg-black">
                {isLoading ? "Registering..." : "Register"}
              </Button>
              {successMsg && (
                <p className="mt-2 text-green-600 font-medium">{successMsg}</p>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}