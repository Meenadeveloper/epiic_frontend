import CandidateQualificationStep from "./CandidateQualificationStep";
import React, { useState } from 'react';
import TechnicalSkillSetManager from "./CandidateStepOneInputs/TechnicalSkillSetManager";
import QualificationManager from "./CandidateStepOneInputs/QualificationManager";
import { toast } from 'react-toastify';
import axios from 'axios';
import CertificateInput from "./CandidateStepOneInputs/CertificateInput";


function CandidateQualificationRegForm() {
const [formData, setFormData] = useState({
     technical_skill:'',
     technical_skill_id:'',
    skill_set_id:'',
    skill_set:'',
    certifications:'',
    certificationsId:'',
    qualification:'',
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


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        technical_skill:formData.technical_skill,
        technical_skill_id:formData.technical_skill_id,
        skill_set_id:formData.skill_set_id,
        certifications:formData.certifications,
        certificationsId:formData.certificationsId,
        qualification:formData.qualification,
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

            <div className='register-form-container '>
              <div className=' candidate-register'>

              {/* form steps */}
               
                 <CandidateQualificationStep/>

                <div className="candidate-register-form-box">
                <div className='reg-form-content-box'>
                  <div className='register-heading'>
                  <h2>QUALIFICATION</h2>
                  </div>
                  <form className='register-form' onSubmit={handleSubmit}>
                  <QualificationManager
                  formData={formData}
                  formErrors={formErrors}
                  handleChange={handleChange}
                  
                  />

                  <CertificateInput
                   formData={formData}
                   formErrors={formErrors}
                   handleChange={handleChange}
                  />


                 <TechnicalSkillSetManager
                 formData={formData}
                 formErrors={formErrors}
                 handleChange={handleChange}
                 inputGroups={inputGroups}
                 setInputGroups={setInputGroups}
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
    </>
  )
}

export default CandidateQualificationRegForm