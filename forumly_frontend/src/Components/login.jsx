"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom"; 

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-sm bg-slate-950 text-white border-amber-200 border">
        <CardHeader>
          <CardTitle className="text-amber-200">Login to your account</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your email below to login
          </CardDescription>
          <CardAction>
            <Button asChild variant="link" className="text-amber-200 hover:text-amber-300">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-amber-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-slate-950 text-white border-amber-200 focus:border-amber-300"
                />
              </div>
              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-amber-200">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-amber-200 hover:text-amber-300 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-slate-950 text-white border-amber-200 focus:border-amber-300"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-amber-200 text-slate-950 hover:bg-amber-300 cursor-pointer"
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-slate-950 cursor-pointer"
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}