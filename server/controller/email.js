const nodemailer = require('nodemailer');
require('dotenv').config()
const db = require('../config/db')

function  emailService( passengers){

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
passengers.map((passenger)=>{
    setTimeout(()=>{

        
    const query= "SELECT * FROM bookingtable WHERE email =? AND passenger_id =?"
    db.query(query, [passenger.email, passenger.passenger_id], (err, result)=>{
        if(err) {
            console.log("failed to retrieve infor " +err)
        }
        else {
    
            
    const email = passenger.email || result[0].email 
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'TICKET INFORMATION',
        _text:   `HELLO ${result[0].passenger_name}, your booking from ${result[0].fromCity} to ${result[0].toCity}
            has been confirmed, travel class is ${result[0].travelClass} depature time is ${result[0].travelDate}.
            your ticket number: ${result[0].ticketNo}.
            Thanks for traveling  with us.🤗🤗 `,
        get text() { 
            return this._text;
        },
        set text(value) {
            this._text = value;
        },
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
    


    }, 4000)
})


}
module.exports = emailService