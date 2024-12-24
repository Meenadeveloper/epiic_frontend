import CandidateQualificationStep from "./CandidateQualificationStep";
import React, { useState, createContext, useContext } from 'react';
import TechnicalSkillSetManager from "./CandidateStepOneInputs/TechnicalSkillSetManager";
import QualificationManager from "./CandidateStepOneInputs/QualificationManager";
import { toast } from 'react-toastify';
import axios from 'axios';
import CertificateInput from "./CandidateStepOneInputs/CertificateInput";

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

function CandidateQualificationRegForm() {
const [formData, setFormData] = useState({
     technical_skill:'',
     technical_skill_id:'',
    skill_set_id:'',
    skill_set:'',
    certifications:'',
    qualification: { qualificationName: '', qualificationId: '' },
    course:{courseName:'',courseId:''},
    type:'',

    

})
  
  const [formErrors, setFormErrors] = useState({});

   // Manage multiple input groups
   const [inputGroups, setInputGroups] = useState([
    { 
      technical_skill: '', 
      technical_skill_id:'',
      skill_set: '' ,
      skill_set_id:'',
    }
  ]);



  const handleChange = (event, index) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    const updatedGroups = [...inputGroups];
    updatedGroups[index][name] = value;
    setInputGroups(updatedGroups);
    // Log the selected value's label
    // console.log(`Selected ${name} at index ${index}:`, value);
  };

// Function to handle value passed from grandchild
const handleSelectChange = (name, option) => {
  setFormData({
    ...formData,
    [name]: {
      [`${name}Name`]: option.label,  // Set label for the specific field
      [`${name}Id`]: option.value     // Set value for the specific field
    }
  });
};
  
 // Function to update certifications field in formData
 const handleTagInputChange = (value) => {
  setFormData(prevData => {
      const updatedFormData = { ...prevData, certifications: value };
      // Log only the certifications field
      // console.log("Updated Certifications:", updatedFormData.certifications);
      return updatedFormData;
  });
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        technical_skill:formData.technical_skill,
        technical_skill_id:formData.technical_skill_id,
        skill_set_id:formData.skill_set_id,
        certifications:formData.certifications,
        qualification:formData.qualification.qualificationName,
        qualificationId:formData.qualification.qualificationId,
        course:formData.course.courseId,
        type:formData.type,


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
    <FormContext.Provider value={{
      formData,
      formErrors,
      handleChange,
      handleSelectChange,
      handleTagInputChange,
      inputGroups,
      setInputGroups,
    }}>
      <div className='register-container'>
        <div className='custom-container'>
          <div className='register-box'>
            <div className='back-btn-box'>
              <button className='back-btn' onClick={() => window.history.back()}>
                Back
              </button>
            </div>
            <div className='register-form-container'>
              <div className='candidate-register'>
                <CandidateQualificationStep />
                <div className="candidate-register-form-box">
                  <div className='reg-form-content-box'>
                    <div className='register-heading'>
                      <h2>QUALIFICATION</h2>
                    </div>
                    <form className='register-form' onSubmit={handleSubmit}>
                      <QualificationManager />
                     
                      <TechnicalSkillSetManager />
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
      </div>
    </FormContext.Provider>
  )
}

export default CandidateQualificationRegForm