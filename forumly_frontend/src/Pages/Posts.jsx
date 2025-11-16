import { useParams ,Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

const PostCard = ({ post }) => (
  <Card className="bg-slate-950 border border-amber-200 mb-6 shadow-md cursor-pointer hover:shadow-xl transition-shadow">
    <CardHeader className="pb-2">
      <h2 className="text-2xl font-bold text-amber-200">{post.title}</h2>
    </CardHeader>
    <CardContent className="text-slate-300">
      {post.content || post.description}
      <div className="mt-2">
        <Link to={`/posts/${post.id}`}>
          <Button variant="link" className="text-amber-200 p-0 cursor-pointer">
            Read More
          </Button>
        </Link>
      </div>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-slate-400 gap-2 sm:gap-0">
      <div>By {post.author}</div>
      <div>{format(new Date(post.createdAt), "MMM dd, yyyy")}</div>
      <Button variant="outline" className="text-amber-200 border-amber-200">
        {post.comments?.length ?? 0} Comments
      </Button>
    </CardFooter>
  </Card>
);

const PostsPage = () => {
  const { categoryId } = useParams(); // get categoryId from URL
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const postsPerPage = 3;

  // Fetch posts by category or all
  useEffect(() => {
    const url = categoryId
      ? `${import.meta.env.VITE_API_URL}/posts/category/${categoryId}`
      : `${import.meta.env.VITE_API_URL}/posts`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, [categoryId]);

  // Filter posts by author
  const filteredPosts =
    selectedAuthor === "All"
      ? posts
      : posts.filter((post) => post.author === selectedAuthor);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

    const categoryName = posts[0]?.categoryName || categoryId;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold text-amber-200 mb-6">
        {categoryId ? `Posts in ${categoryName}` : "All Posts"}
      </h1>

      {/* Author Filter */}
      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <Select
          onValueChange={(value) => {
            setSelectedAuthor(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {[...new Set(posts.map((p) => p.author))].map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts List */}
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            className="text-amber-200 border-amber-200"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2 text-slate-300">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            className="text-amber-200 border-amber-200"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PostsPage;
