import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import Address from './CollegeCompleteFormInputs/AdditionalInformation/Address';
import Pincode from './CollegeCompleteFormInputs/AdditionalInformation/Pincode';
import FirstYear from './CollegeCompleteFormInputs/AdditionalInformation/FirstYear';
import IntermediateYear from './CollegeCompleteFormInputs/AdditionalInformation/IntermediateYear';
import FinalYear from './CollegeCompleteFormInputs/AdditionalInformation/FinalYear';
import TotalStudentStrength from './CollegeCompleteFormInputs/AdditionalInformation/TotalStudentStrength';
import PlacementOfficeName from './CollegeCompleteFormInputs/PlacementCell/PlacementOfficeName';
import AlternateDepartmentMobile from './CollegeCompleteFormInputs/PlacementCell/AlternateDepartmentMobile';
import AlternateDepartmentEmail from './CollegeCompleteFormInputs/PlacementCell/AlternateDepartmentEmail';
import EmployeeCode from './CollegeCompleteFormInputs/PlacementCell/EmployeeCode';

function CollegeCompleteRegisterForm() {
  const [formData, setFormData] = useState(null);
  const [additionalData, setAdditionalData] = useState({
    college_id: '',
    address: '',
    pincode:'',
  });
const [formErrors, setFormErrors] = useState({});
const validateForm = () => {
  let errors = {};

  if (!formData.college_id) {
    errors.college_id = 'College  is required';
  }
  if (!additionalData.address) {
    errors.address = 'Address is required';
  }
  if (!additionalData.pincode) {
    errors.pincode = 'Pincode is required';
  } else if (!/^\d{6}$/.test(additionalData.pincode)) {
    errors.pincode = 'Please enter a valid Pincode';
  }

  // if (!formData.name) {
  //   errors.name = 'First name is required';
  // }
  // if (!formData.last_name) {
  //   errors.last_name = 'Last name is required';
  // }

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!formData.email_id) {
  //   errors.email_id = 'Email is required';
  // } else if (!emailRegex.test(formData.email_id)) {
  //   errors.email_id = 'Invalid email format';
  // }

  // const phoneRegex = /^\+91\d{10}$/;
  // if (!formData.mobile) {
  //   errors.mobile = 'Mobile number is required';
  // } else if (!phoneRegex.test(formData.mobile)) {
  //   errors.mobile = 'Mobile number must be in the format "+91XXXXXXXXXX"';
  // }

  // if (!formData.password) {
  //   errors.password = 'Password is required';
  // } else if (formData.password.length < 8) {
  //   errors.password = 'Password must be at least 8 characters long';
  // }

  // if (!formData.designation) {
  //   errors.designation = 'Designation is required';
  // }

  // if (!formData.state_name) {
  //   errors.state_name = 'State name is required';
  // }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
  const [error, setError] = useState(null);
  useEffect(() => {
    // Retrieve form data from localStorage and set it if available
    const storedFormData = localStorage.getItem('form_data');
    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        // console.log('Form data from localStorage:', parsedFormData); // Log the formData
        setFormData(parsedFormData);
      } catch (err) {
        console.error('Error parsing form data from localStorage:', err);
        setError('Failed to load form data');
      }
    } else {
      setError('No form data found in localStorage');
    }
  }, []);
  // If there's an error, show the error message
  if (error) {
    console.error('Error:', error);
    return <p className='error-display-txt'>{error}</p>;
  }
  // If formData is still null, show a loading message
  if (!formData) {
    return <p>Loading form data...</p>; // Wait until formData is set
  }
  // Log formData whenever it's loaded
  // console.log('Loaded formData:', formData);
  
// Handle additional data input changes
// const handleAdditionalDataChange = (field, value) => {
//   setAdditionalData(prevState => ({
//     ...prevState,
//     [field]: value,
//   }));
// };
const handleAdditionalDataChange = (event) => {
  const { name, value } = event.target;
  setAdditionalData({ ...additionalData, [name]: value });
};

