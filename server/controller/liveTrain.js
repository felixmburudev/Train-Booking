// const socketIO = require('socket.io');
// const db = require('../config/db');

// function initLiveTrainUpdates(server) {
//   const io = socketIO(server);

//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     socket.on('trainName', (trainName) => {
//       const query = `SELECT * FROM trainstable WHERE train_name = ?`;
//       db.query(query, [trainName], (error, results) => {
//         if (error) {
//           console.error('Error querying database:', error);
//           socket.emit('remainingSeats', { error: 'Database error' }); // Emit error to client
//           return;
//         }

//         if (results.length === 0) {
//           console.error('No results found for train:', trainName);
//           socket.emit('remainingSeats', { error: 'Train not found' }); // Emit error 2 client
//           return;
//         }

//         const remainingSeats = {
//           remaining_first_class: results[0].remaining_first_class,
//           remaining_second_class: results[0].remaining_second_class,
         
//         };

//         // Emit the remaining seats
//         socket.emit('remainingSeats', remainingSeats);
//       });
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
// }

// module.exports = { initLiveTrainUpdates };
