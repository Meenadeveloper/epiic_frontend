import SuccessIcon from '../assets/images/Checkmark.svg'
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
        <div className='success-content'>
           <img src={SuccessIcon} alt="" />        
        <h2>Successfully Submitted!</h2>
           <p>Thank you! Your form has been successfully submitted.</p>
           <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
        </div>
               
       </div>
      
    </>
  )
}

export default SuccessPopup
