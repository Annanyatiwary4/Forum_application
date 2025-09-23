"use client";
import { AppSidebar } from "@/Components/AppSidebar";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
  };

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <AppSidebar>
      <div className="flex flex-1 h-screen bg-slate-950 text-amber-200 flex-col">
        {/* Topbar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 border-b border-amber-200/20 bg-slate-900">
          {/* Center - Search */}
          <div className="flex-1 max-w-xl w-full mb-2 md:mb-0">
            <PlaceholdersAndVanishInput
              placeholders={[
                "Search categories...",
                "Search posts...",
                "Search users...",
              ]}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right - AlertDialog (Create Post) */}
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-amber-200 text-slate-950 hover:bg-amber-300 w-full md:w-auto">
                  Create New Post
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-slate-900 text-amber-200 border border-amber-200/20 max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold">
                    Create a New Discussion
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-amber-200/70">
                    Start a new thread to share your thoughts or ask a question.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Post Title"
                    className="w-full rounded-md bg-slate-800 border border-amber-200/30 px-3 py-2 text-amber-200 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  <textarea
                    placeholder="Write your content here..."
                    rows={5}
                    className="w-full rounded-md bg-slate-800 border border-amber-200/30 px-3 py-2 text-amber-200 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>

                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel className="bg-slate-800 text-amber-200 hover:bg-slate-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-amber-200 text-slate-950 hover:bg-amber-300">
                    Post
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Content - Categories */}
        <div className="flex-1 flex flex-col gap-4 rounded-tl-2xl border border-amber-200/20 bg-slate-900 p-6 overflow-auto">
          <ul className="space-y-4">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className="group flex flex-col justify-between cursor-pointer rounded-lg border border-amber-200/30 bg-slate-800 p-4 text-lg font-medium 
                          transition-all duration-300 ease-in-out
                          hover:bg-amber-200 hover:shadow-xl"
              >
                <span className="text-lg font-semibold text-amber-200 transition-colors duration-300 group-hover:text-slate-950">
                  {cat.name}
                </span>
                <span className="text-amber-200/70 text-sm mt-1 transition-colors duration-300 group-hover:text-slate-950">
                  {cat.postCount ?? cat.posts?.length ?? 0} posts
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppSidebar>
  );
};

export default Dashboard;
