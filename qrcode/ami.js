import inquirer from 'inquirer'; 
import qr from 'qr-image'; 
import fs from 'fs';

async function getURL() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter a URL :'
        }
    ]);

    const url = answers.url;
    const qrImage = qr.image(url, { type: 'png' });
   
    const qrStream = fs.createWriteStream('qrCode.png');
    qrImage.pipe(qrStream);

    qrStream.on('finish', () => {
        fs.writeFile('url.txt', url, (err) => { 
            if (err) throw err;
            console.log('URL saved to url.txt!');
        });

        console.log('QR Code generated successfully!');
    });
}

getURL();
