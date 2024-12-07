import React from 'react'

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

            <div className='register-form-container'>
              <div className='register-form-box'>
                  <div className='register-heading'>
                  <h2>CORPORATE REGISTRATION</h2>
                  </div>
                  <form className='register-form' >
                  <div className='register-row'>
                    <div className='register-col'>
                    <div className="register-form-control ">
                        <label className='register-label'>First Name</label>
                        <input
                          type='text'
                          name='firstName'
                          className="register-input "
                          placeholder='Enter Name'
                         
                        />
                      </div>
                     </div>
                  </div>
                  </form>  
              </div>

              
            </div>
           </div>
        </div>
    </div>
    </>
  )
}

export default CollegeBasicRegisterForm
