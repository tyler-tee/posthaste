import React, { useState } from "react";
import "./NewPost.css";
import ReactMarkdown from "react-markdown";

const ARTICLE_CATS = ["Automation", "DevOps", "Just for Fun", "MDM", "Security", "Tech Insights"];
const ARTICLE_TAGS = ["appsec", "automation", "jamf", "mdm", "netsec", "raspberry-pi", "slack", "tines"];

const NewPost = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ title, content, category, tags: tags.join(","), published });
      alert("Post successfully added!");
      setTitle("");
      setContent("");
      setCategory("");
      setTags([]);
      setPublished(false);
    } catch (err) {
      console.error("Failed to add post:", err);
      alert("Failed to add post. Please try again.");
    }
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedOptions);
  };

  return (
    <div className="new-post-container">
      {/* Left Column */}
      <div className="form-column">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
            />
          </div>
          <div className="category-tags-row">
            <div>
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {ARTICLE_CATS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Tags:</label>
              <select multiple value={tags} onChange={handleTagChange}>
                {ARTICLE_TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="publish-submit-row">
            <div className="publish-container">
              <label>
                Publish?
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              </label>
            </div>
            <div className="submit-container">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Right Column */}
      <div className="preview-column">
        <div className="preview">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default NewPost;