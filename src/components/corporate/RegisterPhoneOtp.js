import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
function RegisterPhoneOtp({isPhoneVerified,setIsPhoneVerified,formValues= {},setPhoneInParent}) {
    const [phoneNumber, setPhoneNumber] = useState(formValues.phone || '');
    const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(300);
    const [canResend, setCanResend] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [verifySuccessMessage, setVerifySuccessMessage] = useState('');
    const [isOtpSectionVisible, setIsOtpSectionVisible] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
  
    const API_OTP_REQUEST_URL = process.env.REACT_APP_OTP_PHONE_REQUEST_URL;
    const API_OTP_VERIFY_URL = process.env.REACT_APP_OTP_PHONE_VERIFY_URL;
  
    useEffect(() => {
      if (timer > 0 && !canResend) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
  
        return () => clearInterval(interval);
      } else if (timer === 0) {
        setCanResend(true);
      }
    }, [timer, canResend]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    };
  
    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^\+91\d{10}$/; // Validates "+91" followed by exactly 10 digits
      return phoneRegex.test(phone);
    };
  
    const handlePhoneChange = (newPhone) => {
      // Ensure newPhone is a string and trim any extra spaces from the phone number
    const sanitizedPhone = (newPhone || '').trim();  // Default to an empty string if newPhone is undefined
    setPhoneNumber(sanitizedPhone);
    setPhoneInParent(sanitizedPhone);
    console.log(sanitizedPhone)
      setErrorMessage('');
      setSuccessMessage('');
      setVerifySuccessMessage('');
  
      if (sanitizedPhone  !== verifiedPhoneNumber) {
        setIsOtpSectionVisible(false);
        setIsVerified(false);
        setIsPhoneVerified(false);
      } else {
        setIsVerified(true);
        setIsPhoneVerified(true);
      }
  
      // Check if phone number is empty
    if (!sanitizedPhone) {
      setErrorMessage('Phone number is required');
      setIsVerified('');
    }
    // Validate phone number format
    if (!validatePhoneNumber(sanitizedPhone)) {
      setErrorMessage('Please enter a valid phone number');
      setIsVerified(''); 
      return;
    }
    // Check if the phone number length is greater than 12 digits
    if (sanitizedPhone.length !== 13) {
      setErrorMessage('Phone number cannot be more than 12 digits');
      setIsVerified(''); 
      return;
    }
    };
  
    const handleSendOtp = async () => {
      const sanitizedPhoneNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces
    
      // Validate phone number is not empty
      if (!sanitizedPhoneNumber) {
        setErrorMessage('Please enter a valid phone number.');
        setSuccessMessage('');
        setIsVerified('');
        return;
      }
    
      // Validate phone number length
      if (sanitizedPhoneNumber.length  !== 13) {
        setErrorMessage('Phone number must be 10 digits');
        setSuccessMessage('');
        return;
      }
    
      try {
        const url = `${API_OTP_REQUEST_URL}?mobile=${sanitizedPhoneNumber}`;
        console.log("Sending OTP to:", sanitizedPhoneNumber);
        console.log("Request URL:", url);
    
        const response = await axios.post(url); // Send the request to the constructed URL
        console.log("API Response:", response);
    
        setSuccessMessage(response.data.message || 'OTP sent successfully.');
        setErrorMessage('');
        setIsOtpSectionVisible(true);
        setTimer(300);
        setCanResend(false);
      } catch (error) {
        console.error("Error sending OTP:", error.response || error.message);
    
        setErrorMessage(
          error.response?.data?.message || 'Error sending OTP. Please try again.'
        );
        setSuccessMessage('');
        setIsVerified('');
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
        const sanitizedPhoneNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces
        const url = `${API_OTP_REQUEST_URL}?mobile=${sanitizedPhoneNumber}`;
  
        console.log("Sending OTP to:", sanitizedPhoneNumber);
        console.log("Request URL:", url);
  
        const response = await axios.post(url, {});  // Empty body since the mobile is in the URL
        console.log("API Response:", response);
        setSuccessMessage(response.data.message || 'OTP resent successfully.');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'Error resending OTP. Please try again.'
        );
        setSuccessMessage('');
      }
    };
  
    const handleSubmitOtp = async () => {
      const enteredOtp = otp.join('');
      if (otp.some((digit) => digit === '')) {
        setErrorMessage('Please enter all OTP digits.');
        return;
      }
  
      const sanitizedPhoneNumber = phoneNumber.replace(/\s+/g, '');
  
      try {
        const response = await axios.post(
          `${API_OTP_VERIFY_URL}?otp=${enteredOtp}&mobile=${sanitizedPhoneNumber}`
        );
  
        setVerifySuccessMessage(response.data.message || 'OTP verified successfully.');
        setVerifiedPhoneNumber(phoneNumber);
        setIsVerified(true);
        setIsOtpSectionVisible(false);
        setErrorMessage('');
        setOtp(['', '', '', '']);
        setIsPhoneVerified(true);// Update parent component state
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'Invalid OTP. Please try again.'
        );
        setSuccessMessage('');
        setVerifySuccessMessage('');
        setOtp(['', '', '', '']);
        setIsPhoneVerified(false);// Update parent component state
  
      }
    };

  return (
    <>
      <div className="register-row">
      <div className="register-col">
        <div className={`register-form-control ${errorMessage ? 'error-input' : ''}`}>
          <label className="register-label">Phone Number</label>
          <PhoneInput
            international
            defaultCountry="IN"
            name="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`register-input ${isVerified ? 'success-input-field' : ''} ${errorMessage ? 'err-input-field' : ''}`}
            placeholder="Enter mobile number"
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          {verifySuccessMessage && <p className="success">{verifySuccessMessage}</p>}
        </div>
      </div>

      <div className="register-col">
        <div className="register-form-control">
          {!isOtpSectionVisible && phoneNumber !== verifiedPhoneNumber && (
            <button type="button" className="otp-btn" onClick={handleSendOtp}>
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
                {successMessage && <p className="success" style={{ marginTop: '10px' }}>{successMessage}</p>}
              </div>
              <p className="resent-otp corporate-reset">
                {canResend ? (
                  <button type="button" className="resent-otp" onClick={handleResendOtp}>
                    Resend OTP
                  </button>
                ) : (
                  `${formatTime(timer)} s`
                )}
              </p>
              <button type="button" className="otp-btn" onClick={handleSubmitOtp}>
                Submit
              </button>
            </div>
          )}

          {verifiedPhoneNumber && phoneNumber === verifiedPhoneNumber && (
            <button className="verified-btn" disabled>
              Verified
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default RegisterPhoneOtp
