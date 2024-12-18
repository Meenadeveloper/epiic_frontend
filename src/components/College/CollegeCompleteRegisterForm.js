import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

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
import { getcollegeUserData, storecollegeUserData } from './CollegeStore';
import StreamInput from './CollegeCompleteFormInputs/AdditionalInformation/StreamInput';
import PlacementOfficeEmail from './CollegeCompleteFormInputs/PlacementCell/PlacementOfficeEmail';
import PlacementOfficeMobile from './CollegeCompleteFormInputs/PlacementCell/PlacementOfficeMobile';
import Rating from './CollegeCompleteFormInputs/AdditionalInformation/Rating';
import Zone from './CollegeCompleteFormInputs/AdditionalInformation/Zone';
import Tier from './CollegeCompleteFormInputs/AdditionalInformation/Tier';
import GeneralEconomicClassStudent from './CollegeCompleteFormInputs/AdditionalInformation/GeneralEconomicClassStudent';
import Accreditation from './CollegeCompleteFormInputs/AdditionalInformation/Accreditation';
import { isAuthenticated } from './CollegeAuth';

function CollegeCompleteRegisterForm() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token using the getcollegeUserData function
    const collegetoken = getcollegeUserData(); // This will fetch the token stored in localStorage

    if (!collegetoken) {
      toast.error("No token found. Please log in.");
      return;
    }

    // Ensure the environment variable is correctly set
    const fullUrl = process.env.REACT_APP_COLLEGE_PROFILE;

    const headers = {
      Authorization: `Bearer ${collegetoken}`, // Use the retrieved token
      "Content-Type": "application/json",
    };

    // API call to prefill the form data
    axios.get(fullUrl, { headers })
      .then((response) => {
        if (response.status === 200) {
          console.log("Response", response.data);
          // Assuming response.data.user contains the form values
          const userData = response.data.user.college;

          setAdditionalData(prevState => ({
            ...prevState,
            college_id: userData.id || "", // Prefill with API data or default value
            state_id: userData.state_id || "",
            college_type:userData.college_type|| "",
            collegeName:userData.name2||"",
            // Add other form fields if needed
          }));

        
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to prefill form data.");
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  const [additionalData, setAdditionalData] = useState({
    college_id: '',
    college_type:'',
    collegeName:'',
    state_id:'',
    address: '',
    pincode:'',
    rating_with_year:'',
    rating_with_year_id:'',
    streamId:'',
    stream:'',
    zone:'',
    zoneId:'',
    tier:'',
    tier_id:'',
    economic_class_of_students:'',
    economic_class_of_studentsId:'',
    accreditation:'',
    accreditationId:'',
    first_year_student_count:'',
    second_year_student_count:'',
    final_year_student_count:'',
    total_year_student_count:'',
    placement_name:'',
    placement_mail:'',
    placement_mobile:'',
    department_mail:'',
    department_mobile:'',
    employee_code:'',
  });
const [formErrors, setFormErrors] = useState({});
const validateForm = () => {
  let errors = {};

  if (!additionalData.college_id) {
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
 
  if(!additionalData.zoneId){
    errors.zoneId = 'zone is required';

  }
  if(!additionalData.tier_id){
    errors.tier_id = 'tier is required';
  }
  if(!additionalData.rating_with_year_id
  ){
    errors.rating_with_year_id = 'rating is required';
  }
  if(!additionalData.accreditationId){
    errors.accreditationId = 'accreditation is required';
  }
  if(!additionalData.economic_class_of_students){
    errors.economic_class_of_students = 'General economic is required';

  }

  if (!additionalData.first_year_student_count) {
    errors.first_year_student_count = 'First year student strength is required';
  }
  if (!additionalData.second_year_student_count) {
    errors.second_year_student_count = 'Second year student strength is required';
  }
  if (!additionalData.final_year_student_count) {
    errors.final_year_student_count = 'Finally year student strength is required';
  }
  if (!additionalData.total_year_student_count) {
    errors.total_year_student_count = 'Total year student strength is required';
  }
  if (!additionalData.placement_name) {
    errors.placement_name = 'Placement name is required';
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!additionalData.department_mail) {
    errors.department_mail = 'Department mail is required';
  }
  else if (!validateEmail(additionalData.department_mail)) {
    errors.department_mail = 'Please enter a valid email address.';
  }

  
  if (!additionalData.department_mobile) {
    errors.department_mobile = 'Department mobile is required';
  }
  else if (!/^\d{10}$/.test(additionalData.department_mobile)) {
    errors.department_mobile = 'Please enter a valid phone number.';
  }
  if (!additionalData.employee_code) {
    errors.employee_code ="Employee code  is required" ;
  }
  if (!additionalData.streamId) {
    errors.streamId ="Stream  is required" ;
  }
  
  
  
console.log('error', errors);
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
  const [error, setError] = useState(null);
     const [isEmailVerified, setIsEmailVerified] = useState(false);
      const [isPhoneVerified, setIsPhoneVerified] = useState(false);

// Function to update only the email field
const updateEmailInParent = (newEmail) => {
  setAdditionalData((additionalData) => ({
    ...additionalData,
    placement_mail: newEmail, // Update only the email field
  }));
   // Log the new email value to check if it is passed correctly
   console.log('Updated email in parent:', newEmail);
};

// Function to update only the email field
const updatePhoneInParent = (newPhone) => {
  setAdditionalData((prevData) => ({
    ...prevData,
    placement_mobile: newPhone, // Update only the phone field
  }));
   // Log the new phone value to check if it is passed correctly
   console.log('Updated email in parent:', newPhone);
};

   // Function to update only the email field
 

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


    if (!isEmailVerified) {
        toast.error("Please verify your email OTP.");
        return;
      }
      
      if (!isPhoneVerified) {
        toast.error("Please verify your phone OTP.");
        return;
      }
      
      const stream = additionalData.streamId
      ? Object.assign(
          {}, 
          additionalData.streamId.split(',').map(Number).reduce((acc, val, index) => {
            acc[`stream[${index}]`] = val;
            return acc;
          }, {})
        )
      : {};
  // Prepare the payload with specific data
  const payload = {
    college_id:additionalData.college_id,
    address: additionalData.address,
    pincode: additionalData.pincode,
    rating_with_year:additionalData.rating_with_year_id,
    tier_id:additionalData.tier_id,
    zone:additionalData.zoneId,
    economic_class_of_students:additionalData.economic_class_of_students,
    first_year_student_count:additionalData.final_year_student_count,
    second_year_student_count:additionalData.second_year_student_count,
    final_year_student_count:additionalData.final_year_student_count,
    total_year_student_count:additionalData.total_year_student_count,
    placement_name:additionalData.placement_name,
    placement_mail:additionalData.placement_mail,
    placement_mobile:additionalData.placement_mobile,
    department_mail:additionalData.department_mail,
    department_mobile:additionalData.department_mobile,
    ...stream,
    streamName:additionalData.streamId,
    employee_code:additionalData.employee_code,
  };
  console.log("complete datas:",payload);

  // Validate the form
  if (validateForm()) {
    try {
      const token = getcollegeUserData();
      console.log(token);
      // Create the URL with query parameters
      const url = process.env.REACT_APP_COLLEGE_COMPT_POST_API;
      const params = new URLSearchParams(payload).toString();
      // Log the params to the console
      console.log("Query Parameters:", params);
      const fullUrl = `${url}?${params}`;
      console.log("Full URL for form submission:", fullUrl);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(url, payload, { headers });

      // Handle the response
      if (response.status === 200) {
        // const data = await response.json();
        // console.log("register data" ,data);
          // storecollegeUserData(data.access_token);
        // localStorage.setItem('access_token', data.access_token);
        // localStorage.setItem('form_data', JSON.stringify(formData));
        // localStorage.setItem('additional_data', JSON.stringify(additionalData)); // Store additional data

        // Show success message and reset the form
        toast.success(response.message || 'Form submitted successfully!', {
          position: 'top-right',
          className: 'toast-success',
        });
        navigate('/college-dashboard');
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
//  if(isAuthenticated()){
//     return <Navigate  to="/college-dashboard" />
//     }
     


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
                  <input type='hidden' name='college_id' value={additionalData.college_id}/>
                <div className='college-data-container'>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>State</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{additionalData.state_id} </p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>District</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'></p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>Institution Type</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{additionalData.college_type}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>Name of the Institution</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt' >{additionalData.collegeName}</p>
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

               <div className="register-row">
                  <div className="register-col">
                     <StreamInput
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                     name="address"
                     />
                  </div>
                  <div className="register-col">
                     <Zone
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                 
                     />
                  </div>
               </div>

               <div className="register-row">
                  <div className="register-col">
                     <Tier
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                    
                     />
                  </div>
                  <div className="register-col">
                     <GeneralEconomicClassStudent
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                   name="economic_class_of_students"
                     />
                  </div>
               </div>

               <div className="register-row">
               <div className="register-col">
                     <Accreditation
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                     
                     />
                  </div>
                  <div className="register-col">
                     <Rating
                     additionalData={additionalData}
                     handleChange={handleAdditionalDataChange}
                     formErrors={formErrors}
                     name="rating_with_year"
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
                
                          <PlacementOfficeEmail
                           additionalData={additionalData}
                           handleChange={handleAdditionalDataChange}
                           formErrors={formErrors}
                           name="placement_mail"
                           setIsEmailVerified={setIsEmailVerified}
                           setEmailInParent={updateEmailInParent}
                          /> 

                          <PlacementOfficeMobile
                           additionalData={additionalData}
                           handleChange={handleAdditionalDataChange}
                           formErrors={formErrors}
                           name="placement_mobile"
                           setIsPhoneVerified={setIsPhoneVerified}
                           setPhoneInParent={updatePhoneInParent}// Pass the function to the child
                          /> 
                    
                 
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
