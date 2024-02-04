const db = require('../config/db');
function delete_old_trains(){
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const deleteQuery = `DELETE FROM trainstable WHERE departureDate <= ?`;

  db.query(deleteQuery, [oneWeekAgo], (err, result) => {
    if (err) throw err;
    else if (result.affectedRows < 0) {
    console.log(`Deleted old train records ${result.affectedRows}`);
    }
  });
}

module.exports = delete_old_trains()
