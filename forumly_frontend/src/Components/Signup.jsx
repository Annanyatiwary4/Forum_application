"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-sm bg-slate-950 text-white border-amber-200 border">
        <CardHeader>
          <CardTitle className="text-amber-200">Create your account</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your details below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-amber-200">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="bg-slate-950 text-white border-amber-200 focus:border-amber-300"
                />
              </div>
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
                <Label htmlFor="password" className="text-amber-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-slate-950 text-white border-amber-200 focus:border-amber-300"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full bg-amber-200 text-slate-950 hover:bg-amber-300">
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-slate-950"
          >
            Sign Up with Google
          </Button>
          <p className="text-sm text-gray-300 mt-2 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-amber-200 hover:text-amber-300 underline">
                    Login
                    </a>
                </p>
        </CardFooter>
      </Card>
    </div>
  );
}
