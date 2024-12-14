import React, { useState } from 'react';
import 'react-phone-number-input/style.css'; // Required for styling
import { toast } from 'react-toastify'; // Import only the toast
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessPopup from './SuccessPopup';
import RegisterEmailOtp from './corporate/RegisterEmailOtp';
import RegisterPhoneOtp from './corporate/RegisterPhoneOtp';

function CorporateRegistrationBasicForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // New state for phone verification
  const [isChecked, setIsChecked] = useState(false); // State for terms and conditions checkbox
  const [formErrors, setFormErrors] = useState({}); // State for form errors
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    password: '',
    confirmPassword: '',
    designation: '',
    organisation: '',
  });

 
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  
  };

   // Function to update only the email field
   const updateEmailInParent = (newEmail) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      email: newEmail, // Update only the email field
    }));
     // Log the new email value to check if it is passed correctly
     console.log('Updated email in parent:', newEmail);
  };

   // Function to update only the email field
   const updatePhoneInParent = (newPhone) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      phone: newPhone, // Update only the phone field
    }));
     // Log the new phone value to check if it is passed correctly
     console.log('Updated email in parent:', newPhone);
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

  const validateForm = () => {  
    let errors = {};

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
  if (!formValues.phone) {
    errors.phone = 'Mobile number is required';
  } else if (!phoneRegex.test(formValues.phone)) {
    errors.phone = 'Mobile number must be in the format "+91XXXXXXXXXX"';
  }

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
 if (!isEmailVerified) {
     toast.error("Please verify your email OTP.");
     return;
   }
   if (!isPhoneVerified) {
       toast.error("Please verify your phone OTP.");
       return;
     }
  if (validateForm()) {

    try {
      const payload = {
        name: `${formValues.firstName} ${formValues.lastName}`,
        organization_name: formValues.organisation,
        email: formValues.email,
        password: formValues.password,
        mobile: formValues.phone,
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
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token and form data in localStorage (or sessionStorage)
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('form_data', JSON.stringify(formValues));
        console.log('User data:', data); // Log all the user data
        console.log('Token:', data.access_token); // Log the token

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
                  <RegisterEmailOtp
                     formValues={formValues}
                      isEmailVerified={isEmailVerified}
                      setIsEmailVerified={setIsEmailVerified}
                      setEmailInParent={updateEmailInParent} // Pass the function to the child
                      />
                   
                   <RegisterPhoneOtp
                   formValues={formValues}
                    isPhoneVerified={isPhoneVerified}
                    setIsPhoneVerified={setIsPhoneVerified}
                    setPhoneInParent={updatePhoneInParent}// Pass the function to the child
                               
                   />

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
