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
    const query= "SELECT * FROM bookingtable WHERE email =? AND passenger_id =?"
db.query(query, [passenger.email, passenger.passenger_id], (err, result)=>{
    if(err) {
        console.log("failed to retrieve infor " +err)
    }
    else {

        
const email = passenger.email || result[0].email 
console.log(passenger.email +  result[0].email + JSON.stringify( result)  )
const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: 'TICKET INFORMATION',
    text: `HELLO ${result[0].passenger_name}, your booking from ${result[0].fromCity} to ${result[0].toCity}
        has been confirmed, travel class is ${result[0].travelClass} depature time is ${result[0].departureTime}.
        your ticket number: ${result[0].ticketNo}.
         Thanks for traveling  with us.
            your ticket number: ${result[0].ticketNo}. `,
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