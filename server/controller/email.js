const nodemailer = require('nodemailer');
require('dotenv').config()
const db = require('../config/db')

function  emailService( passengers){

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASSWORD,
    user: 'brayokihuyo@gmail.com',
    pass: 'oidogpotjxufulpn',
    },
});
passengers.map((passenger)=>{
    const query= "SELECT * FROM bookingtable WHERE email =? AND passenger_id =?"
db.query(query, [passenger.email, passenger.passenger_id], (err, result)=>{
    if(err) {
        console.log("failed to retrieve infor " +err)
    }
    else {

        
const email = passenger.email || result[0].email 
const mailOptions = {
    // from: process.env.EMAIL_USER,
  from: 'brayokihuyo@gmail.com',
    to: email,
    subject: 'TICKET INFORMATION',
    text: `HELLO ${result.passenger_name}, thanks for traveling  with us.
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
module.exports = emailService