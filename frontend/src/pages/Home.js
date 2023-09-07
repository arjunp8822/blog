import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://blog-api-lpu5.onrender.com/blogs"
    );
    const data = response.data;
    setBlogData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>AP Blog</h1>
      <div className="blog-card-container">
        {blogData.map((blog) => (
          <article key={blog._id} className="blog-card">
            <Link to={`/${blog._id}`} className="img-overlay">
              <img src={blog.img} />
            </Link>
            <div className="blog-card-main">
              <span className="blog-card-category">{blog.category}</span>
              <span className="blog-card-date">
                {new Date(blog.updatedAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <Link to={`/${blog._id}`}>
              <h3>{blog.title}</h3>
            </Link>
            <h5>{blog.description}</h5>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
