import { FaArrowAltCircleRight, FaMailBulk, FaPhone } from "react-icons/fa"
import  "./footer.css"
const Footer = () => {
  return (
    <div className="footer-container">
    <div className="footer">
            <div className="about">
                <h2>About</h2>
                <span className="aboutText">The Standard Gauge Railway (SGR) is a flagship project by the Government of Kenya as a transport component aimed at delivering Vision 2030 making Kenya a middle income country by 2030... more</span>
            </div>
            <div className="contactUse">
                <div className="call">
                    <FaPhone/>
                    <div> 
                        <span>073234234</span>
                        <span> -  Madaraka Express Passenger Service inquiries, complaints, lost & found.</span>
                    </div>
                    
                </div>
                <div className="call">
                    <FaPhone/>
                    <div> 
                        <span>073234234</span>
                        <span> -  Madaraka Express Passenger Service inquiries, complaints, lost & found.</span>
                    </div>
                    
                </div>
                <div className="call">
                    <FaPhone/>
                    <div> 
                        <span>073234234</span>
                        <span> -  Madaraka Express Passenger Service inquiries, complaints, lost & found.</span>
                    </div>
                    
                </div>
                <div className="call">
                    <FaMailBulk/>
                     <span>info@krc.co.ke</span>
                </div>
            </div>

            <div className="discover">
                <div className="discoverItems">
                    <FaArrowAltCircleRight/> 
                    <p>How to Book</p>
                </div>
                <div className="discoverItems">
                    <FaArrowAltCircleRight/> 
                    <p>How to Book</p>
                </div>
                <div className="discoverItems">
                    <FaArrowAltCircleRight/> 
                    <p>How to Book</p>
                </div>
                <div className="discoverItems">
                    <FaArrowAltCircleRight/> 
                    <p>How to Book</p>
                </div>
                <div className="discoverItems">
                    <FaArrowAltCircleRight/> 
                    <p>How to Book</p>
                </div>
            </div>
    </div>
        
        </div>
  )
}

export default Footer