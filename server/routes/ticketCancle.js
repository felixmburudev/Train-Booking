const db = require("../config/db")
const express = require('express')
const router = express.Router()

router.delete('/ticketCanceling', async (req, res) => {
  let { ticketNo, id, phoneNo } = req.body;
  ticketNo = ticketNo.trim();
  id = id.trim();
  phoneNo = phoneNo.trim();

  console.log("ff" + ticketNo + id);

  try {
    db.query('SELECT * FROM bookingtable WHERE ticketNo = ?', [ticketNo], (err, ticketRows) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'An error occurred' });
      }

      if (ticketRows.length === 0) {
        console.log('Ticket not found');
        return res.status(404).json({ message: 'Ticket not found' });
      }

      const passengerId = String(ticketRows[0].passenger_id).trim();
      if (passengerId !== id) {
        console.log('ID mismatch');
        return res.status(400).json({ message: 'Incorrect ID' });
      }
      db.query('DELETE FROM bookingtable WHERE ticketNo = ?', [ticketNo], (err, result) => {
        if (err) {
          console.error('Error:', err);
          return res.status(500).json({ message: 'An error occurred' });
        }

        console.log('Ticket canceled');
        res.json({ message: 'Ticket canceled successfully' });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
