const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    if (req.url === '/qrCode.png') {
        fs.readFile(path.join(__dirname, 'qrCode.png'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading QR code');
            }
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/qrCode.png');
});
