"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }), // <-- send username
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

    // ✅ Save token from backend
    localStorage.setItem("token", data.token);
      // After storing token
      const userRes = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
           Authorization: `Bearer ${data.token}`,
        },
      })
        if (!userRes.ok) throw new Error("Failed to fetch user");

          const userData = await userRes.json();
          console.log("Fetched user:", userData);

          localStorage.setItem("username", userData.username);
     
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-sm bg-slate-950 text-white border-amber-200 border">
        <CardHeader>
          <CardTitle className="text-amber-200">Login to your account</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your username below to login
          </CardDescription>
          <CardAction>
            <Button asChild variant="link" className="text-amber-200 hover:text-amber-300">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-amber-200">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="JohnDoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950 text-white border-amber-200 focus:border-amber-300"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-amber-200 text-slate-950 hover:bg-amber-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
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
