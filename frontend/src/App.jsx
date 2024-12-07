import React, { useState, useEffect } from "react";
import { GetAllPosts } from "../wailsjs/go/main/App";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Fetch all posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await GetAllPosts();
        console.log("Posts retrieved from backend:", result); // Log posts
        setPosts(result);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Unable to load posts.");
      }
    };
  
    fetchPosts();
  }, []);  

  return (
    <div className="App">
      <header>
        <h1>PostHaste</h1>
      </header>

      {error && <p className="error">{error}</p>}

      <main>
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
                <h2>{post.title || "Untitled Post"}</h2>
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
      </main>
    </div>
  );
};

export default App;