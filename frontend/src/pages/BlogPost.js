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
    const response = await axios.get(`http://localhost:4000/blogs/${id}`);
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
    const response = await axios.delete(`http://localhost:4000/blogs/${id}`);
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
        `http://localhost:4000/blogs/${id}`,
        updatedBlog,
        {
          headers: { accept: "*/*", "Content-Type": "application/json" },
        }
      );
    } catch (e) {
      console.log(e);
    }
    navigate("/");
    setEditState(false);
  };

  return (
    <div className="container blog-post">
      {editState ? (
        <div>
          <h1>
            <input
              type="text"
              placeholder={blog?.title}
              onChange={(e) => setEditTitle(e.target.value)}
              value={editTitle}
            />
          </h1>
          <div className="blog-post-main">
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
            <span className="blog-post-date">19 January 2023</span>
          </div>
          <div className="blog-post-img-container">
            <img src={blog?.img} alt={blog?.title} />
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
        <div>
          <h1>{blog?.title}</h1>
          <div className="blog-post-main">
            <span className="blog-post-category">JavaScript</span>
            <span className="blog-post-date">19 January 2023</span>
          </div>
          <div className="blog-post-img-container">
            <img src={blog?.img} alt={blog?.title} />
          </div>
          <h3>{blog?.description}</h3>
          <p>{blog?.content}</p>
        </div>
      )}
      {editState ? (
        <button onClick={editHandler}>Done</button>
      ) : (
        <button onClick={() => setEditState(true)}>Edit</button>
      )}
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default BlogPost;
