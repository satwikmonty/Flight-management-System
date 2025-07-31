import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPass() {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("We've sent password recovery instructions to your email.");
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <Card className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-4">
            <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className='tracking-tight text-2xl font-bold'>Find Your Account</CardTitle>
          <CardDescription className='text-sm text-muted-foreground mb-2'>
            Enter your email
          </CardDescription>
        </CardHeader>
        <CardContent className='-6 pt-0 space-y-4'>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 m-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-2">
          You will receive steps to login to your account on your email
          <br />
          <Button type="submit" className="w-full text-white bg-black">
            Continue
          </Button>
          {successMsg && (
            <p className="mt-2 text-green-600 text-sm font-medium">{successMsg}</p>
          )}
        </CardFooter>
          </form>
      </Card>
    </div>
  );
}