import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./PostForm.css";

const ARTICLE_CATS = {
  "Automation": "automation",
  "DevOps": "devops",
  "Just for Fun": "just-for-fun",
  "MDM": "mdm",
  "Security": "security",
  "Tech Insights": "tech-insights"
};
const ARTICLE_TAGS = ["appsec", "automation", "jamf", "mdm", "netsec", "raspberry-pi", "slack", "tines"];

const PostForm = ({ mode = "create", initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    content: initialData.content || "",
    category: initialData.category || "",
    tags: initialData.tags ? initialData.tags.split(",") : [],
    published: !!initialData.published,
    publish_date: initialData.publish_date || "",
    slug: initialData.slug || ""
  });

  useEffect(() => {
    if (mode === "edit") {
      setFormData({
        id: initialData.id || "",
        title: initialData.title || "",
        content: initialData.content || "",
        category: initialData.category || "",
        tags: initialData.tags ? initialData.tags.split(",") : [],
        published: !!initialData.published,
        publish_date: initialData.publish_date || "",
        slug: initialData.slug || ""
      });
    } else {
      // In create mode, do not reset formData on every render, allow typing.
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tags: formData.tags.join(","),
    };
    if (onSubmit) onSubmit(finalData);
  };

  return (
    <div className="content-container">
      <div className="content-grid">
        <div className="form-column">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Post Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your post here..."
                value={formData.content}
                onChange={handleChange}
              />
            </div>
            <div className="category-tags-row">
              <div>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {Object.entries(ARTICLE_CATS).map(([visible, slug]) => (
                    <option key={slug} value={slug}>
                      {visible}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  name="tags"
                  multiple
                  value={formData.tags}
                  onChange={handleTagsChange}
                >
                  {ARTICLE_TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="publish-submit-row">
              <label htmlFor="published">
                <input
                  id="published"
                  name="published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={handleChange}
                />
                Publish?
              </label>
              <button type="submit" className="submit-button">
                {mode === "edit" ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>

        <div className="preview-column">
          <div className="preview">
            <ReactMarkdown>{formData.content || "Your post content will appear here..."}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;