const nodemailer = require('nodemailer');
require('dotenv').config()
const db = require('../config/db')

function  sendBookingInformation( passengers){

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
passengers.map((passanger)=>{
    console.log(passanger.email + " "+ passanger.ticketNo)
const query= "SELECT * FROM bookingtable WHERE email =? AND passanger_id =?"
db.query(query, [passanger.email, passanger.passanger_id], (err, result)=>{
    if(err) {
        console.log(err)
    }
    else {

        
const email = passanger.email || result[0].email 
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'TICKET INFORMATION',
    text: `HELLO ${result.passanger_name}, thanks for traveling  with us.
            your ticket number: ${result.ticketNo}. `,
};

transporter.sendMail(mailOptions, (emailErr, info) => {
    if (emailErr) {
        console.error('Error sending email:', emailErr);
    } else {
        console.log('Email sent:', info.response);
    }
});

    }
    

})
})


}
module.exports = sendBookingInformation