const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogModel = require("./schemas/blogSchema");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
require("dotenv").config();

// mongodb connection

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_STRING);
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// get requests

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.json(blogs);
  } catch (e) {
    console.log(e);
  }
});

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);
    if (blog) {
      res.json(blog);
    } else {
      res.json({ message: "blog not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

// post requests

app.post("/blogs", upload.single("blogPhoto"), async (req, res) => {
  const blog = {
    title: req.body.title,
    description: req.body.description,
    img: `../assets/${req.file.filename}`,
    content: req.body.content,
    category: req.body.category,
  };
  try {
    const newBlog = new blogModel(blog);
    await newBlog.save();
    return res.json({ message: "blog saved" });
  } catch (e) {
    console.log(e);
  }
});

// delete requests

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    return res.json({ message: "blog deleted" });
  } catch (e) {
    console.log(e);
  }
});

// update requests

app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBlog = {
    title: req.body.title,
    description: req.body.description,
  };
  try {
    const update = await blogModel.findByIdAndUpdate(id, updatedBlog);
    return res.json({ message: "blog updated" });
  } catch (e) {
    console.log(e);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
