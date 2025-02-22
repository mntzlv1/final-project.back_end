const express = require('express');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

if (!sendEmail) {
    throw new Error("Ошибка: Функция sendEmail не найдена. Проверь controllers/emailController.js");
}

router.post('/', sendEmail);

module.exports = router;
