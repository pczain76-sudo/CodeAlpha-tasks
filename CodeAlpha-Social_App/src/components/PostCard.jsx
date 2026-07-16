import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const { userInfo } = useContext(AuthContext);
  const { setPosts } = useContext(PostContext);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

 
  const isLiked = post.likes.includes(userInfo._id);


  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/like/${post._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const updatedPost = await response.json();

     
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === post._id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Like failed", error);
    }
  };


  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/comment/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });
      const updatedPost = await response.json();

    
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === post._id ? updatedPost : p))
      );
      setCommentText("");
    } catch (error) {
      console.error("Comment failed", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
  
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {post.user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <Link to={`/profile/${post.user?.username}`} className="font-semibold text-gray-800 hover:text-blue-600">
  {post.user?.name}
</Link>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

   
      <p className="text-gray-800 mb-4">{post.text}</p>

    
      <div className="flex items-center gap-6 border-t border-b border-gray-100 py-2 mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 font-medium transition ${
            isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
        >
        
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likesCount || post.likes.length} Likes
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 font-medium text-gray-500 hover:text-blue-500 transition"
        >
          💬 {post.comments.length} Comments
        </button>
      </div>

      
      {showComments && (
        <div className="space-y-3">
          {post.comments.map((c, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-2 text-sm">
              <span className="font-semibold text-gray-700">{c.name}</span>
              <p className="text-gray-600">{c.text}</p>
            </div>
          ))}

        
          <form onSubmit={handleComment} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostCard;