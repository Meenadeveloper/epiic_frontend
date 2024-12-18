
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import StateInput from './CollegeRegInputs/StateInput';
import DistrictInput from './CollegeRegInputs/DistrictInput';
import InstituteNameInput from './CollegeRegInputs/InstituteNameInput';
import InstituteTypeInput from './CollegeRegInputs/InstituteTypeInput';
import FirstNameInput from './CollegeRegInputs/FirstNameInput';
import LastNameInput from './CollegeRegInputs/LastNameInput';
import PasswordInput from './CollegeRegInputs/PasswordInput';
import DesignationInput from './CollegeRegInputs/DesignationInput';
import CollegeLogoInput from './CollegeRegInputs/CollegeLogoInput';
import CollegeEmailOtp from './CollegeRegInputs/CollegeEmailOtp';
import CollegePhoneOtp from './CollegeRegInputs/CollegePhoneOtp';
import { storecollegeUserData } from './CollegeStore';
import { isAuthenticated } from './CollegeAuth';

function CollegeRegistrationForm() {
  // Inside your component, initialize useNavigate
const navigate = useNavigate();
   const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
 const [formData, setFormData] = useState({
    college_id: '',  
    collegeName:'' ,
    stateId: '',
    stateName: '',
    districtId: '',
    districtName: '',
    instituteType:'',
    firstName:'',
    lastName:'',
    password:'',
    designation:'',
    college_logo:'',
    email_id: '',
    mobile:'',

  });
  const [formErrors, setFormErrors] = useState({
    college_id: '',  
    collegeName:'' ,
    stateId: '',
    stateName: '',
    districtId: '',
    districtName: '',
    instituteType:'',
    firstName:'',
    lastName:'',
    password:'',
    designation:'',
    email_id: '',
    mobile:'',

  });
  

  // This function is called by StateInput when a state is selected
  const handleStateSelect = (stateId, stateName) => {
    setFormData((prevData) => ({
      ...prevData,
      stateId: stateId,  // Update the state ID
      stateName: stateName,  // Update the state name
    }));
  };
 
  // This function is called by DistrictInput when a district is selected
  const handleDistrictSelect = (districtId, districtName) => {
    setFormData((prevData) => ({
      ...prevData,
      districtId: districtId,  // Update the district ID
      districtName: districtName,  // Update the district name
    }));
  };
 // Function to update only the email field
 const updateEmailInParent = (newEmail) => {
    setFormData((prevData) => ({
      ...prevData,
      email_id: newEmail, // Update only the email field
    }));
     // Log the new email value to check if it is passed correctly
     console.log('Updated email in parent:', newEmail);
  };

  // Function to update only the email field
  const updatePhoneInParent = (newPhone) => {
    setFormData((prevData) => ({
      ...prevData,
      mobile: newPhone, // Update only the phone field
    }));
     // Log the new phone value to check if it is passed correctly
     console.log('Updated email in parent:', newPhone);
  };

 // Handle changes to the form
 const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // This method will be passed to the child and update formData in the parent
  const handleFileChange = (file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      college_logo: file, // Set the file object in formData
    }));
  };
  const validateForm = () => {
    let errors = {};

    if (!formData.college_id) {
      errors.college_id = 'Institute Name is required';
    }
    if (!formData.stateId) {
        errors.stateId = 'State  is required';
      }
      if (!formData.districtId) {
        errors.districtId = 'District is required';
      }
      if (!formData.instituteType) {
        errors.instituteType = 'Institute is required';
      }
      if (!formData.firstName) {
        errors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        errors.lastName = 'Last Name is required';
      }
      if (!formData.password) {
        errors.password = 'Password is  required';
      }
      else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters ';
      }

      if (!formData.designation) {
        errors.designation = "The designation field is required.";
      }
      if (!formData.college_logo) {
        errors.college_logo = "Logo is required.";
      }
      // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email_id) {
      errors.email_id = 'Email is required';
    } else if (!emailRegex.test(formData.email_id)) {
      errors.email_id = 'Invalid email format';
    }

   // Validate phone number with pattern
  const phoneRegex = /^\+91\d{10}$/;
  if (!formData.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!phoneRegex.test(formData.mobile)) {
    errors.mobile = 'Mobile number must be in the format "+91XXXXXXXXXX"';
  }


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous form errors
    setFormErrors({});  // Clears previous error messages
  
    // Log form data for debugging
    console.log(formData);
    
    if (!isEmailVerified) {
      toast.error("Please verify your email OTP.");
      return;
    }
    
    if (!isPhoneVerified) {
      toast.error("Please verify your phone OTP.");
      return;
    }
  
    // Validate the form before proceeding
    if (validateForm()) {
      try {
        // Prepare the payload for submission
        const payload = {
          college_id: formData.college_id,
          stateName: formData.stateName,
          districtName: formData.districtName,
          collegeName: formData.collegeName,
          instituteType: formData.instituteType,
          name: `${formData.firstName} ${formData.lastName}`,
          email_id: formData.email_id,
          mobile: formData.mobile,
          password: formData.password,
          designation: formData.designation,
          logo: formData.college_logo,
        };
  
        // Log the payload for debugging
        console.log(payload);
  
        // Define the API endpoint (ensure it's correctly set in the .env file)
        const url = process.env.REACT_APP_COLLEGE_POST_REG_API;
  
        // Make the POST request
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        // Handle the API response
        if (response.ok) {
          const data = await response.json();
  
          // Store tokens and form data in localStorage
          // localStorage.setItem('access_token', data.access_token);
          // localStorage.setItem('form_data', JSON.stringify(formData));
          storecollegeUserData(data.access_token);
          // Display success message using toast
          toast.success(data.message || 'Form submitted successfully!', {
            position: 'top-right',
            className: 'toast-success',
          });
  
          // Clear the form data after successful submission
          setFormData({
            college_id: '',
            stateName: '',
            districtName: '',
            collegeName: '',
            instituteType: '',
            firstName: '',
            lastName: '',
            email_id: '',
            mobile: '',
            password: '',
            designation: '',
            college_logo: null,
          });
  
          // Navigate to the 'college-register' page and pass formData as state
          // navigate('/college-registration', { state: { formData } });
        } else {
          const errorData = await response.json();
          console.error('Server error details113:', errorData);
  
          // Display the response error in the respective form fields
          setFormErrors({
            ...formErrors,   // Include previous form errors (if any)
            ...errorData.errors  // Assuming the server returns error messages in an "errors" object
          });
  
          // Display error messages for each field using toast notifications
  Object.keys(errorData.errors).forEach((key) => {
    const fieldErrors = errorData.errors[key]; // This will be an array of error messages

    if (Array.isArray(fieldErrors)) {
      fieldErrors.forEach(errorMessage => {
        // Show each error message using toast
        toast.error(errorMessage, {
          position: 'top-right',
          className: 'toast-error',
        });
      });
    }
  });
        }
      } catch (error) {
        // Handle any errors during the request
        console.error('Error submitting form:', error);
        toast.error('An error occurred while submitting the form. Please try again later.', {
          position: 'top-right',
          className: 'toast-error',
        });
      }
    } else {
      // Display validation error if form is invalid
      toast.error('Please fix the form errors before submitting.', {
        position: 'top-right',
        className: 'toast-error',
      });
    }
  };
  
  if(isAuthenticated()){
  return <Navigate  to="/college-registration" />
  }
     
  return (
    <>
      <div className="register-container">
      <div className="custom-container">
        <div className="register-box">
          <div className="back-btn-box">
            <button
              className="back-btn"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
            >
              Back
            </button>
          </div>

          <div className="register-form-container">
            <div className="register-form-box college-register">
              <div className="reg-form-content-box">
                <div className="register-heading">
                  <h2>COLLEGE REGISTRATION</h2>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>

                  <div className="register-row">
                    <div className="register-col">
                     <StateInput
                      formData={formData}  // Passing formData to the child
                      formErrors={formErrors}  // Passing formErrors to the child
                      onStateSelect={handleStateSelect}  // Passing the callback function
                      selectedStateName={formData.stateName}  // Passing the selected state name (edit mode)
                      selectedStateId={formData.stateId}  // Passing the selected state ID (edit mode)
                      name="state_name"  // Name for the hidden input
                     />
                    </div>

                    <div className="register-col">
                      <DistrictInput
                       formData={formData}  // Passing formData to the child
                       formErrors={formErrors}  // Passing formErrors to the child
                       onDistrictSelect={handleDistrictSelect} 
                       selectedDistrictName={formData.districtName}
                       selectedDistrictId={formData.districtId}
                       stateId={formData.stateId}  // Pass stateId from formData here
                       name="districtName"
                      />
                    </div>
                  </div>

                  <div className="register-row">
                    <div className="register-col">
                      <InstituteTypeInput
                       formData={formData}  // Passing formData to the child
                       formErrors={formErrors}  // Passing formErrors to the child
                       handleChange={handleChange}
                      />

                    </div>
                    <div className="register-col">
                        <InstituteNameInput
                        formData={formData}  // Passing formData to the child
                        formErrors={formErrors}  // Passing formErrors to the child
                        districtId={formData.districtId}
                        handleChange={handleChange}
                        />
                    </div>
                  </div>

                  <div className="borderless-form-box">
                    <h2 className="form-sub-head">Personal Details</h2>

                    <div className="register-row">
                      <div className="register-col">
                        <FirstNameInput
                        name="firstName"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}

                        />
                      </div>
                      <div className="register-col">
                        <LastNameInput
                         name="lastName"
                         formData={formData}
                         formErrors={formErrors}
                         handleChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="register-row">
                      <div className="register-col">
                       <PasswordInput
                       name="password"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                       />
                      </div>
                    </div>

                    <div className="register-row">
                      <div className="register-col">
                       <DesignationInput
                       name="designation"
                       formData={formData}
                       formErrors={formErrors}
                       handleChange={handleChange}
                       />
                      </div>
                    </div>

                   
                      <CollegeEmailOtp
                      formData={formData}
                      formErrors={formErrors}
                       setIsEmailVerified={setIsEmailVerified}
                       setEmailInParent={updateEmailInParent} // Pass the function to the child
                      />
                   

                  
                      <CollegePhoneOtp
                      formData={formData}
                      formErrors={formErrors}
                      setIsPhoneVerified={setIsPhoneVerified}
                      setPhoneInParent={updatePhoneInParent}// Pass the function to the child
                      />
                   


           <CollegeLogoInput
            name="college_logo"
            formData={formData}
            formErrors={formErrors}
            parenthandleFileChange={handleFileChange}            
           />
                  </div>

                  <div className="d-center">
                    <button type="submit" className="save-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CollegeRegistrationForm
