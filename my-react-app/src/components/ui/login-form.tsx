import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, type LoginInput } from '../schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const handleClick = () => {
    navigate('/userAuth');
  };

  const clicked = () => {
    navigate('/forgotPass');
  };

  const handleLogin = async (data: LoginInput) => {
    setFormError(null);

    try {
      const res = await fetch("http://localhost:3000/users/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();
      if (Array.isArray(result.data) && result.data.length > 0) {
        const user = result.data[0];
        if (user.password !== data.password) {
          setFormError("Incorrect password");
          return;
        }

        const fullName = `${user.firstName} ${user.lastName}`;
        
        sessionStorage.setItem("userId", user.id.toString())
        sessionStorage.setItem("fullName", fullName);
        sessionStorage.setItem("LoginId", "1");

        const role = user.userType === 2 ? 'admin' : 'user';
        login({ username: user.firstName || user.email, role });

        navigate(role === 'admin' ? "/admin/dashboard" : "/dashboard");
      } else {
        setFormError("No matching user found");
      }
    } catch (err) {
      console.error("Login error:", err);
      setFormError("Something went wrong. Try again.");
    }
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <Card className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-4">
        <CardHeader >
          <CardTitle className='tracking-tight text-2xl font-bold'>Login</CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>
            Enter your credentials below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link"
              onClick={handleClick}
              className='text-blue-500'
            >Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent className='-6 pt-0 space-y-4'>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" {...register("email")} autoComplete='off' />
                {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-500"
                    onClick={clicked}
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
              </div>
              {formError && <p className="text-red-600 text-sm mt-1">{formError}</p>}
            </div>
            <CardFooter className="flex-col gap-2 p-4">
              <Button type="submit" className="w-full text-white bg-black">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
