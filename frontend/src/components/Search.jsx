import "../styles/search.css"

// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
// import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Select from 'react-select';


const options = [
    { value: 'Nairobi', label: 'Nairobi' },
    { value: 'Mombasa', label: 'Mombasa' },
    
  ];


const Search = () => {

  const [message, setMessage] =useState(null)
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
    const navigate =useNavigate();
    const maxDate = new Date();
    const minDate = new Date().toISOString().split('T')[0];
    maxDate.setDate(maxDate.getDate() + 7);
    const maxDateFinal = maxDate.toISOString().split('T') [0];
    
    const handleFromChange = (e) => {
      const selectedFrom = e.target.value;
      setFrom(selectedFrom);
  
      if (selectedFrom === to) {
        setTo('');
      }
    };
  
    const handleToChange = (e) => {
      const selectedTo = e.target.value;
      setTo(selectedTo);
      
      if (selectedTo === from) {
        setFrom('');
      }
    };
    const handleSearchClick =  async (e) => {
      e.preventDefault();
        try {
            const response =  await axios.get(`http://localhost:3000/search?from=${from}&to=${to}&date=${date}`);
            if(response.data.remaining_first_class + response.data.remaining_second_class === response.data.train_capacity){
                setMessage("Fully BOOKED")
            }
            else{
                const trainData = JSON.stringify(response.data);
                // alert(resp)
                navigate(`/book?fromStation=${from}&toStation=${to}&date=${date}&train=${encodeURIComponent(trainData)}`);
            }
            // console.log(response)
            // alert(JSON.stringify(response))
        }catch (err){
          setMessage(err.response.data.error);
            console.log("error while train searching ",err)
        }

    };
  return (
    <div>
        <div className="booking-bar">
          <div className="messageS">
            <p>{message}</p>
          </div>
      <form onSubmit={handleSearchClick}>
        <div className="forms">
          
        <div className="select-container">
          <label htmlFor="from">From</label>
          <select
            id="from"
            value={from}
            className="from-select"
            onChange={handleFromChange}
            placeholder="From"
          >
            <option value="" disabled>Select From</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <label htmlFor="to">To</label>
          <select
            id="to"
            className="to-select"
            value={to}
            onChange={handleToChange}
            placeholder="To"
          >
            <option value="" disabled>Select To</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <label htmlFor="date">Select Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-picker"
            max={maxDateFinal}
            min={minDate}
          />
        </div>
        </div>
        <button type="submit" className="search-button">
          Search Train
        </button>
      </form>
    </div>
    </div>
  )
}

export default Search