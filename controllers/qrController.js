const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const qrCodeImageUrl = await QRCode.toDataURL(text);
        res.status(200).json({ qrCodeImageUrl });
    } catch (error) {
        console.error("QR Code Generation Error:", error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
};
