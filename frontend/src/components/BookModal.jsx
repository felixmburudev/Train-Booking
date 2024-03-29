import "../styles/bookModal.css"
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import getTrainRemainingSeats from "../data/getTrainRemainingSeats"

function BookModal({trainName, onClose, adultsCount, childrenCount, from, to, departureTime, travelClass }) {
  const initialPassenger =[{
    fromCity: from,
    toCity: to,
    travelClass: travelClass,
    departureTime : departureTime,
    name: '',
    passenger_id: '',
    email: '',
    phoneNumber: '',
  }];

  const [error, setErrot] =useState("")
  const [response, setResponse]= useState('')
  const [passengers, setPassengers] = useState(Array(adultsCount + childrenCount).fill(initialPassenger));
  const [loading, setLoading] = useState(false)
  const [remainingSeats, setRemainingSeats] = useState(null);

  useEffect(() => {
 fetchRemainingSeats();

    return () => {
    };
  }, []);

    const fetchRemainingSeats = async () => {
      try {
        const seatsData = await getTrainRemainingSeats(trainName);
        setRemainingSeats(seatsData);
      } catch (error) {
        console.log(error.message);
      }
    };


  const handleInputChange = (e, index, field) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: e.target.value,
      fromCity: from,
      toCity: to,
      travelClass: travelClass,
      departureTime: departureTime,
    };
    setPassengers(updatedPassengers);
  };
// alert(loading)
  const handleSubmit = async () => {
    setLoading(true)
    setErrot('')
    setResponse("")    
    fetchRemainingSeats();
    const isEmpty = checkIfPropertiesEmpty(passengers)

    if (isEmpty) {
      setErrot('Empty fields found');
    }
    else {
      // alert(travelClass === 'first' && adultsCount+childrenCount > remainingSeats.remaining_first_class || travelClass==="second" && adultsCount+childrenCount> remainingSeats.remaining_second_class )
      if(travelClass === 'first' && adultsCount+childrenCount > remainingSeats.remaining_first_class || travelClass==="second" && adultsCount+childrenCount> remainingSeats.remaining_second_class ){
        setErrot('Not enough seats available Now');
      }
      else{
    try{
      const res = await axios.post('http://localhost:3000/book', {
        passengers: passengers,
      }, {
        headers: {
            'Content-Type': 'application/json'
      },}
      )
      setTimeout(()=>{
      setResponse(res.data.message )
      setPassengers(Array(adultsCount + childrenCount).fill(initialPassenger))
        setTimeout(()=>{
          onClose()
          setLoading(false)
        }, 1000)
      }, 4000)
    }
    catch(error){
      setErrot(error.response.data.error)
      console.log( error.response.data.error);
    }

    setTimeout(()=>{
      setLoading(false)
    }, 4000)
      }
    }
  };
  function checkIfPropertiesEmpty(train) {
    for (let passenger of train) {
        if (!passenger.passenger_id || !passenger.email  || !passenger.phoneNumber || !passenger.name) {
          return true; //empty fields found
        }
    }
    return false; //no empty fields found
  }

  return (
    <div className="booking-modal">
      <div className="adults-section">
        <h3>Adults</h3>
        <div className="adult">
        {passengers.slice(0, adultsCount).map((passenger, index) => (
          <div className="form-T" key={index}>
            <input
              type="text"
              placeholder={`Adult ${index + 1} Name`}
              value={passenger.name || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index, 'name')}
            />
            <input
              type="text"
              placeholder={`Adult ${index + 1} ID`}
              value={passenger.passenger_id || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index, 'passenger_id')}
            />
            <input
              type="text"
              placeholder={`Adult ${index + 1} Email (Optional)`}
              value={passenger.email || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index, 'email')}
            />
            <input
              type="text"
              placeholder={`Adult ${index + 1} Phone Number`}
              value={passenger.phoneNumber || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index, 'phoneNumber')}
            />
          </div>
        ))}</div>
      </div>
      <div className="children-section">
        <h3>Children</h3>
        <div className="children">
        {passengers.slice(adultsCount).map((passenger, index) => (
          <div className="form-T"  key={index}>
            <from>
            <input
              type="text"
              placeholder={`Child ${index + 1} Name`}
              value={passenger.name || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index + adultsCount, 'name')}
            />
            <input
              type="text"
              placeholder={`Child ${index + 1} Parent's ID`}
              value={passenger.passenger_id || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index + adultsCount, 'passenger_id')}
            />
            <input
              type="text"
              placeholder={`Child ${index + 1} Email (Optional)`}
              value={passenger.email || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index + adultsCount, 'email')}
            />
            <input
              type="text"
              placeholder={`Child ${index + 1} Phone Number`}
              value={passenger.phoneNumber || ''}
              className="modalFom"
              onChange={(e) =>
                handleInputChange(e, index + adultsCount, 'phoneNumber')
              }
            />
            </from>
          </div>
        ))}</div>
      </div>
      {loading && <div>Loading...</div>}
       <p> {response} </p>      
       <p> {error} </p>
      <button onClick={handleSubmit}  disabled={loading}>Submit</button>
      <button onClick={onClose}  disabled={loading}>Close</button>
      
      {loading && <div>Loading...</div>}
      {/* <div className="map">
        {passengers.map((passenger, index)=>
          <div key={index}>
          <p>{passenger.name}</p>
          <p>{passenger.email}</p>
          <p>{passenger.fromCity}</p>
          <p>{passenger.toCity}</p>
          <p>{passenger.phoneNumber}</p>
          <p>{passenger.passenger_id}</p>
          <p>{passenger.ticketNo}</p>
          <p>{passenger.travelClass}</p>
          <p>{passenger.departureTime}</p>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default BookModal;


BookModal.propTypes = {
  
  trainName: PropTypes.string.isRequired,
  childrenCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  adultsCount: PropTypes.number.isRequired,
  travelClass: PropTypes.string.isRequired,
  from:PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  departureTime:PropTypes.string.isRequired,
  
  // children: PropTypes.number.isRequired,
};
