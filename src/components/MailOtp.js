import React, { useState, useEffect } from 'react';

function MailOtp({ email, setIsOtpValid, resetVerification }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(5); // Timer in seconds
  const [canResend, setCanResend] = useState(false); // To control Resend button
  const [isVerified, setIsVerified] = useState(false); // Verification status
  const DUMMY_OTP = '1234'; // Predefined dummy OTP

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true); // Enable resend button after timer ends
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
  
    // Allow only one character and ensure it's a number
    if (isNaN(value) || value.length > 1) return;
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    // Move focus to the next input when typing forward
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  
    // Move focus to the previous input when deleting/backspacing
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  

  const handleResendOtp = async () => {
    try {
      const apiUrl = `https://www.epiic.amrithaa.net/api/otp/mail/request?mail=${encodeURIComponent(email)}`;
      const response = await fetch(apiUrl, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }

      alert('OTP resent successfully!');
      setTimer(5); // Reset timer
      setCanResend(false); // Disable resend until timer ends
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    if (otp.some((digit) => digit === '')) {
      alert('Please enter all OTP digits.');
      return;
    }

    if (enteredOtp === DUMMY_OTP) {
      alert('Dummy OTP verified successfully!');
      setIsVerified(true); // Mark as verified
      setIsOtpValid(true);
      return;
    }

    try {
      const apiUrl = `https://www.epiic.amrithaa.net/api/otp/mail/verify?mail=${encodeURIComponent(email)}&otp=${enteredOtp}`;
      const response = await fetch(apiUrl, { method: 'POST' });
      if (!response.ok) {
        throw new Error('OTP verification failed');
      }

      alert('OTP verified successfully!');
      setIsVerified(true); // Mark as verified
      setIsOtpValid(true);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    }
  };

  const resetOtp = () => {
    setOtp(['', '', '', '']);
    setIsVerified(false); // Reset verification status
    setTimer(5);
    setCanResend(false);
  };

  useEffect(() => {
    if (resetVerification) {
      resetOtp();
    }
  }, [resetVerification]);

  if (isVerified) {
    return <button className="verified-btn" disabled>Verified</button>;
  }



  return (
    
    <>
<div className='verify-box'>
      <div className='d-flex'>
      {otp.map((digit, index) => (
  <input
    key={index}
    type="tel"
    maxLength={1}
    id={`otp-input-${index}`}
    value={digit} // The value comes from the otp state
    onChange={(e) => handleChange(e, index)} // Update the value dynamically on change
    onFocus={(e) => e.target.select()} // Select value on focus
    autoFocus={index === 0} // Autofocus on the first input by default
    className={`otp-input ${digit === "" ? "" : "not-empty"}`} // Optional class to style the input
  />
))}

      </div>

      <p className='resent-otp'>
        {canResend ? (
          <button type="button" onClick={handleResendOtp}>
            Resend OTP
          </button>
        ) : (
          `0${timer}:00s`
        )}
      </p>

     
    </div>
     <button type='button' className='otp-btn' onClick={handleSubmit}>
     Submit
   </button>
    </>
  );
}

export default MailOtp;
