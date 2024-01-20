import "./featured.css"
import { FaDollarSign, FaBus, FaCheck, FaComments } from 'react-icons/fa';

const Featured = () => {
  return (
    <div className="feature-section">
      <h2>Why travel with us</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <FaDollarSign className="icon" />
          <h3>LOWEST PRICES</h3>
          <p>We find the cheapest bus & train tickets, so you can wander for less.</p>
        </div>
        <div className="feature-card">
          <FaBus className="icon" />
          <h3>BEST TRAVEL OPTIONS</h3>
          <p>We partner with 500+ carriers to bring you the most bus & train options.</p>
        </div>
        <div className="feature-card">
          <FaCheck className="icon" />
          <h3>QUICK & EASY BOOKING</h3>
          <p>Book trips quickly with a simple, hassle-free checkout – online & on our app.</p>
        </div>
        <div className="feature-card">
          <FaComments className="icon" />
          <h3>FAST CUSTOMER SUPPORT</h3>
          <p>We don’t monkey around. We respond within minutes to help you out.</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
