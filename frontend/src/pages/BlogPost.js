import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/BlogPost.css";

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [editState, setEditState] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editContent, setEditContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(
      `https://blog-api-lpu5.onrender.com/blogs/${id}`
    );
    const data = await response.data;
    setBlog(data);
  };

  useEffect(() => {
    setEditTitle(blog?.title);
    setEditCategory(blog?.category);
    setEditDescription(blog?.description);
    setEditContent(blog?.content);
  }, [blog]);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `https://blog-api-lpu5.onrender.com/blogs/${id}`
    );
    navigate("/");
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      editTitle,
      editCategory,
      editDescription,
      editContent,
    };
    try {
      const response = await axios.put(
        `https://blog-api-lpu5.onrender.com/blogs/${id}`,
        updatedBlog,
        {
          headers: { accept: "*/*", "Content-Type": "application/json" },
        }
      );
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
    setEditState(false);
  };

  return (
    <div className="container blog-post">
      {editState ? (
        <div className="blog-post-container">
          <h1>
            <input
              type="text"
              placeholder={blog?.title}
              onChange={(e) => setEditTitle(e.target.value)}
              value={editTitle}
            />
          </h1>
          <div className="blog-post-main">
            <div className="category-container">
              <label htmlFor="category">Choose a category:</label>
              <select
                name="category"
                id="category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                placeholder={blog?.category}
              >
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="blog-post-img-container">
            <img
              src={`https://res.cloudinary.com/dn3yvtawe/image/upload/${blog?.img}`}
              alt={blog?.title}
            />
          </div>
          <h3>
            <input
              type="text"
              placeholder={blog?.description}
              onChange={(e) => setEditDescription(e.target.value)}
              value={editDescription}
            />
          </h3>
          <p>
            <textarea
              onChange={(e) => setEditContent(e.target.value)}
              placeholder={blog?.content}
              value={editContent}
            ></textarea>
          </p>
        </div>
      ) : (
        <div className="blog-post-container">
          <h1>{blog?.title}</h1>
          <div className="blog-post-main">
            <span className="blog-card-category">{blog?.category}</span>
            <span className="blog-card-date">
              {new Date(blog?.updatedAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="blog-post-img-container">
            <img
              src={`https://res.cloudinary.com/dn3yvtawe/image/upload/${blog?.img}`}
              alt={blog?.title}
            />
          </div>
          <h3>{blog?.description}</h3>
          <p>{blog?.content}</p>
        </div>
      )}
      <div className="blog-post-button-container">
        {editState ? (
          <button onClick={editHandler}>Done</button>
        ) : (
          <button onClick={() => setEditState(true)}>Edit</button>
        )}
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default BlogPost;
