import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(AuthContext);

  // Saari posts fetch karna (Feed)
  const fetchPosts = async () => {
    if (!userInfo) return;
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  // Jab bhi user login ho ya page reload ho, posts laao
  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  return (
    <PostContext.Provider value={{ posts, setPosts, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};