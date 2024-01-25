import "./trainList.css";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TrainList = ({ trains }) => {
  // const{from, to, departureTime} =trains;
  // alert("the details, "+ from + to+ departureTime)
  const navigate = useNavigate();
  const book = (fromCity, toCity, departureDate) =>{
    const departureTime = departureDate.split('T') [0];
    // alert("the " + from + to + departureTime);
    navigate(`/book?fromStation=${fromCity}&toStation=${toCity}&date=${departureTime}`);

  }

  return (
    <div className="train-list">
      {trains.map((train, index) => (
        <div className="train-item" key={index}>
          <h3>Train{train.train_name}</h3>
          <p><u>Departure Time:</u> {train.departureDate.split('T') [0]}</p>
          <p><u>From:</u> {train.fromCity}</p>
          <p><u>To:</u> {train.toCity}</p>          
          <p><u>First Class remaining seats:</u> {train.remaining_first_class !== null ? train.remaining_first_class : 0 }</p>
          <p><u>Second class remaining seats:</u> {train.remaining_second_class !== null ? train.remaining_second_class : 0}</p>
          <p><u>Remaining Seats:</u> {train.remaining_first_class + train.remaining_second_class}</p>
          <button onClick={ () => book(train.fromCity, train.toCity, train.departureDate)}> Book Now</button>
        </div>
      ))}
    </div>
  );
};
TrainList.propTypes = {
    trains: PropTypes.arrayOf(
      PropTypes.shape({
        departureTime: PropTypes.string.isRequired,
        totalSeatsBooked: PropTypes.number.isRequired,
        remainingSeats: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

export default TrainList;
