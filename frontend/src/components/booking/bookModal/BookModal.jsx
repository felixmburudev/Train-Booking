import "./bookModal.css"
import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

function BookModal({ onClose, adultsCount, childrenCount, from, to, departureTime, travelClass }) {
  const initialPassenger =[{
    fromCity: from,
    toCity: to,
    travelClass: travelClass,
    departureTime : departureTime,
    ticketNo: "234243",
    name: '',
    id: '',
    email: '',
    phoneNumber: '',
  }];


  const [passengers, setPassengers] = useState(Array(adultsCount + childrenCount).fill(initialPassenger));

  const handleInputChange = (e, index, field) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: e.target.value,
      fromCity: from,
      toCity: to,
      travelClass: travelClass,
      departureTime: departureTime,
      ticketNo: 3223424,
    };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async () => {
    // Send the 'passengers' 
    // alert(passengers[0].name);
    try{
      const response = await axios.post('http://localhost:3000/book', {
        passengers: passengers,
      }, {
        headers: {
            'Content-Type': 'application/json'
      },}
      );
      alert("the api says " + response.data);

    }
    catch(error){
      alert("The arrr " + error);
    }
    // ...
  };

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
              value={passenger.id || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index, 'id')}
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
              value={passenger.id || ''}
              className="modalFom"
              onChange={(e) => handleInputChange(e, index + adultsCount, 'id')}
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
          </div>
        ))}</div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
      <div className="map">
        {passengers.map((passenger, index)=>
          <div key={index}>
          <p>{passenger.name}</p>
          <p>{passenger.email}</p>
          <p>{passenger.fromCity}</p>
          <p>{passenger.toCity}</p>
          <p>{passenger.phoneNumber}</p>
          <p>{passenger.id}</p>
          <p>{passenger.ticketNo}</p>
          <p>{passenger.travelClass}</p>
          <p>{passenger.departureTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookModal;


BookModal.propTypes = {
  childrenCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  adultsCount: PropTypes.number.isRequired,
  travelClass: PropTypes.string.isRequired,
  from:PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  departureTime:PropTypes.string.isRequired,
  
  // children: PropTypes.number.isRequired,
};
