import { FaArrowAltCircleRight, FaMailBulk, FaPhone } from "react-icons/fa"
import  "../styles/footer.css"
import  { useState } from 'react';

const Footer = () => {
  const [toastContent, setToastContent] = useState(null);

  const handleDiscoverItemClick = (content) => {
    setToastContent(content);
  };

  const closeToast = () => {
    setToastContent(null);
  };

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
          <div className="discoverItems" onClick={() => handleDiscoverItemClick(<span><strong>How to Book</strong>

Visit the Booking Platform: Access the official booking platform of the service provider. This could be a website or a mobile application.

Select Journey Details: Enter the required journey details such as origin, destination, date, and time of travel.

Choose Ticket Type: Select the type of ticket you wish to book, such as one-way, round-trip, or multi-city.

Select Seats: Choose the preferred seats if the option is available. Some platforms allow passengers to select specific seats during the booking process.

Provide Passenger Information: Enter the required passenger information, including names, ages, and contact details.

Review and Confirm: Review the journey details, selected seats, and passenger information carefully. Make any necessary changes and proceed to confirm the booking.

Make Payment: Choose the preferred payment method and complete the payment process securely.

Receive Confirmation: Once the booking is confirmed, you will receive a booking confirmation via email or SMS, which will include your booking reference number and other relevant details.

Retrieve Tickets: Depending on the service provider, you may receive electronic tickets that can be downloaded and printed or stored digitally on your mobile device.

Arrive on Time: Ensure to arrive at the departure point on time with your tickets and necessary identification documents for a smooth boarding process.</span>)}>
            <FaArrowAltCircleRight /> 
            <p>How to Book</p>
          </div>
          <div className="discoverItems" onClick={() => handleDiscoverItemClick(<span>How to Cancel a Ticket:

Access Booking Platform: Log in to the booking platform where the ticket was purchased. This can be done through the website or mobile application.

Retrieve Booking: Locate the booking or reservation that you wish to cancel using the booking reference number or login credentials.

Navigate to Cancelation Section: Find the option to cancel or modify the booking within the platform's menu or settings.

Select Ticket to Cancel: Choose the specific ticket or booking that you want to cancel from the list of your reservations.

Review Cancelation Policy: Review the cancelation policy of the service provider to understand any applicable fees or conditions associated with canceling the ticket.

Confirm Cancelation: Confirm the cancelation request and follow any additional prompts to complete the process.

Receive Confirmation: Upon successful cancelation, you will receive a cancelation confirmation via email or SMS, acknowledging the cancelation of your ticket.

Check Refund Status: If applicable, check the status of your refund according to the service provider's refund policy. Refunds are typically processed within a certain timeframe.

Note Any Fees: Be aware of any cancelation fees or charges that may apply, as these will be deducted from the refund amount.

Retain Documentation: Keep a record of the cancelation confirmation and any related documentation for your records.</span>)}>
            <FaArrowAltCircleRight /> 
            <p>How to Cancel a Ticket</p>
          </div>
          <div className="discoverItems" onClick={() => handleDiscoverItemClick(<span>How to Get a Refund:

Check Refund Policy: Review the refund policy of the service provider to understand the conditions under which refunds are permitted and any applicable fees or charges.

Initiate Refund Request: Contact the customer support or visit the refund section on the booking platform to initiate a refund request.

Provide Booking Details: Provide the necessary booking details such as the booking reference number, passenger names, and travel dates to facilitate the refund process.

Reason for Refund: Provide a valid reason for requesting a refund, such as cancellation of the journey, change in travel plans, or service disruption.

Submit Refund Request: Submit the refund request through the designated channel, which may include filling out an online form, sending an email, or contacting customer support.

Wait for Processing: Allow time for the refund request to be processed by the service provider. Refunds are typically processed within a certain timeframe specified in the refund policy.

Check Refund Status: Monitor the status of your refund request through the booking platform or by contacting customer support if necessary.

Receive Refund Confirmation: Upon approval of the refund request, you will receive a refund confirmation via email or SMS, confirming the amount refunded and the method of reimbursement.

Verify Refund Amount: Verify that the refunded amount matches the amount specified in the refund confirmation and check your bank or payment account for the refund transaction.

Retain Documentation: Keep a record of the refund confirmation and any related documentation for your records and reference.</span>)}>
            <FaArrowAltCircleRight /> 
            <p>How to Get a Refund</p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastContent && (
        <div className="toast">
          <div className="toast-content">
            <span className="close" onClick={closeToast}>&times;</span>
            <h2>Answer</h2>
            <p>{toastContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
