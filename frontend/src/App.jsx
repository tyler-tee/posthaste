import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { AddPost, UpdatePost, GetAllPosts } from "../wailsjs/go/main/App"; // Adjust path as needed

const App = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (activeTab === "view") {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    try {
      const result = await GetAllPosts();
      setPosts(result);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleAddPost = async (postData) => {
    try {
      await AddPost(postData);
      alert("Post successfully added!");
      setActiveTab("view");
    } catch (err) {
      console.error("Failed to add post:", err);
      alert("Failed to add post. Please try again.");
    }
  };

  const handleEditPostClick = (post) => {
    setEditingPost(post);
    setActiveTab("edit");
  };

  const handleUpdatePostData = async (updatedData) => {
    try {
      await UpdatePost(updatedData);
      alert("Post successfully updated!");
      setEditingPost(null);
      setActiveTab("view");
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  let pageTitle = "";
  if (activeTab === "view") pageTitle = "Posts";
  if (activeTab === "create") pageTitle = "Create a New Post";
  if (activeTab === "edit") pageTitle = "Edit Post";

  return (
    <div className="App">
      <header className="main-header">
        <div className="top-row">
          <h1 className="app-title">PostHaste</h1>
          <nav className="main-nav">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEditingPost(null);
                setActiveTab("view");
              }}
              className={activeTab === "view" ? "active" : ""}
            >
              View Posts
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEditingPost(null);
                setActiveTab("create");
              }}
              className={activeTab === "create" ? "active" : ""}
            >
              Create Post
            </a>
          </nav>
        </div>
      </header>
      <main>
        {activeTab === "view" && <PostList posts={posts} onEditPost={handleEditPostClick} />}
        {activeTab === "create" && (
          <PostForm mode="create" onSubmit={handleAddPost} />
        )}
        {activeTab === "edit" && editingPost && (
          <PostForm
            mode="edit"
            initialData={editingPost}
            onSubmit={handleUpdatePostData}
          />
        )}
      </main>
    </div>
  );
};

export default App;