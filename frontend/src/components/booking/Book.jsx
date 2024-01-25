import {  FaBaby, FaChild,  FaPeopleArrows, FaPeopleCarry } from "react-icons/fa";
import Search from "../search/Search";
import "./book.css";
import  { useState, useEffect } from 'react';
import { useLocation} from "react-router-dom";
import Footer from "../footer/Footer";
import ReactModal from "react-modal";
import BookModal from "./bookModal/bookModal";



const Book = () => {

    const [isModleOpen, setModalOpen ] = useState(false);
    const [numChildren5to13, setNumChildren5to13] = useState(0);
    const [numAdults, setNumAdults] = useState(0);
    const [classType, setClassType] = useState('first');
    const [totalCost, setTotalCost] = useState(0);

const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
const toStation = queryParams.get('toStation');
const date = queryParams.get('date');
const fromStation = queryParams.get('fromStation');
const train = queryParams.get('train');


    const tr = JSON.parse(decodeURIComponent(train));
    const trainToBook = tr[0]



useEffect(() => {
    // Define prices per passenger for both 1st and 2nd class
    const adultPrice2nd = 1000; 
    const childPrice2nd = 500;
  
    const adultPrice1st = 2000; 
    const childPrice1st = 1000; 
  
    // Calculate the total cost based on the inputs and class type
    const child5to13Cost = numChildren5to13 * (classType === 'first' ? childPrice1st : childPrice2nd);
    const adultCost = numAdults * (classType === 'first' ? adultPrice1st : adultPrice2nd);
  
    const newTotalCost =  child5to13Cost + adultCost;
    setTotalCost(newTotalCost);
  }, [ numChildren5to13, numAdults, classType]);
  
  // ...
  
  const handleBookClick = () => {
    if (totalCost === 0){ alert(' Please input varied values ')}
    else{
        
    // Handle booking
    alert('Booking confirmed!');
    setModalOpen(true);
  }
  if(numAdults + numChildren5to13 > tr.remaining_first_class + tr.remaining_second_class)
  alert(tr.remaining_first_class + tr.remaining_second_class + " is more than the available seats")
    };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  
    


  return (
    <>
    <div className="book">
        <div className="search">
            <h1>Booking Page</h1>
            <div className="mysearch">
            <h3>Booking Search</h3>
      <p><strong>From:  </strong>{fromStation}</p>
      <p><strong>To: </strong> {toStation}</p>
      <p><strong> Date</strong>{date}</p>
            </div>
            <div className="modify">
                <h3>Modify Search</h3>
            <Search/>
            </div>
        </div>
        <div className="book-container">
            <h2>{trainToBook.train_name} name</h2>
            <div className="booking">
                <div className="class">
                    <div className="firstClass">
                        <span className="class-title">
                           <strong> First Class - {trainToBook.remaining_first_class} Seats Available</strong>
                        </span>
                        <div className="price">
                            <FaPeopleCarry  className="icon-type"/>
                            <div className="item">
                                Adults:
                                <span> KSH: 2000</span>
                            </div>
                        </div>
                        <div className="price">
                            <FaChild  className="icon-type"/>
                                                      
                            <div className="item">
                                Adults:
                                <span> KSH: 1000</span>
                            </div>
                        </div>
                        <div className="price"> 
                        <FaBaby  className="icon-type"/> 
                            <div className="item">
                                Adults:
                                <span> KSH: 0</span>
                            </div>
                        </div>
                    </div>
                 
                    <div className="secondClass">
                    <span className="class-title">
                           <strong> Second Class - { trainToBook.remaining_second_class} Seats Available</strong>
                    </span>
                    <div className="price">
                            <FaPeopleArrows className="icon-type"/>
                            <div className="item">
                                Adults:
                                <span> KSH: 1000</span>
                            </div>
                        </div>
                        <div className="price">
                            <FaChild  className="icon-type"/>                           
                            <div className="item">
                                Adults:
                                <span> KSH: 500</span>
                            </div>
                        </div>
                        <div className="price">
                            <FaBaby  className="icon-type" /> 
                            <div className="item">
                                Adults:
                                <span> KSH: 0</span>
                            </div>
                        </div>
                    </div>   
                </div>

                <div className="travelers">
      
                <h2>Train Booking</h2>
                        <div className="input-section"><div className="input-group">
                    <label>Adults</label>
                    <input
                        type="number"
                        max={5}
                        value={numAdults}
                        onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setNumAdults(value >= 0 && value < 5 ? value : 0); // Ensure the value is not negative
                        }}
                        min="0" // Set the minimum value to 0
                    />
                    </div>
                    <div className="input-group">
                    <label>Children (5-13 yrs)</label>
                    <input
                        type="number"
                        value={numChildren5to13}
                        onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setNumChildren5to13(value >= 0 && value < 5 ? value : 0); // Ensure the value is not negative
                        }}
                        min="0" // Set the minimum value to 0
                        max={5}
                    />
                    </div>
                    
                    
                    
                    </div>
                    <div className="input-group">
                        <label>Class Type</label>
                        <select value={classType} onChange={(e) => setClassType(e.target.value)}>
                            <option value="first">1st Class</option>
                            <option value="second">2nd Class</option>
                        </select>
                    </div>
                        <div className="total-cost">
                            <span>Total Cost: {totalCost} Ksh</span>
                        </div>
                        <button onClick={handleBookClick}>Book</button>
                    
                </div>


            </div>
        </div>
        <ReactModal
        isOpen={isModleOpen}
        onRequestClose={handleModalClose}
        contentLabel="Booking Form">
            <BookModal
            // isOpen={isModleOpen}
            onClose={handleModalClose}
            adultsCount ={numAdults}
            childrenCount={numChildren5to13}
            departureTime={date}
            from={fromStation}
            to={toStation}
            travelClass={classType}
            
            />

        </ReactModal>
        
    <Footer/>
    </div>
    </>
  )
}

export default Book