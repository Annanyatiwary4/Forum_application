"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShare } from "react-icons/fa";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

// -------- Sample post data --------
const samplePost = {
  id: 1,
  title: "How to learn React effectively?",
  content: "I want to improve my React skills. Any tips for building projects and practicing?",
  images: [
    "https://via.placeholder.com/300x150",
    "https://via.placeholder.com/200x200"
  ],
  links: ["https://reactjs.org/docs/getting-started.html"],
  author: { username: "JohnDoe" },
  category: { name: "React" },
  createdAt: new Date(),
  votes: [{ type: "UPVOTE" }, { type: "UPVOTE" }, { type: "DOWNVOTE" }],
  userVote: null,
  comments: [
    {
      id: 1,
      author: "Jane",
      content: "Start small and build projects!",
      createdAt: new Date(),
      replies: [
        { id: 3, author: "JohnDoe", content: "Thanks, will do!", createdAt: new Date() }
      ]
    },
    { id: 2, author: "Mike", content: "Follow the official docs first.", createdAt: new Date(), replies: [] }
  ]
};

// -------- Utilities --------
const countVotes = (votes = [], type) => votes.filter(v => v?.type === type).length;

// -------- Comment Component --------
const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;
    const newReply = { id: Date.now(), author: "You", content: replyContent, createdAt: new Date() };
    setReplies([...replies, newReply]);
    setReplyContent("");
    setReplyOpen(false);
    setShowReplies(true);
  };

  return (
    <div className="ml-4 mt-3 border-l border-slate-700 pl-3">
      <div className="flex justify-between text-slate-400 text-sm">
        <span>{comment.author || "Anonymous"}</span>
        <span>{format(new Date(comment.createdAt), "MMM dd, yyyy")}</span>
      </div>
      <p className="text-slate-300 mt-1">{comment.content}</p>

      <div className="flex gap-2 mt-1">
        {replies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-200"
            onClick={() => setShowReplies(prev => !prev)}
          >
            {showReplies ? "Hide Replies" : `View Replies (${replies.length})`}
          </Button>
        )}

        {/* Reply button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-amber-200"
          onClick={() => setReplyOpen(prev => !prev)}
        >
          {replyOpen ? "Cancel Reply" : "Reply"}
        </Button>
      </div>

      {/* Reply input */}
      {replyOpen && (
        <div className="mt-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={2}
            className="bg-slate-800 text-amber-200 border border-amber-200"
            placeholder="Write a reply..."
          />
          <Button
            className="mt-1 bg-amber-200 text-slate-950 hover:bg-amber-300"
            onClick={handleReplySubmit}
          >
            Submit
          </Button>
        </div>
      )}

      {/* Replies list */}
      <AnimatePresence>
        {showReplies && replies.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 mt-2 border-l border-slate-700 pl-3 text-slate-300 overflow-hidden"
          >
            <div className="flex justify-between text-slate-400 text-sm">
              <span>{r.author || "Anonymous"}</span>
              <span>{format(new Date(r.createdAt), "MMM dd, yyyy")}</span>
            </div>
            <p className="mt-1">{r.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// -------- Post Card Component --------
const PostCard = ({ post }) => {
  const [voteState, setVoteState] = useState(post.userVote || null);
  const [upvotes, setUpvotes] = useState(countVotes(post.votes, "UPVOTE"));
  const [downvotes, setDownvotes] = useState(countVotes(post.votes, "DOWNVOTE"));

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

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

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newC = { id: Date.now(), author: "You", content: newComment, createdAt: new Date(), replies: [] };
    setComments([newC, ...comments]);
    setNewComment("");
    setShowComments(true);
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
            <li key={idx}><a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a></li>
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
        <Button variant="ghost" className="text-amber-200" size="sm" onClick={() => setShowComments(prev => !prev)}>
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

            {/* Comment list */}
            {comments.map(c => (<Comment key={c.id} comment={c} />))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------- ViewPostPage --------
const ViewPostPage = () => {
  return (
    <div className="w-full min-h-screen bg-slate-950 p-4">
      <PostCard post={samplePost} />
    </div>
  );
};

export default ViewPostPage;
