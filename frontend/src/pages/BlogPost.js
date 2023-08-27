import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/BlogPost.css";

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/blogs/${id}`);
    const data = await response.data;
    setBlog(data);
  };

  console.log(blog);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container blog-post">
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
  );
};

export default BlogPost;
