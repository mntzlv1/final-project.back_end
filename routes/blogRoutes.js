const express = require('express');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');

const router = express.Router();

if (!getAllBlogs) {
    throw new Error("Ошибка: Функция getAllBlogs не найдена. Проверь controllers/blogController.js");
}

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
