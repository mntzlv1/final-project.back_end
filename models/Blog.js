const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }, // Исправляем название поля
    author: { type: String, required: true }, // Был ObjectId, делаем строкой
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
