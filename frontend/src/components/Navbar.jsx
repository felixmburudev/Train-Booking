import { Link } from "react-scroll"
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
                <Link to="Home"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500} onClick={showNavbar}>Home</Link>
                <Link 
                activeClass="active"
                to="About"
                spy={true}
                smooth={true}
                offset={-80}
                duration={ 500}onClick={showNavbar}>About</Link>
                <Link 
                activeClass="active"
                to="Services"
                spy={true}
                smooth={true}
                offset={-80}
                duration={ 500} onClick={showNavbar}>Services</Link>
                <Link 
                activeClass="active"
                to="Contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={700} onClick={showNavbar}>Contact Us</Link>
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