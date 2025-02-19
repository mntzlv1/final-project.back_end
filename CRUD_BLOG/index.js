const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      body: { type: String, required: true },
      author: { type: String, default: "Anonymous" },
    },
    { timestamps: true }
  )
);

app.post("/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ message: "Blog created", blog });
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
});

app.get("/blogs", async (req, res) => {
  res.json(await Blog.find());
});

app.route("/blogs/:id")
  .get(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    blog ? res.json(blog) : res.status(404).json({ message: "Blog not found" });
  })
  .put(async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    blog ? res.json({ message: "Blog updated", blog }) : res.status(404).json({ message: "Blog not found" });
  })
  .delete(async (req, res) => {
    (await Blog.findByIdAndDelete(req.params.id))
      ? res.json({ message: "Blog deleted" })
      : res.status(404).json({ message: "Blog not found" });
  });

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(9687, () => console.log(`Server running: http://localhost:9687`));

