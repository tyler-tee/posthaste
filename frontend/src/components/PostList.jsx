import React, { useState, useEffect } from "react";
import { GetAllPosts } from "../../wailsjs/go/main/App";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Fetch all posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await GetAllPosts();
        setPosts(result);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Unable to load posts.");
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "8px 0",
                padding: "16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{post.title || "Untitled Post"}</h3>
              <p>
                <strong>Published On:</strong>{" "}
                {post.publish_date || "Unknown Date"}
              </p>
              <p>
                <strong>Category:</strong> {post.category || "Uncategorized"}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {post.tags ? post.tags.split(",").join(", ") : "None"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;