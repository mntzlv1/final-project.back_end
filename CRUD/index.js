const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/db3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongodb connected'))
  .catch((err) => {
    console.error('mongodb connection error:', err);
    process.exit(1);
  });

const Blog = mongoose.model('Blog', new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
}, { timestamps: true }));

app.post('/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body); 
    res.status(201).json({ message: 'blog created', blog });
  } catch (error) {
    res.status(400).json({ message: 'invalid data', error }); 
  }
});

app.get('/blogs', async (req, res) => {
  res.json(await Blog.find());
});

app.route('/blogs/:id')
  .get(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    blog ? res.json(blog) : res.status(404).json({ message: 'not found' });
  })
  .put(async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    blog ? res.status(200).json({ message: 'blog updated', blog }) : res.status(404).json({ message: 'not found' });
  })
  .delete(async (req, res) => {
    (await Blog.findByIdAndDelete(req.params.id))
      ? res.status(200).json({ message: 'blog deleted' }) 
      : res.status(404).json({ message: 'not found' });
  });

app.listen(5000, () => {
  console.log('http://localhost:5000');
});
