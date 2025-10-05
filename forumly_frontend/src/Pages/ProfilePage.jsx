"use client";

import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React, { useEffect, useState } from "react";


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch current user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setIsError(true);
        setMessage(err.message);
        setOpen(true);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setUser(updated);
      setIsError(false);
      setMessage("Profile updated successfully 🎉");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setOpen(true);
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center text-amber-600 mt-10">Loading profile...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white p-4">
      <Card className="w-full max-w-lg bg-slate-800 border-amber-600 shadow-xl">
        <CardHeader>
          <CardTitle className="text-amber-500 text-center text-2xl">My Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label className="text-amber-400">Username</Label>
              <Input
                value={user.username}
                disabled
                className="bg-slate-700 border-amber-700 text-white"
              />
            </div>

            <div>
              <Label className="text-amber-400">Email</Label>
              <Input
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="bg-slate-700 border-amber-700 text-white"
              />
            </div>

            <div>
              <Label className="text-amber-400">Bio</Label>
              <Input
                name="bio"
                value={user.bio || ""}
                onChange={handleChange}
                className="bg-slate-700 border-amber-700 text-white"
              />
            </div>

            <div>
              <Label className="text-amber-400">GitHub Link</Label>
              <Input
                name="githubLink"
                value={user.githubLink || ""}
                onChange={handleChange}
                className="bg-slate-700 border-amber-700 text-white"
              />
            </div>

            <div>
              <Label className="text-amber-400">LinkedIn Link</Label>
              <Input
                name="linkedinLink"
                value={user.linkedinLink || ""}
                onChange={handleChange}
                className="bg-slate-700 border-amber-700 text-white"
              />
            </div>

            <div>
              <Label className="text-amber-400">Profile Picture URL</Label>
              <Input
                name="profilePic"
                value={user.profilePic || ""}
                onChange={handleChange}
                className="bg-slate-700 border-amber-700 text-white"
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 w-full text-white font-semibold"
              >
                {loading ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dialog for success/error */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-800 border-amber-700 text-white">
          <DialogHeader>
            <DialogTitle className={isError ? "text-red-500" : "text-amber-500"}>
              {isError ? "Error" : "Success"}
            </DialogTitle>
          </DialogHeader>
          <Alert variant="default" className="bg-slate-900 border border-amber-700 text-white">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
