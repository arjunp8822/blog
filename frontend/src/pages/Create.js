import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Create.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState("HTML");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);

  const navigate = useNavigate();

  const handleImg = async (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "sk23ypsf");
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("content", content);

      const imageResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dn3yvtawe/image/upload",
        formData
      );

      const publicId = await imageResponse.data.public_id;
      formData.append("publicId", publicId);

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
          maxLength="20"
          required
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          maxLength="60"
          required
        />
        <div className="category-container">
          <label htmlFor="category">Choose a category:</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <input type="file" filename={file} onChange={handleImg} required />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write content here"
          required
        ></textarea>
        <div className="create-button-container">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
