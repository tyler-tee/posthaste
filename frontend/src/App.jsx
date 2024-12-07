import React, { useState } from "react";
import PostList from "./components/PostList"; // Your existing PostList component
import NewPost from "./components/NewPost"; // The NewPost component
import { AddPost } from "../wailsjs/go/main/App"; // Backend AddPost function

const App = () => {
  const [activeTab, setActiveTab] = useState("view");

  // Function to handle new post submission
  const handleAddPost = async (postData) => {
    try {
      await AddPost(postData);
      alert("Post successfully added!");
      setActiveTab("view"); // Switch back to the "View Posts" tab after adding the post
    } catch (err) {
      console.error("Failed to add post:", err);
      alert("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>PostHaste</h1>
        <nav>
          <button
            onClick={() => setActiveTab("view")}
            style={{ marginRight: "10px" }}
          >
            View Posts
          </button>
          <button onClick={() => setActiveTab("create")}>Create Post</button>
        </nav>
      </header>
      <main>
        {activeTab === "view" && <PostList />}
        {activeTab === "create" && <NewPost onSubmit={handleAddPost} />}
      </main>
    </div>
  );
};

export default App;