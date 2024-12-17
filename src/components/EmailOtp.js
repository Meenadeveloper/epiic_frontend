import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmailOtp({ isEmailVerified, setIsEmailVerified }) {
  const [email, setEmail] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState(''); // Store the verified email
  const [otp, setOtp] = useState(['', '', '', '']); // OTP input fields
  const [timer, setTimer] = useState(300); // Timer for OTP expiration (5 minutes)
  const [canResend, setCanResend] = useState(false); // Flag to manage resend button
  const [errorMessage, setErrorMessage] = useState(''); // Error messages
  const [successMessage, setSuccessMessage] = useState(''); // Success messages
  const [verifySuccessMessage, setVerifySuccessMessage] = useState(''); // OTP verification success message
  const [isOtpSectionVisible, setIsOtpSectionVisible] = useState(false); // Show OTP input section
  const [isVerified, setIsVerified] = useState(false); // Verify if email is successfully verified

  const API_OTP_REQUEST_URL = process.env.REACT_APP_OTP_MAIL_REQUEST_URL;
  const API_OTP_VERIFY_URL = process.env.REACT_APP_OTP_MAIL_VERIFY_URL;

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    else if (timer === 0) {
      setCanResend(true); // Enable Resend OTP button when timer finishes
    }
  }, [timer, canResend]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
     setErrorMessage('');
    setSuccessMessage('');
    setVerifySuccessMessage('');
    

    /// Reset OTP section visibility if email is different from verified email
    if (newEmail !== verifiedEmail) {
      setIsOtpSectionVisible(false);
      setIsVerified(false);
      setIsEmailVerified(false);
    } else {
      setIsVerified(true);
      setIsEmailVerified(true);
    }

     // Validate email format
     if (!validateEmail(newEmail)) {
      setSuccessMessage(''); // Clear success message if email format is invalid
    }
    // Check if email is empty and show error message
  if (newEmail.trim() === '') {
    setErrorMessage('Email is required');
    setIsVerified('');
  }

  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setSuccessMessage(''); // Clear any success message when email is invalid
      return;
    }

    try {
      const response = await axios.post(API_OTP_REQUEST_URL, { mail: email });
      setSuccessMessage(response.data.message || 'OTP sent successfully.');
      setErrorMessage(''); // Clear error message on success
      setIsOtpSectionVisible(true);
      setTimer(300); // Reset timer on OTP sent
      setCanResend(false); // Disable resend button until timer expires
    } catch (error) {
      // console.log("email otp error response",error)
      setErrorMessage(
        error.response?.data?.error?.mail 
      );
      setSuccessMessage(''); // Clear success message on error
    }
  };

  const handleChangeOtp = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleResendOtp = async () => {
    setTimer(300);
    setCanResend(false);

    try {
      const response = await axios.post(API_OTP_REQUEST_URL, { mail: email });
      setSuccessMessage(response.data.message || 'OTP resent successfully.');
      setErrorMessage(''); // Clear error message on resend success
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error?.mail  || 'Error resending OTP. Please try again.'
      );
      setSuccessMessage(''); // Clear success message on resend error
    }
  };

  const handleSubmitOtp = async () => {
    const enteredOtp = otp.join('');
    if (otp.some((digit) => digit === '')) {
      setErrorMessage('Please enter all OTP digits.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_OTP_VERIFY_URL}?mail=${email}&otp=${enteredOtp}`
      );
      setVerifySuccessMessage(response.data.message || 'OTP verified successfully.');
      setVerifiedEmail(email); // Mark this email as verified
      setIsVerified(true);
      setIsOtpSectionVisible(false);
      setErrorMessage(''); // Clear error message on verify success  
    // Clear OTP input fields
    setOtp(['', '', '', '']);
    setIsEmailVerified(true); // Update parent component state
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Invalid OTP. Please try again.'
      );
      setSuccessMessage(''); // Clear any success message when email is invalid
      setVerifySuccessMessage(''); // Clear success message on verify error
       // Clear OTP input fields on failure as well (optional)
    setOtp(['', '', '', '']);
    setIsEmailVerified(false);
    }
  };

  return (
    <div className="register-row">
       <div className="register-col">
       <div
        className={`register-form-control ${errorMessage ? 'error-input' : ''}`}
      >
        <label className="register-label">Email ID</label>
        <input
          type="email"
          name="email"
          className={`register-input ${
             isVerified ? 'success-input-field' : ''
          } ${errorMessage ? 'err-input-field' : ''}`}
          placeholder="Enter work mail ID"
          value={email}
          onChange={handleChangeEmail}
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {verifySuccessMessage && (
              <p className="success">{verifySuccessMessage}</p>
            )}      </div>
       </div>
     
        <div className="register-col">
          <div className="register-form-control">

          {!isOtpSectionVisible && email !== verifiedEmail &&(
        <button
          type="button"
          className="otp-btn"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>
      )}

          {isOtpSectionVisible && (
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
                      onChange={(e) => handleChangeOtp(e, index)}
                      onFocus={(e) => e.target.select()}
                      autoFocus={index === 0}
                      className={`otp-input ${digit === '' ? '' : 'not-empty'}`}
                    />
                  ))}
                </div>
                {successMessage && (
              <p className="success" style={{marginTop:'10px'}}>{successMessage}</p>
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
                  `${formatTime(timer)} s`
                )}
              </p>
              <button
                type="button"
                className="otp-btn"
                onClick={handleSubmitOtp}
              >
                Submit
              </button>
            </div>
          )}


          {verifiedEmail && email === verifiedEmail &&  (
        <button className="verified-btn" disabled>
          Verified
        </button>
      )}

          </div>
        </div>     
    </div>
  );
}

export default EmailOtp;
