// import { useState, useEffect } from 'react';
// import getTrainRemainingSeats from './getTrainRemainingSeats';

// const TestPage = () => {
//   const [remainingSeats, setRemainingSeats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRemainingSeats = async () => {
//       try {
//         const trainName = "3/10/2024-city2-Express";
//         const seatsData = await getTrainRemainingSeats(trainName);
//         setRemainingSeats(seatsData);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchRemainingSeats();

//     return () => {
//     };
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!remainingSeats) {
//     return <p>No data available for this train</p>;
//   }

//   return (
//     <div>
//       <h2>Remaining Seats for {remainingSeats.trainName}</h2>
//       <p>Remaining First Class Seats: {remainingSeats.remaining_first_class}</p>
//       <p>Remaining Second Class Seats: {remainingSeats.remaining_second_class}</p>
//     </div>
//   );
// };

// export default TestPage;
