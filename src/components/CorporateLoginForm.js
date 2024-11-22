import React from 'react'

function CorporateLoginForm() {
  return (
    <>
      <div className='login-container'>
        <div className='custom-container'>
            <div className='login-box'>
                <button>close</button>
                <div className='login-grid-box'>
                    <div className='login-grid-item'>
                       <h2 className='login-head'>Login Form Page
                      </h2>
                       <p className='login-text'> Lorem Ipsum</p>
                    </div>
                    <div className='login-grid-item'>
                        <div className='login-form-box'>
                        <div className='login-form-heading'>CORPORATE LOGIN</div>
                           <form>
                              <div className='form-control'>
                                <label for='email' className='input-label'>Email</label>
                                <input type='text'placeholder='Enter Name' className='input-text' />
                              </div>

                              <div className='form-control'>
                                <label for='email' className='input-label'>Password</label>
                                <input type='text'placeholder='Enter Name' className='Must be atleast 8 characters' />
                              </div>

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

export default CorporateLoginForm
