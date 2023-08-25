import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Create.css";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("blogPhoto", file);
    formData.append("content", content);
    try {
      const response = await axios.post(
        "http://localhost:4000/blogs",
        formData
      );
    } catch (e) {
      console.log(e);
    }
    navigate("/");
  };

  return (
    <div className="container">
      <form
        className="create-form"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <textarea onChange={(e) => setContent(e.target.value)}></textarea>
        <div className="create-button-container">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
