
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import CandidateQualificationStep from "./CandidateQualificationStep";
import PersonalInformation from './CandidateStepTwoInputs/PersonalInformation';

function CandidatePersonalInformationForm() {

const [formData, setFormData] = useState({
    stateId: '',
    stateName: '',
    

})
  
  const [formErrors, setFormErrors] = useState({});
 // This function is called by StateInput when a state is selected
 const handleStateSelect = (stateId, stateName) => {
    setFormData((prevData) => ({
      ...prevData,
      stateId: stateId,  // Update the state ID
      stateName: stateName,  // Update the state name
    }));
  };

  // Handle changes to the form
 const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        stateName: formData.stateName,

      }
       // Log the payload for debugging
       console.log(payload);

    }catch (error) {
       console.error('Error submitting form:', error);
       toast.error('An error occurred while submitting the form. Please try again later.', {
      position: 'top-right',
     className: 'toast-error',
     });
   }
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
                    window.location.href = "/"; // Replace '/' with your fallback URL
                  }
                }}
              >
                Back
              </button>
            </div>

            <div className="register-form-container ">
              <div className=" candidate-register candidate-step-two">
                {/* form steps */}

                <CandidateQualificationStep />

                <div className="candidate-register-form-box">
                <div className='register-heading'>
                  <h2>PERSONAL INFORMATION</h2>
                  </div>

                  <PersonalInformation
                    formData={formData}  // Passing formData to the child
                      formErrors={formErrors}  // Passing formErrors to the child
                      onStateSelect={handleStateSelect}  // Passing the callback function
                      selectedStateName={formData.stateName}  // Passing the selected state name (edit mode)
                      selectedStateId={formData.stateId}  // Passing the selected state ID (edit mode)
                   
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidatePersonalInformationForm