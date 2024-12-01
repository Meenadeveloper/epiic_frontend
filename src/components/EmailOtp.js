import React, { useState, useEffect } from 'react';

function EmailOtp({ email, onOtpInput }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false); // To control Resend button
  const [errorMessage, setErrorMessage] = useState('');
  const [verifySuccessMessage, setVerifySuccessMessage] = useState('');
  const [verifySuccessMail, setVerifySuccessMail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);

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

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

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

      const apiUrl = `${process.env.REACT_APP_OTP_MAIL_VERIFY_URL}?mail=${encodeURIComponent(
        email
      )}&otp=${enteredOtp}`;
      console.log('API URL:', apiUrl); // Log the full URL to check the request

      const response = await fetch(apiUrl, { method: 'POST' });

      // Check if the response is successful
      if (!response.ok) {
        const responseData = await response.json(); // Parse the error response
        console.error('Error response:', responseData); // Log the error response for debugging

        const errorMessage = responseData.error || 'OTP verification failed';
        setErrorMessage(errorMessage); // Display the error message
        throw new Error(errorMessage); // Throw the error to stop further processing
      }

      const responseData = await response.json(); // Parse the response
      setVerifySuccessMessage(responseData.message);
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

  // Handle Resend OTP functionality
  const handleResendOtp = () => {
    setTimer(300); // Reset timer to 5 minutes
    setCanResend(false); // Disable resend button until the timer runs out
    // Implement logic to resend OTP here, e.g., send a request to the server
    console.log('Resending OTP...');
  };

  return (
    <>
      <div className='register-row'>
        <div className='register-col'>
          <div className="register-form-control">
            <label className='register-label'>Email ID</label>
            <input
              type='email'
              name='email'
              className="register-input"
              placeholder='Enter work mail ID'
              value={email}
              readOnly // Assuming the email is pre-filled and not editable
            />
            <p className='error'></p>
          </div>
        </div>

        <div className='register-col'>
          <div className='register-form-control'>
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
            {verifySuccessMessage && (
           <p className="success">{verifySuccessMessage}</p>
           )}
              
            </div>
            <p className="resent-otp corporate-reset">
                {canResend ? (
                  <button
                    type="button"
                    className="resent-otp"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </button>
                ) : (
                  ` ${formatTime(timer)} s`
                )}
              </p>

            <button type="button" className="otp-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          </div>
         
        </div>
      </div>
     
    </>
  );
}

export default EmailOtp;
