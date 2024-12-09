import React from 'react'
import FirstNameInput from './Candidate/FirstNameInput';
import LastNameInput from './Candidate/LastNameInput';
import PersonalEmailInput from './Candidate/PersonalEmailInput';
import MobileInput from './Candidate/MobileInput';
import AlternateEmailInput from './Candidate/AlternateEmailInput';
import AlternateMobileInput from './Candidate/AlternateMobileInput';
import GenderInput from './Candidate/GenderInput';
import PasswordInput from './Candidate/PasswordInput';
import CourseInput from './Candidate/CourseInput';

function CandidateBasicRegisterForm() {
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
                  <form className='register-form' >
                  <div className='register-row'>
                    <div className='register-col'>
                       <FirstNameInput/>
                     </div>

                     <div className='register-col'>
                       <LastNameInput/>
                     </div>
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <PersonalEmailInput/>
                     </div>
                     
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <MobileInput/>
                     </div>
                     
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <AlternateEmailInput/>
                     </div>

                     <div className='register-col'>
                       <AlternateMobileInput/>
                     </div>
                     
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <GenderInput/>
                     </div>

                     <div className='register-col'>
                       <PasswordInput/>
                     </div>
                     
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <CourseInput/>
                     </div>

                    
                     
                  </div>


                  

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
