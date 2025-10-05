"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShare, FaTrash } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";

// -------- Comment Component --------
const Comment = ({ comment, postId, refreshComments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);
  const currentUser = localStorage.getItem("username");

  // Add reply
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    const payload = {
      content: replyContent,
      postId,
      parentCommentId: comment.id,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify(payload),
        
      });
      if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to add reply: ${text}`);
    }
      const newReply = await res.json();
      setReplies([...replies, newReply]);
      setReplyContent("");
      setReplyOpen(false);
      setShowReplies(true);
      refreshComments();
    } catch (err) {
      console.error("Failed to add reply:", err);
    }
  };

  // Delete comment
  const handleDelete = async (id) => {
    try {
      const res= await fetch(`${import.meta.env.VITE_API_URL}/comments/${id}`, {
        method: "DELETE",
       headers:{ "Authorization": `Bearer ${localStorage.getItem("token")}`}
      });
      if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to delete comment: ${text}`);
    }
      refreshComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };


  return (
    <div className="ml-4 mt-3 border-l border-slate-700 pl-3">
      <div className="flex justify-between text-slate-400 text-sm">
        <span>{comment.author || "Anonymous"}</span>
       <span>{comment.createdAt ? format(new Date(comment.createdAt), "MMM dd, yyyy") : "..."}</span>
      </div>
      <p className="text-slate-300 mt-1">{comment.content}</p>

      <div className="flex gap-2 mt-1">
        {replies.length > 0 && (
          <Button variant="ghost" size="sm" className="text-amber-200" onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? "Hide Replies" : `View Replies (${replies.length})`}
          </Button>
        )}
        <Button variant="ghost" size="sm" className="text-amber-200" onClick={() => setReplyOpen(!replyOpen)}>
          {replyOpen ? "Cancel Reply" : "Reply"}
        </Button>
        
          {comment.author === currentUser && (
          <Button 
            variant="ghost" size="sm" className="text-red-400" 
            onClick={() => handleDelete(comment.id)}
          >
            <FaTrash /> Delete
          </Button>
        )}

      </div>

      {replyOpen && (
        <div className="mt-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={2}
            className="bg-slate-800 text-amber-200 border border-amber-200"
            placeholder="Write a reply..."
          />
          <Button className="mt-1 bg-amber-200 text-slate-950 hover:bg-amber-300" onClick={handleReplySubmit}>
            Submit
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showReplies &&
          replies.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4 mt-2 border-l border-slate-700 pl-3 text-slate-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-slate-400 text-sm gap-1 sm:gap-0">
                <div className="flex flex-col sm:flex-row gap-2">
                  <span>{r.author || "Anonymous"}</span>
                  <span>{r.createdAt ? format(new Date(r.createdAt), "MMM dd, yyyy") : "..."}</span>
                </div>
                {r.author === currentUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 mt-1 sm:mt-0"
                    onClick={() => handleDelete(r.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                )}
              </div>
              <p className="mt-1">{r.content}</p>
            </motion.div>
          ))}
      </AnimatePresence>

    </div>
  );
};

// -------- PostCard Component --------
const PostCard = ({ post }) => {
  const [voteState, setVoteState] = useState(null);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);
  const [showComments, setShowComments] = useState(false);
  
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comments/post/${post.id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
  if (post?.id) fetchComments();
}, [post?.id]);


  const handleVote = (type) => {
    if (voteState === type) {
      setVoteState(null);
      type === "UPVOTE" ? setUpvotes(upvotes - 1) : setDownvotes(downvotes - 1);
    } else {
      if (voteState === "UPVOTE") setUpvotes(upvotes - 1);
      if (voteState === "DOWNVOTE") setDownvotes(downvotes - 1);
      setVoteState(type);
      type === "UPVOTE" ? setUpvotes(upvotes + 1) : setDownvotes(downvotes + 1);
    }
  };

 const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const payload = { content: newComment, postId: post.id, parentCommentId: null };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
        body: JSON.stringify(payload),
       
      });
        if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to add comment: ${text}`);
    }


      const savedComment = await res.json();
      setComments([savedComment, ...comments]);
      setNewComment("");
      setShowComments(true);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-6 my-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-amber-200 font-semibold">{post.author.username}</span>
          <span className="text-slate-400 text-sm ml-2">
            {format(new Date(post.createdAt), "MMM dd, yyyy")} · {post.category.name}
          </span>
        </div>
      </div>

      {/* Title & Content */}
      <h2 className="text-lg font-bold text-amber-200 mb-2">{post.title}</h2>
      <p className="text-slate-300 mb-3">{post.content}</p>

      {/* Images */}
      {post.images?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.images.map((img, idx) => (
            <img key={idx} src={img} alt={`img-${idx}`} className="w-full sm:w-1/2 md:w-1/3 rounded" />
          ))}
        </div>
      )}

      {/* Links */}
      {post.links?.length > 0 && (
        <ul className="mb-3 text-amber-300">
          {post.links.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-slate-700 pt-3">
        <Button
          variant={voteState === "UPVOTE" ? "secondary" : "ghost"}
          className="text-amber-200 border-amber-200"
          size="sm"
          onClick={() => handleVote("UPVOTE")}
        >
          <FaThumbsUp /> {upvotes}
        </Button>
        <Button
          variant={voteState === "DOWNVOTE" ? "secondary" : "ghost"}
          className="text-amber-200 border-amber-200"
          size="sm"
          onClick={() => handleVote("DOWNVOTE")}
        >
          <FaThumbsDown /> {downvotes}
        </Button>
        <Button variant="ghost" className="text-amber-200" size="sm" onClick={() => setShowComments(!showComments)}>
          <FaCommentAlt /> {comments.length}
        </Button>
        <Button variant="ghost" className="text-amber-200" size="sm">
          <FaShare /> Share
        </Button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            {/* Add Comment */}
            <div className="mb-4">
              <Textarea
                placeholder="Add a comment..."
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-slate-800 text-amber-200 border border-amber-200 mb-2"
              />
              <Button className="bg-amber-200 text-slate-950 hover:bg-amber-300" onClick={handleAddComment}>
                Comment
              </Button>
            </div>

            {/* Comment List */}
            {comments.length > 0 ? comments.map((c) => <Comment key={c.id} comment={c} postId={post.id} 
            refreshComments={fetchComments}  />) : (
              <p className="text-slate-400 text-sm">No comments yet.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------- ViewPostPage --------
const ViewPostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Map backend response to frontend structure
        const mappedPost = {
          ...data,
          author: { username: data.author },
          category: { name: data.categoryName },
        };

        setPost(mappedPost);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };
    if (postId) fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-950 text-amber-200">
        Loading post...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 p-4">
      <PostCard post={post} />
    </div>
  );
};

export default ViewPostPage;
