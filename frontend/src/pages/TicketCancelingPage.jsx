import { useState } from 'react';
import axios from 'axios';
import '../styles/ticketC.css'; // Import the CSS file
import Footer from '../components/Footer';

function TicketCancelingPage() {
  const [ticketNo, setTicketNo] = useState('');
  const [id, setId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:3000/ticketCanceling',  {
        data: {
          ticketNo,
          id,
          phoneNo
        }
    });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="ticket-canceling-page">
      <h2>Ticket Canceling Page</h2>

      <div className="message">        
      {message && <p>{message}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ticketNo">Ticket Number:</label>
          <input type="text" id="ticketNo" value={ticketNo} onChange={(e) => setTicketNo(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone Number:</label>
          <input type="text" id="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
        </div>
        <button type="submit">Cancel Ticket</button>
      </form>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}

export default TicketCancelingPage;
