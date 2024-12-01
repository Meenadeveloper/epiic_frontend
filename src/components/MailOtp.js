import React, { useState, useEffect } from 'react';

function MailOtp({ email, setIsOtpValid, resetVerification, setVerifySuccessMessage, setVerifySuccessMail, onOtpInput  }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false); // To control Resend button
  const [isVerified, setIsVerified] = useState(false); // Verification status
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  // Timer countdown effect
useEffect(() => {
  if (timer > 0) {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount or when timer changes
  } else {
    setCanResend(true); // Enable the resend button after the timer reaches 0
  }
}, [timer]);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only one character and ensure it's a number
    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
   
    if (value && onOtpInput) {
      onOtpInput(); // Clear success message on input
    }

    // Move focus to the next input when typing forward
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Move focus to the previous input when deleting/backspacing
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Handle resend OTP request
  const handleResendOtp = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_OTP_MAIL_REQUEST_URL}?mail=${encodeURIComponent(email)}`;
      const response = await fetch(apiUrl, { method: 'POST' });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      const responseData = await response.json(); // Parse the response
      console.log(responseData.message ); // Display the success message
      setSuccessMessage(responseData.message );
      setTimer(300); // Reset timer to 5 minutes (300 seconds)
      setCanResend(false); // Disable resend until timer ends
      setErrorMessage(''); // Clear any error messages after successful resend
    } catch (error) {
      console.error('Error resending OTP:', error);
      setErrorMessage(error.message); // Set the error message for display
    }
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    if (otp.some((digit) => digit === '')) {
      setErrorMessage('Please enter all OTP digits.'); // Show a message if OTP is incomplete
      return;
    }

    try {
      // Log email and OTP for debugging
      console.log('Verifying OTP for email:', email);
      console.log('Entered OTP:', enteredOtp);

      const apiUrl = `${process.env.REACT_APP_OTP_MAIL_VERIFY_URL}?mail=${encodeURIComponent(email)}&otp=${enteredOtp}`;
      console.log('API URL:', apiUrl); // Log the full URL to check the request

      const response = await fetch(apiUrl, { method: 'POST' });
      
      // Check if the response is successful
      if (!response.ok) {
        const responseData = await response.json(); // Parse the error response
        console.error('Error response:', responseData); // Log the error response for debugging

        // Ensure to throw the error with the appropriate message from the API response
      const errorMessage = responseData.error || 'OTP verification failed';
      setErrorMessage(errorMessage); // Display the error message
      throw new Error(errorMessage); // Throw the error to stop further processing
      }

      const responseData = await response.json(); // Parse the response
      setVerifySuccessMessage(responseData.message );
      setVerifySuccessMail(email);
      console.log(responseData);
      setIsVerified(true); // Mark as verified
      setIsOtpValid(true); // Update parent state
      setErrorMessage(''); // Clear error message after successful verification
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage(error.message || 'Invalid OTP. Please try again.'); // Display the actual error message from the API response
      setVerifySuccessMessage(''); // Clear success message in case of failure
    }
  };



  // Reset OTP and verification state
  const resetOtp = () => {
    setOtp(['', '', '', '']);
    setIsVerified(false); // Reset verification status
    setTimer(5);
    setCanResend(false);
    setErrorMessage(''); // Clear any error messages
    setSuccessMessage(''); // Clear success message
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
      <div className="d-inline">
        <div className="verify-box">
          <div className="d-flex">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="tel"
                maxLength={1}
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onFocus={(e) => e.target.select()}
                autoFocus={index === 0}
                className={`otp-input ${digit === "" ? "" : "not-empty"}`}
              />
            ))}
          </div>

          {/* Display error message */}
          {errorMessage && <p className="error otp-message">{errorMessage}</p>}

          {/* Display success message */}
          {successMessage && <p className="success otp-message">{successMessage}</p>}

          <p className="resent-otp">
            {canResend ? (
              <button type="button" className="resent-otp" onClick={handleResendOtp}>
                Resend OTP
              </button>
            ) : (
              `0${timer}:00s`
            )}
          </p>
        </div>

        <button type="button" className="otp-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default MailOtp;
