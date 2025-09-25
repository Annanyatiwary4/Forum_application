import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const CreatePostDialog = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  const [links, setLinks] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handlePost = async () => {
    const token = localStorage.getItem("token"); // get JWT
    if (!token) {
      alert("You must be logged in to create a post");
      return;
    }

    if (!title || !content || !categoryId) {
      alert("Title, Content, and Category are required!");
      return;
    }

    const payload = {
      title,
      content,
      images: images ? images.split(",").map((i) => i.trim()) : [],
      links: links ? links.split(",").map((l) => l.trim()) : [],
      categoryId: parseInt(categoryId),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ token sent properly
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to create post");
      }

      const newPost = await res.json();
      console.log("Post created:", newPost);

      // Reset form
      setTitle("");
      setContent("");
      setImages("");
      setLinks("");
      setCategoryId("");

      if (onPostCreated) onPostCreated(newPost);

      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error creating post: " + err.message);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-amber-200/30 px-3 py-2"
          />
          <textarea
            placeholder="Write your content here..."
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-amber-200/30 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Image URLs (comma separated)"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-amber-200/30 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Link URLs (comma separated)"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-amber-200/30 px-3 py-2"
          />

          <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="bg-slate-800 text-amber-200 hover:bg-slate-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-amber-200 text-slate-950 hover:bg-amber-300"
            onClick={handlePost}
          >
            Post
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePostDialog;
