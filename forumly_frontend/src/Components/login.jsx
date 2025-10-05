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
  const [warning, setWarning] = useState(""); // <-- simple warning message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWarning(""); // reset warning

    if (!username || !password) {
      setWarning("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data.message?.toLowerCase() || "";
        if (message.includes("user not found")) {
          setWarning("User not found. Please sign up first.");
        } else if (message.includes("invalid credentials")) {
          setWarning("Invalid username or password.");
        } else {
          setWarning(data.message || "Login failed. Try again.");
        }
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      const userRes = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      if (!userRes.ok) {
        setWarning("Failed to fetch user.");
        setLoading(false);
        return;
      }

      const userData = await userRes.json();
      localStorage.setItem("username", userData.username);

      navigate("/dashboard");
    } catch (err) {
      setWarning("Server unreachable. Please try again later.");
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
            Enter your username and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {warning && (
              <div className="text-yellow-400 text-sm font-medium">
                {warning}
              </div>
            )}

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

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-amber-200">Password</Label>
                <a href="#" className="ml-auto text-sm text-amber-200 hover:text-amber-300 underline-offset-4 hover:underline">
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