import React from 'react'

function SuccessPopup({ onClose, navigate }) {

    const handleContinue = () => {
        // Close the popup and navigate to /corporate-registration
        onClose(); // Close the popup
        navigate('/corporate-registration'); // Navigate to the page
      };
  return (
    <>
      <div class="successpopup-overlay"></div>
      <div class="success-popup">
        <button class="success-popup-close-btn"><span class="material-icons">close</span></button>
               <h2>Popup Title</h2>
           <p>This is a popup centered inside the form container.</p>
           <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
       </div>
      
    </>
  )
}

export default SuccessPopup
