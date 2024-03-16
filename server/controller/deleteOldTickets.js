
const db = require('../config/db')

function deleteTickets(){
    const date = new Date();
        date.setDate(date.getDate() );
        const trainDate = date.toISOString().split('T')[0];
        console.log(trainDate)
        const sqlDel = `DELETE FROM bookingtable WHERE travelDate <= ?`;
             db.query(sqlDel, trainDate, (error, results) => {
            if (error) {
                console.log("Error Occured " + error)
                return;
            }
            else{
                console.log(results.affectedRows + " tickets deleted");
            }
        })
}
module.exports =deleteTickets