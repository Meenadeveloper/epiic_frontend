import FirstNameInput from './candidateBasicRegInputs/FirstNameInput';
import LastNameInput from './candidateBasicRegInputs/LastNameInput';
import PersonalEmailInput from './candidateBasicRegInputs/PersonalEmailInput';
import MobileInput from './candidateBasicRegInputs/MobileInput';
import AlternateEmailInput from './candidateBasicRegInputs/AlternateEmailInput';
import AlternateMobileInput from './candidateBasicRegInputs/AlternateMobileInput';
import GenderInput from './candidateBasicRegInputs/GenderInput';
import PasswordInput from './candidateBasicRegInputs/PasswordInput';
import CourseInput from './candidateBasicRegInputs/CourseInput';


import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import { storecandidateUserToken } from './CandidateStore';
import Specialization from './../corporate/Specialization';

function CandidateBasicRegisterForm() {
  const navigate = useNavigate();
const [isEmailVerified, setIsEmailVerified] = useState(false);
const [isPhoneVerified, setIsPhoneVerified] = useState(false);

const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email_id:'',
    mobile:'',
    alternate_email:'',
    alternate_mobile:'',
    gender:'',
    password:'',
    study_course:'',
    stateId: '',
    stateName: '',
    district:'',
    institute_type:'',
    institute_name:'',
    qualification:'',
    course:'',
    Specialization:'',
   
  });

  const [formErrors, setFormErrors] = useState({});
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

const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');

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

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = 'First name is required';
    }
    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.alternate_email) {
      errors.alternate_email = 'Email is required';
    } else if (!emailRegex.test(formData.alternate_email)) {
      errors.alternate_email = 'Invalid email format';
    }

    const phoneRegex = /^\+91\d{10}$/;
    if (!formData.alternate_mobile) {
      errors.alternate_mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(formData.alternate_mobile)) {
      errors.alternate_mobile = 'Mobile number must be in the format "+91XXXXXXXXXX"';
    }
    if (!formData.password) {
      errors.password = 'Password is  required';
    }
    else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters ';
    }
    if (!formData.gender) {
      errors.gender = 'gender is  required';
    }
    if(!formData.study_course){
      errors.study_course = 'Study is  required';
    }


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
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
            name: `${formData.name} ${formData.last_name}`,
            email_id: formData.email_id,
            mobile:formData.mobile,
            alternate_email:formData.alternate_email,
            alternate_mobile:formData.alternate_mobile,
            gender:formData.gender,
            password:formData.password,
            study_course:formData.study_course,
           
          };
           // Log the payload for debugging
          //  console.log(payload);
  
          const url = process.env.REACT_APP_CANDIDATE_POST_REG_API;
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
            storecandidateUserToken(data.access_token);
            // Reset form fields using document.querySelector
          document.querySelector('form').reset();
            toast.success(data.message || 'Form submitted successfully!', {
              position: 'top-right',
              className: 'toast-success',
            });
            navigate('/candidate-registeration');
          } else {
            const errorData = await response.json();
            console.error('Server error details for candidate:', errorData);

          // Reset form fields using document.querySelector
          document.querySelector('form').reset();
            toast.error(errorData.errors || 'Failed to submit form. Please try again.', {
              position: 'top-right',
              className: 'toast-error',
            });

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
          console.error('Error submitting form:', error);
          toast.error('An error occurred while submitting the form. Please try again later.', {
            position: 'top-right',
            className: 'toast-error',
          });
        }
      } else {
        toast.error('Please fix the form errors before submitting.', {
          position: 'top-right',
          className: 'toast-error',
        });
      }
    };



  return (
    <div>

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

            <div className='register-form-container '>
              <div className='register-form-box college-register'>

                <div className='reg-form-content-box'>
                  <div className='register-heading'>
                  <h2>CANDIDATE REGISTRATION</h2>
                  </div>
                  <form className='register-form' onSubmit={handleSubmit}>
                  <div className='register-row'>
                    <div className='register-col'>
                       <FirstNameInput
                         name="name"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}

                       />
                     </div>

                     <div className='register-col'>
                       <LastNameInput
                         name="last_name"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                       />
                     </div>
                  </div>

                  
                       <PersonalEmailInput
                         formData={formData}
                        formErrors={formErrors}
                       setIsEmailVerified={setIsEmailVerified}
                       setEmailInParent={updateEmailInParent} // Pass the function to the child
                       />
                    

                 
                       <MobileInput
                         formData={formData}
                      formErrors={formErrors}
                      setIsPhoneVerified={setIsPhoneVerified}
                      setPhoneInParent={updatePhoneInParent}// Pass the function to the child
                       />
                  

                  <div className='register-row'>
                    <div className='register-col'>
                       <AlternateEmailInput
                         name="alternate_email"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                       />
                     </div>

                     <div className='register-col'>
                       <AlternateMobileInput
                          name="alternate_mobile"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                       />
                     </div>
                     
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <GenderInput
                         name="gender"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                       />
                     </div>

                     <div className='register-col'>
                       <PasswordInput
                        name="password"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                       />
                     </div>
                     
                  </div>

                 
                       <CourseInput
                         name="study_course"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                        onStateSelect={handleStateSelect} // Passing the callback function
                      selectedStateName={formData.stateName}  // Passing the selected state name (edit mode)
                      selectedStateId={formData.stateId}  // Passing the selected state ID (edit mode)
                       />
                                

                  <div class="d-center"><button type="submit" class="save-btn">Submit</button></div>
                  </form>
                  </div>
              </div>

              
            </div>
           </div>
        </div>
    </div>
      
    </div>
  )
}

export default CandidateBasicRegisterForm
