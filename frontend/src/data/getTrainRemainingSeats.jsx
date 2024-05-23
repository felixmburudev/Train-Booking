import axios from 'axios';

const getTrainRemainingSeats = async (trainName) => {
  try {
    const response = await axios.get(`http://localhost:3000/getSeats?trainName=${trainName}` );

    const  result  = response.data;
    // alert(JSON.stringify(result));

    return {
      remaining_first_class: result.remaining_first_class,
      remaining_second_class: result.remaining_second_class,
    };
  } catch (error) {
    console.error('Error fetching train data:', error);
    // throw new Error('Failed to fetch train data');
  }
};

export default getTrainRemainingSeats;
