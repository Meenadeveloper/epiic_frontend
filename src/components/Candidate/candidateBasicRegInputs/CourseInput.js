import React, { useState, useEffect, useRef } from 'react';
import CandidateStateInput from './CandidateStateInput';
import CandidateDistrictInput from './CandidateDistrictInput';

function CourseInput({ 
  formData,
   formErrors, 
   handleChange, 
   onStateSelect,
   selectedStateName,
   selectedStateId,
   name,

   stateId,
   onDistrictSelect,
   selectedDistrictId,
   selectedDistrictName,
   }) {
  return (
    <>
    <section className={`study-course-box ${formData[name] === "1" ? 'study-course-border' : ''}`}>
     <div className='register-row'>
     <div className='register-col'>
     <div className="register-form-control">
        <label className="register-label">Are you studying any course</label>
        <div className="register-radio-box">
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="yes"
              value="1"
              checked={formData[name] === "1"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="yes" className="radio-label custom-radio">
            Yes
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="no"
               value="0"
              checked={formData[name] === "0"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="no" className="radio-label custom-radio">
            No
            </label>
          </div>
        
        </div>
        {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}

      </div>
      </div>
      </div>

 {/* Conditionally render the course input box when "Yes" is selected (formData[name] === "1") */}
 {formData[name] === "1" && (
<div className='course-input-box'>
      <div className=''>
        <p className='study-course-heading-txt'>Details of the College / University and Course Details</p>
        </div>
      
              <div className="register-row">
                    <div className="register-col">
                      <CandidateStateInput
                        formData={formData}  // Passing formData to the child
                      formErrors={formErrors}  // Passing formErrors to the child
                      onStateSelect={onStateSelect}  // Passing the callback function
                      selectedStateName={selectedStateName}  // Passing the selected state name (edit mode)
                      selectedStateId={selectedStateId}  // Passing the selected state ID (edit mode)
                      name="state_name"  // Name for the hidden input
                      />
                    </div>

                    <div className="register-col">
                      <CandidateDistrictInput
                        formData={formData}  // Passing formData to the child
                      formErrors={formErrors}  // Passing formErrors to the child
                      onDistrictSelect={onDistrictSelect}  // Passing the callback function
                      selectedDistrictName={selectedDistrictName}  // Passing the selected state name (edit mode)
                      selectedDistrictId={selectedDistrictId}  // Passing the selected state ID (edit mode)
                      name="districtName"  // Name for the hidden input
                      stateId={stateId}
                      />
                    </div>
                    </div>
</div>
)}                   
      </section>
    </>
  )
}

export default CourseInput
