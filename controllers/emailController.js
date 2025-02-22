const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        if (!to || !subject || !text) {
            return res.status(400).json({ error: 'All fields (to, subject, text) are required' });
        }

        console.log("📩 Sending email to:", to); 

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);

        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("❌ Email Sending Error:", error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};
