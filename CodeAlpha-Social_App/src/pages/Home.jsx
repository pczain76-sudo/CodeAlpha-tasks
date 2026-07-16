import { useState, useContext } from "react";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

function Home() {
    const { posts, setPosts } = useContext(PostContext);
    const { userInfo } = useContext(AuthContext);
    const [text, setText] = useState("");


    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!text) return;

        try {
            const response = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({ text }),
            });

            const newPost = await response.json();


            setPosts([newPost, ...posts]);
            setText("");
        } catch (error) {
            console.error("Post creation failed", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-4 px-4">

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
                    <textarea
                        rows="3"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button
                        type="submit"
                        className="self-end bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Post
                    </button>
                </form>
            </div>


            {posts.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No posts yet. Be the first to post!</p>
            ) : (
                posts.map((post) => <PostCard key={post._id} post={post} />)
            )}
        </div>
    );
}

export default Home;