import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/blogs");
    const data = response.data;
    setBlogData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Test
      {blogData.map((blog) => (
        <article>
          <h3>{blog.title}</h3>
          <h5>{blog.description}</h5>
          <img src={blog.img} />
          <p className="content">{blog.content}</p>
        </article>
      ))}
    </div>
  );
};

export default Home;