const handleSubmit = async (event) => {
  event.preventDefault();

  // Prepare the payload with specific data
  const payload = {
    college_id:formData.college_id,
    // name: `${formData.name} ${formData.last_name}`,
    // password: formData.password,
    // mobile: formData.mobile,
    // designation: formData.designation,
    // Include specific additional data fields like address
    address: additionalData.address,
    pincode: additionalData.pincode,
    // state: additionalData.state,
    // postal_code: additionalData.postal_code,
  };
  console.log("complete datas:",payload);

  // Validate the form
  if (!validateForm()) {
    try {
      // Create the URL with query parameters
      const url = process.env.REACT_APP_COLLEGE_COMPT_POST_API;
      const params = new URLSearchParams(payload).toString();
      // Log the params to the console
      console.log("Query Parameters:", params);
      const fullUrl = `${url}?${params}`;

      // Submit the form data to the API
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('form_data', JSON.stringify(formData));
        localStorage.setItem('additional_data', JSON.stringify(additionalData)); // Store additional data

        // Show success message and reset the form
        toast.success(data.message || 'Form submitted successfully!', {
          position: 'top-right',
          className: 'toast-success',
        });

         // Reset form fields using document.querySelector
         document.querySelector('form').reset();
      } else {
        const errorData = await response.json();
         // Reset form fields using document.querySelector
         document.querySelector('form').reset();
        toast.error(errorData.errors || 'Failed to submit form. Please try again.', {
          position: 'top-right',
          className: 'toast-error',
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
                  <h2 className='college-heading'>COLLEGE REGISTRATION</h2>
                </div>
                <form className="register-form" onSubmit={handleSubmit} >
                  <input type='hidden' name='college_id' value={formData.college_id}/>
                <div className='college-data-container'>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>State</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'> {formData.stateName}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>District</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{formData.districtName}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>Institution Type</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{formData.instituteType}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>Name of the Institution</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{formData.collegeName}</p>
                  </div>
                </div>
                <div className="borderless-form-box">
                <h2 className="college-sub-heading">Additional Information</h2>
                <div className="register-row">
                  <div className="register-col">
                     <Address
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                     name="address"
                     />
                  </div>
                  <div className="register-col">
                     <Pincode
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                     name="pincode"
                     />
                  </div>
               </div>


                </div>
                <div className="borderless-form-box">
                <h2 className="college-sub-heading">Student Strength</h2>
                <div className="register-row">
                  <div className="register-col">
                  <div className="register-form-control center-label">
                  <label className="register-label ">First Year</label>
                  </div>
                  </div>
                  <div className="register-col">
                     <FirstYear
                      additionalData={additionalData}
                      handleChange={handleAdditionalDataChange}
                      formErrors={formErrors}
                      name="first_year_student_count"
                     />
                  </div>
               </div>

               <div className="register-row">
                  <div className="register-col">
                  <div className="register-form-control center-label">
                  <label className="register-label ">Intermediate Years</label>
                  </div>
                  </div>
                  <div className="register-col">
                     <IntermediateYear
                      additionalData={additionalData}
                      handleChange={handleAdditionalDataChange}
                      formErrors={formErrors}
                      name="second_year_student_count"
                     />
                  </div>
               </div>

               <div className="register-row">
                  <div className="register-col">
                  <div className="register-form-control center-label">
                  <label className="register-label ">Final Year</label>
                  </div>
                  </div>
                  <div className="register-col">
                     <FinalYear
                      additionalData={additionalData}
                      handleChange={handleAdditionalDataChange}
                      formErrors={formErrors}
                      name="final_year_student_count"
                     />
                  </div>
               </div>

               <div className="register-row">
                  <div className="register-col">
                  <div className="register-form-control center-label">
                  <label className="register-label ">Total Student Strength</label>
                  </div>
                  </div>
                  <div className="register-col">
                     <TotalStudentStrength
                      additionalData={additionalData}
                      handleChange={handleAdditionalDataChange}
                      formErrors={formErrors}
                      name="total_year_student_count"
                     />
                  </div>
               </div>


                </div>

                <div className="borderless-form-box">
                <h2 className="college-sub-heading">Placement Cell Information</h2>   
                  <div className="register-row">
                     <div className="register-col">
                          <PlacementOfficeName
                           additionalData={additionalData}
                           handleChange={handleAdditionalDataChange}
                           formErrors={formErrors}
                           name="placement_name"
                          /> 
                      </div>
                  </div>
                 
                  <div className="register-row">
                     <div className="register-col">
                          <AlternateDepartmentEmail
                           additionalData={additionalData}
                           handleChange={handleAdditionalDataChange}
                           formErrors={formErrors}
                           name="department_mail"
                          /> 
                      </div>
                  </div>

                  <div className="register-row">
                     <div className="register-col">
                          <AlternateDepartmentMobile
                           additionalData={additionalData}
                           handleChange={handleAdditionalDataChange}
                           formErrors={formErrors}
                           name="department_mobile"
                          /> 
                      </div>
                  </div>
                  <div className="register-row">
                     <div className="register-col">
                          <EmployeeCode
                           additionalData={additionalData}
                           handleChange={handleAdditionalDataChange}
                           formErrors={formErrors}
                           name="employee_code"
                          /> 
                      </div>
                  </div>
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
  );
}

export default CollegeCompleteRegisterForm;
