"use client";
import { AppSidebar } from "@/Components/AppSidebar";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import CreatePostDialog from "@/Components/CreatePostDialog";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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

          {/* Right - Create Post */}
          <div>
            <CreatePostDialog
              categories={categories}
              onPostCreated={(newPost) => {
                setCategories((prev) =>
                  prev.map((cat) =>
                    cat.id === newPost.categoryId
                      ? { ...cat, postCount: (cat.postCount ?? 0) + 1 }
                      : cat
                  )
                );
              }}
            />
          </div>
        </div>

        {/* Content - Categories */}
        <div className="flex-1 flex flex-col gap-4 rounded-tl-2xl border border-amber-200/20 bg-slate-900 p-6 overflow-auto">
          {loading ? (
            <div className="flex flex-col gap-4">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-full h-20 rounded-lg bg-slate-800"
                  />
                ))}
            </div>
          ) : (
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => navigate(`/posts/category/${cat.id}`)}
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
          )}
        </div>
      </div>
    </AppSidebar>
  );
};

export default Dashboard;
