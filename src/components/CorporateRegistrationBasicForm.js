import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Required for styling
import { toast } from 'react-toastify'; // Import only the toast
import 'react-toastify/dist/ReactToastify.css';
import MailOtp from './MailOtp'; // Import the MailOtp component
import MobileOtp from './MobileOtp'; // Import the MobileOtp component
import { useNavigate } from 'react-router-dom';
import SuccessPopup from './SuccessPopup';

function CorporateRegistrationBasicForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(''); // State for the phone number
  const [isChecked, setIsChecked] = useState(false); // State for terms and conditions checkbox
  const [formErrors, setFormErrors] = useState({}); // State for form errors
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
     otp: '',
    password: '',
    confirmPassword: '',
    designation: '',
    organisation: ''
  });

  const [verifySuccessMessage, setVerifySuccessMessage] = useState('');
  const [verifySuccessMail, setVerifySuccessMail] = useState('');
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

     // Real-time validation for email
     if (name === 'email') {
      if (verifySuccessMail !== value) {
        setVerifySuccessMessage('');
        setActiveOtp(null);
      } else {
        setVerifySuccessMessage('OTP verified successfully'); 
        setActiveOtp('mail');
      }

      // Reset OTP verification and success message when the email changes
    setIsOtpValid(false); // Remove success state
    setOtpSent(false); // Reset OTP sent status
    //setActiveOtp(null); // Hide OTP box
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      email: '', // Clear email-specific error messages
    }));
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email is required',
        }));
      } else if (!emailRegex.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email format',
        }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear error if valid
      }

       // Clear the success message when email field changes
    if (successMessage) {
      setSuccessMessage('');
    }
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setFormErrors((prevErrors) => {
        const { checkbox, ...rest } = prevErrors; // Remove checkbox error
        return rest;
      });
    }
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    if (value) {
      setFormErrors((prevErrors) => {
        const { phoneNumber, ...rest } = prevErrors; // Remove phone number error
        return rest;
      });
    }
  };
  

  const validateForm = () => {  
    let errors = {};
     // Trim the phone number to remove extra spaces
  const trimmedPhoneNumber = phoneNumber.trim();

    // Validate first name and last name
    if (!formValues.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!formValues.lastName) {
      errors.lastName = 'Last name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = 'Invalid email format';
    }

   // Validate phone number with pattern
  const phoneRegex = /^\+91\d{10}$/;
  if (!trimmedPhoneNumber) {
    errors.phoneNumber = 'Mobile number is required';
  } else if (!phoneRegex.test(trimmedPhoneNumber)) {
    errors.phoneNumber = 'Mobile number must be in the format "+91XXXXXXXXXX"';
  }

  // Add trimmed phone number back to the state to ensure consistency
  setPhoneNumber(trimmedPhoneNumber);


    // Validate password length
    if (formValues.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Validate password match
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    // Validate designation and organisation
if (!formValues.designation) {
  errors.designation = 'Designation is required';
}
if (!formValues.organisation) {
  errors.organisation = 'Organisation is required';
}


    // Validate checkbox
    if (!isChecked) {
      errors.checkbox = 'You must accept the privacy & terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    try {
      const payload = {
        name: `${formValues.firstName} ${formValues.lastName}`,
        organization_name: formValues.organisation,
        email: formValues.email,
        password: formValues.password,
        mobile: phoneNumber,
        designation: formValues.designation,
      };

      const url = process.env.REACT_APP_EPIIC_CORPORATE_BASIC_REGISTER_URL;
      console.log(url)
      const params = new URLSearchParams(payload).toString();
      const fullUrl = `${url}?${params}`;

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Form submitted successfully!', {
          position: "top-right",
          className: 'toast-success',  // Use custom CSS class for success
        });
        console.log('Response:', data);

       // Show the popup upon successful form submission
       setShowSuccessPopup(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to submit form. Please try again.', {
          position: "top-right",
          className: 'toast-error',  // Use custom CSS class for error
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form. Please try again later.', {
        position: "top-right",
        className: 'toast-error',  // Use custom CSS class for error
      });
    }
  } else {
    toast.error('Please fix the form errors before submitting.', {
      position: "top-right",
      className: 'toast-error',  // Use custom CSS class for error
    });
  }
};


  const [activeOtp, setActiveOtp] = useState(null); // State to track which OTP component to show
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent

  const [isOtpValid, setIsOtpValid] = useState(false); // Track if OTP is valid (for green border)

  
  const [successMessage, setSuccessMessage] = useState('');
  const [isOtpEntered, setIsOtpEntered] = useState(false); // Track if OTP input is being typed

  const handleOtpInput = () => {
    setSuccessMessage(''); // Clear the success message when user enters OTP
  };

  const handleMailOtpClick = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      setFormErrors({ email: 'Email is required' });

      return;
    } else if (!emailRegex.test(formValues.email)) {
      setFormErrors({ email: 'Invalid Email Id' });

      return;
    }

    const email = formValues.email;
    const apiUrl = process.env.REACT_APP_OTP_MAIL_REQUEST_URL; // Use REACT_APP_ prefix
    console.log("API URL for mail OTP request:", apiUrl);

    try {
      // Make the API request
      const response = await fetch(`${apiUrl}?mail=${encodeURIComponent(email)}`, {
        method: 'POST', // Use POST method
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: email }) // Sending email in the request body
      });

      // Check if the response is OK before trying to parse it
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        const errorMessage = errorData.error?.mail?.[0] || 'Failed to send OTP'; // Extract specific error message
        throw new Error(errorMessage);
      }

      // If no error occurred, parse the success response
      const responseData = await response.json(); // Get the JSON response from the API
      console.log("API Response Data:", responseData);

      // Success case: Set success message and display it in UI
      setSuccessMessage(responseData.message );
      console.log('OTP sent successfully:', responseData);

      // Mark OTP as sent
      setOtpSent(true);

      // Show OTP verification input
      setActiveOtp('mail');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setFormErrors({ email: error.message });  // Show the error message near the form field
      setSuccessMessage('');
      setVerifySuccessMessage('');
    }
  };
  
  
  

  const handleMobileOtpClick = () => {
    setActiveOtp('mobile'); // Show the MobileOtp component
  };

  return (
    <>
      <div className='register-container'>
        <div className='custom-container'>
          <div className='register-box'>
            <div className='back-btn-box'>
              <button
                className='back-btn'
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = '/'; // Replace '/' with your fallback URL
                  }
                }}
              >
                Back
              </button>
            </div>
            <div className='register-form-container'>
              <div className='register-form-box'>
                <div className='register-heading'>
                  <h2>CORPORATE REGISTRATION</h2>
                </div>

                <form className='register-form' onSubmit={handleSubmit}>
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.firstName ? 'error-input' : ''}`}>
                        <label className='register-label'>First Name</label>
                        <input
                          type='text'
                          name='firstName'
                          className={`register-input ${formErrors.firstName ? 'err-input-field' : ''}`}
                          placeholder='Enter Name'
                          value={formValues.firstName}
                          onChange={handleInputChange}
                        />
                        {formErrors.firstName && <p className='error'>{formErrors.firstName}</p>}
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.lastName ? 'error-input' : ''}`}>
                        <label className='register-label'>Last Name</label>
                        <input
                          type='text'
                          name='lastName'
                          className={`register-input ${formErrors.lastName ? 'err-input-field' : ''}`}
                          placeholder='Enter last name'
                          value={formValues.lastName}
                          onChange={handleInputChange}
                        />
                        {formErrors.lastName && <p className='error'>{formErrors.lastName}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Email row */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.email ? 'error-input' : ''}`}>
                        <label className='register-label'>Email ID</label>
                        <input
                          type='text'
                          name='email'
                          className={`register-input ${formErrors.email ? 'err-input-field' : ''} ${isOtpValid ? 'success-input-field' : ''}`}
                          placeholder='Enter work mail ID'
                          value={formValues.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email && <p className='error'>{formErrors.email}</p>}
                        {successMessage && !verifySuccessMessage && (
                          <p className="success">{successMessage}</p>
                        )}
                        {verifySuccessMessage && <p className="success">{verifySuccessMessage}</p>}
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className='register-form-control otp-box'>
                      {!otpSent && activeOtp !== 'mail' && (
                        <button
                          type="button"
                            className="otp-btn"
                            onClick={handleMailOtpClick}
                             >
                          Send OTP
                        </button>
                      )}

                        {/* Render the MailOtp component */}
                     {activeOtp === 'mail' && 
                     
                     <MailOtp
                     email={formValues.email}
                     setIsOtpValid={setIsOtpValid}
                     resetVerification={!isOtpValid}
                     setVerifySuccessMessage={setVerifySuccessMessage}
                     setVerifySuccessMail={setVerifySuccessMail}
                     onOtpInput={handleOtpInput}
              />
                     }
                      </div>
                    </div>
                  </div>

                  {/* Mobile Number row with country code */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.phoneNumber ? 'error-input' : ''}`}>
                        <label className='register-label'>Mobile Number</label>
                        <PhoneInput
                          international
                          defaultCountry='IN'
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          className={`register-input mobile-input ${formErrors.phoneNumber ? 'err-input-field' : ''}`}
                          placeholder={phoneNumber ? '' : 'Enter mobile number'}
                        />
                        {formErrors.phoneNumber && <p className='error'>{formErrors.phoneNumber}</p>}
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className='register-form-control otp-box'>
                      {activeOtp !== 'mobile' && (
                        <button
                type="button"
                className="otp-btn"
                onClick={handleMobileOtpClick}
              >
                          Send OTP
                        </button>
                      )}
                      {/* Render the MobileOtp component */}
                       {activeOtp === 'mobile' && <MobileOtp />}
                      </div>
                    </div>
                  </div>

                  {/* Password row */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.password ? 'error-input' : ''}`}>
                        <label className='register-label'>Enter Password</label>
                        <input
                          type='password'
                          name='password'
                         
                          className={`register-input ${formErrors.password ? 'err-input-field' : ''}`}
                          placeholder='Enter Password'
                          value={formValues.password}
                          onChange={handleInputChange}
                        />
                        {formErrors.password && <p className='error'>{formErrors.password}</p>}
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.confirmPassword ? 'error-input' : ''}`}>
                        <label className='register-label'>Confirm Password</label>
                        <input
                          type='password'
                          name='confirmPassword'
                          className={`register-input ${formErrors.confirmPassword ? 'err-input-field' : ''}`}
                          placeholder='Confirm Password'
                          value={formValues.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {formErrors.confirmPassword && <p className='error'>{formErrors.confirmPassword}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Designation and Organisation */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div  className={`register-form-control ${formErrors.designation ? 'error-input' : ''}`}>
                        <label className='register-label'>Designation</label>
                        <input
                          type='text'
                          name='designation'
                          className={`register-input ${formErrors.designation ? 'err-input-field' : ''}`}
                          placeholder='Enter Designation'
                          value={formValues.designation}
                          onChange={handleInputChange}
                        />   
                         {formErrors.designation && <p className='error'>{formErrors.designation}</p>}

                      </div>
                    </div>

                    <div className='register-col'>
                      <div className={`register-form-control ${formErrors.organisation ? 'error-input' : ''}`}>
                        <label className='register-label'>Organisation</label>
                        <input
                          type='text'
                          name='organisation'
                          className={`register-input ${formErrors.organisation ? 'err-input-field' : ''}`}

                          placeholder='Enter organisation'
                          value={formValues.organisation}
                          onChange={handleInputChange}
                        />
                            {formErrors.organisation && <p className='error'>{formErrors.organisation}</p>}
      
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className='register-terms' style={{ marginBottom: '10px' }}>
                    <label className='checkbox-box'>
                      <input
                        type='checkbox'
                        className='term-checkbox'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <p>I Accept the Privacy & Terms conditions</p>
                    </label>
                    {formErrors.checkbox && <p className='error'>{formErrors.checkbox}</p>}
                  </div>

                  <div className='form-control'>
                    <button type='submit' className='submit-btn' >
                      Submit
                    </button>
                  </div>
                </form>
{/* Show success popup if form is successfully submitted */}
{showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} navigate={navigate} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporateRegistrationBasicForm;
