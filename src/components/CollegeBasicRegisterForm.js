import React from 'react'
import StateInput from './College/StateInput';
import DistrictInput from './College/DistrictInput';
import InstituteTypeInput from './College/InstituteTypeInput';
import InstituteNameInput from './College/InstituteNameInput';
import FirstNameInput from './College/FirstNameInput';
import LastNameInput from './College/LastNameInput';
import LogoInput from './LogoInput';
import EmailInput from './College/EmailInput';
import PhoneInput from './College/PhoneInput';
import PasswordInput from './College/PasswordInput';
import DesignationInput from './College/DesignationInput';

function CollegeBasicRegisterForm() {
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
              <div className='register-form-box college-register'>

                <div className='reg-form-content-box'>
                  <div className='register-heading'>
                  <h2>COLLEGE REGISTRATION</h2>
                  </div>
                  <form className='register-form' >
                  <div className='register-row'>
                    <div className='register-col'>
                       <StateInput/>
                     </div>

                     <div className='register-col'>
                       <DistrictInput/>
                     </div>
                  </div>

                  <div className='register-row'>
                    <div className='register-col'>
                       <InstituteTypeInput/>
                     </div>
                     <div className='register-col'>
                       <InstituteNameInput/>
                     </div>

                  </div>

                  <div className='borderless-form-box'>
                    <h2 className='form-sub-head'>Personal Details</h2>

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
                           <EmailInput/>
                       </div>
                       
                    </div>

                    <div className='register-row'>
                      <div className='register-col'>
                           <PhoneInput/>
                       </div>
                       
                    </div>

                    <div className='register-row'>
                      <div className='register-col'>
                           <PasswordInput/>
                       </div>
                       <div className='register-col'>
                           <DesignationInput/>
                       </div>
                    </div>

                    <LogoInput/>
                  </div>

                  <div class="d-center"><button type="submit" class="save-btn">Submit</button></div>
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

export default CollegeBasicRegisterForm
