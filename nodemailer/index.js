const { error } = require('console');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: '231599@astanait.edu.kz',
        pass: 'nuet_178'
    }
});

transporter.sendMail({
    from: '<231599@astanait.edu.kz>',
    to: 'tuzelamina@gmail.com',
    subject: 'HELLO',
    text: 'Amina Tuzelova',
    headers:{
        'Reply-to': '231599@astanait.edu.kz'
    }
},(error,info)=>{
    if(error){
        console.error('error',error);
    }else{
        console.log('sent message', info.response);
    }
});