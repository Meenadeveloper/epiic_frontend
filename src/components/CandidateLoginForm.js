import { Link } from 'react-router-dom';

function CandidateLoginForm() {
  return (
    <>
      <div className='login-container'>
        <div className='custom-container'>
            <div className='login-box'>
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
                <div className='login-grid-box'>
                    <div className='login-grid-item login-tittle-box'>
                       <h2 className='login-head'>Login Form Page   <p className='login-text'> Lorem Ipsum</p>  
                      </h2>
                     
                    </div>
                    <div className='login-grid-item' >
                        <div className='login-form-box'>
                        <h2 className='login-form-heading'>CANDIDATE LOGIN</h2>
                           <form className='login-form'>
                              <div className='form-control login-input'>
                                <label for='email' className='input-label'>Email</label>
                                <input type='email'placeholder='Enter Name' className='input-text' />
                              </div>

                              <div className='form-control'>
                                <label for='email' className='input-label'>Password</label>
                                <input type='password'placeholder='Must be atleast 8 characters' className='input-text' />
                                {/* error text */}
                                {/* <p className='error'>error</p> */}
                                <div className='form-link-box'>
                                 <Link to="#" className='forgot-link'>Forgot Password ?</Link>
                              </div>
                              </div>
                             
                              <div className='form-control'>
                                <button type='submit' className='login-btn'>Login</button>
                              </div>
                           </form>

                           <div className='form-control' style={{marginBottom:'10px'}}>
                           <Link to="/corporate-basic-register" className='sign-link'>Sign Up/Not Registered Yet?</Link>

                            </div>

                            <div className='form-multi-link'>
                           <Link to="/corporate-basic-register" className='form-link'> Corporate  /</Link> 
                           <Link to="/college-basic-register" className='form-link'> College  /</Link>

                           <Link to="/candidate-basic-register" className='form-link'>  Candidater /</Link>

                           <Link to="#" className='form-link'> Speaker</Link>


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

export default CandidateLoginForm
