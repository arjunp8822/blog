import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/blogs");
    const data = response.data;
    setBlogData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      Blog Home
      <div className="blog-card-container">
        {blogData.map((blog) => (
          <article key={blog._id} className="blog-card">
            <Link to={`/${blog._id}`}>
              <img src={blog.img} />
            </Link>
            <div className="blog-card-main">
              <span className="blog-card-category">JavaScript</span>
              <span className="blog-card-date">19 January 2023</span>
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
