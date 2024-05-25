import "../styles/navbar.css"
import {FaBars , FaSubway, FaTimes } from "react-icons/fa";
import { useRef } from "react";


  function Navbar() {
        
    const navRef = useRef(null);
     const showNavbar = () =>{
        navRef.current.classList.toggle("responsive-nav");
     }

    return (
    <div className="navbar">
        <header>
           <div className="logo">
            <FaSubway/>
            <h3>T-Bookers</h3>
           </div>
            <nav ref={navRef}>
                <a href="/" onClick={showNavbar}>Home</a>
                <a 
                href="#Aboout"
                onClick={showNavbar}>About</a>
                <a
                href="#us"
                 onClick={showNavbar}>Services</a>
                
                <a 
                href="/ticketCancling"
                onClick={showNavbar}>Ticket Cancel</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
                </nav>
                
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars/>
                </button>
            
        </header>
    </div>
  )
}

export default Navbar