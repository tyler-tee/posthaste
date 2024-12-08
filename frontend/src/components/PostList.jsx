import React from "react";
import "./PostList.css";

const PostList = ({ posts, onEditPost }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="content-container">
        <div className="section-header">
          <h2>Posts</h2>
        </div>
        <p className="no-posts">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="section-header">
        <h2>Posts</h2>
      </div>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title || "Untitled Post"}</h3>
            <p><strong>Published On:</strong> {post.publish_date || "Unknown Date"}</p>
            <p><strong>Category:</strong> {post.category || "Uncategorized"}</p>
            <p>
              <strong>Tags:</strong> {post.tags ? post.tags.split(",").join(", ") : "None"}
            </p>
            <div className="post-actions">
              <button
                className="edit-button"
                onClick={() => onEditPost(post)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;