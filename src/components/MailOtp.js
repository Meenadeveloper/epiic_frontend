import React, { useState } from 'react';

function MailOtp() {
    const [otp, setOtp] = useState(["", "", "", ""]);
  
    const handleChange = (e, index) => {
      const value = e.target.value;
  
      // If input is not a number or is more than 1 character, return
      if (isNaN(value) || value.length > 1) return;
  
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      // Focus the next input when the user types
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate OTP
      if (otp.some((digit) => digit === "")) {
        alert("Please enter all OTP digits.");
        return;
      }
  
      // If OTP is valid, alert and navigate to login page
      alert(`Entered OTP: ${otp.join('')}`);
    };
  return (
    <>
      <div className='verify-box'>
  <div className='d-flex'>
         {otp.map((digit, index) => (
          <input
            key={index}
            type='tel'
            maxLength={1}
            id={`otp-input-${index}`}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onFocus={(e) => e.target.select()}  // Select the value on focus
            autoFocus={index === 0}  // Focus on the first input by default
            className={`otp-input ${digit === "" ? "" : "not-empty"}`} // Add otp-input and conditionally add "not-empty"
          />
        ))}
  </div>
  <p className='resent-otp'> 03:00s <button>Resend OTP</button></p>
</div>
                       
                        <button type='button' className='otp-btn' onClick={handleSubmit}>Submit</button>
                     
    </>
  )
}

export default MailOtp
