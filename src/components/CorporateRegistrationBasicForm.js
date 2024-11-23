import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Required for styling

function CorporateRegistrationBasicForm() {
  const [phoneNumber, setPhoneNumber] = useState(''); // State for the phone number
  const [isChecked, setIsChecked] = useState(false); // State for terms and conditions checkbox

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Toggle checkbox state
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value); // Update phone number
  };

  
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

                <form className='register-form'>
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>First Name</label>
                        <input type='text' className='register-input' placeholder='Enter Name' />
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>Last Name</label>
                        <input type='text' className='register-input' placeholder='Enter last name' />
                      </div>
                    </div>
                  </div>

                  {/* Email row */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className='register-form-control error-input'>
                        <label className='register-label'>Email ID</label>
                        <input type='text' className='register-input' placeholder='Enter work mail ID' />
                        <p className='error'>error</p>
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className='register-form-control otp-box'>
                      <div className='verify-box'>
  <div className='d-flex'>
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
  </div>
  <p className='resent-otp'>Resend OTP</p>
</div>

                        <button type='submit' className='otp-btn'>Send OTP</button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Number row with country code */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>Mobile Number</label>
                        <PhoneInput
  international
  defaultCountry="IN"
  value={phoneNumber}
  onChange={handlePhoneNumberChange}
  className="register-input mobile-input"
  placeholder={phoneNumber ? '' : 'Enter mobile number'}
/>

                      </div>
                    </div>

                    <div className='register-col'>
                    <div className='register-form-control otp-box'>
                      <div className='verify-box'>
  <div className='d-flex'>
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
  </div>
  <p className='resent-otp'>Resend OTP</p>
</div>

                        <button type='submit' className='otp-btn'>Send OTP</button>
                      </div>
                    </div>
                  </div>

                  {/* Password row */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>Enter Password</label>
                        <input type='password' className='register-input' placeholder='Enter Password' />
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>Confirm Password</label>
                        <input type='password' className='register-input' placeholder='Confirm Password' />
                      </div>
                    </div>
                  </div>

                  {/* Designation and Organisation */}
                  <div className='register-row'>
                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>Designation</label>
                        <input type='text' className='register-input' placeholder='Enter Designation' />
                      </div>
                    </div>

                    <div className='register-col'>
                      <div className='register-form-control'>
                        <label className='register-label'>Organisation</label>
                        <input type='text' className='register-input' placeholder='Enter organisation' />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className='register-terms' style={{ marginBottom: '10px' }}>
                    <label className='checkbox-box'>
                      <input
                        type="checkbox"
                        className='term-checkbox'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <p>I Accept for privacy & terms and conditions.</p>
                    </label>
                  </div>

                  <div className='form-control'>
                    <button type='submit' className='submit-btn' disabled={!isChecked}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporateRegistrationBasicForm;
