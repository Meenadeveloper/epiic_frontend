import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Required for styling

import MailOtp from './MailOtp'; // Import the MailOtp component
import MobileOtp from './MobileOtp'; // Import the MobileOtp component

function CorporateRegistrationBasicForm() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

     // Real-time validation for email
     if (name === 'email') {
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

        const url = `https://www.epiic.amrithaa.net/api/corporate/register`;
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
          alert('Form submitted successfully!');
          console.log('Response:', data);

          // Reset form after successful submission
          setFormValues({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            designation: '',
            organisation: '',
          });
          setPhoneNumber('');
          setIsChecked(false);
          setFormErrors({});
        } else {
          alert('Failed to submit form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      console.log('Form has errors');
    }
  };


  const [activeOtp, setActiveOtp] = useState(null); // State to track which OTP component to show
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent

  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification
  const [isOtpValid, setIsOtpValid] = useState(false); // Track if OTP is valid (for green border)

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
    const apiUrl = `https://www.epiic.amrithaa.net/api/otp/mail/request?mail=${encodeURIComponent(email)}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // Use POST method
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: email }) // Sending email in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
  
      const data = await response.json();
      console.log('OTP sent successfully:', data);
  
      // Mark OTP as sent
      setOtpSent(true);
  
      // Show OTP verification input
      setActiveOtp('mail');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  const handleOtpVerification = () => {
    setOtpVerified(true);
    setIsOtpValid(true); // Set to true to turn email border green
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
                        {isOtpValid && <p className="success">Email verified successfully!</p>}
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
                     {activeOtp === 'mail' && <MailOtp />}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporateRegistrationBasicForm;
