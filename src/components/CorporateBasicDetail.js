import CountryInput from "./CountryInput"
import EmailOtp from "./EmailOtp"
import PhoneOtp from "./PhoneOtp"

function CorporateBasicDetail({
  formData,
  formErrors,
  handleChange,
  isEmailVerified,
  setIsEmailVerified,
  isPhoneVerified,
  setIsPhoneVerified
}) {
  return (
    <>
      <div className="corporate-basic-box">
        <div className="corporate-heading">
            <h2 className="corporate-head">Basic Details</h2>
        </div>
        <div className="corporate-border">
         <div className='register-row'>
            <div className='register-col'>
               <div className={`register-form-control ${formErrors.firstName ? 'error-input' : ''}`}>
                     <label className='register-label'>First Name</label>
                     <input
                  type="text"
                  name="firstName"
                  className={`register-input ${formErrors.firstName ? 'err-input-field' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
                {formErrors.firstName && <p className="error">{formErrors.firstName}</p>} {/* Display error */}
                </div>     
            </div>

             <div className='register-col'>
              <div className={`register-form-control ${formErrors.lastName ? 'error-input' : ''}`}>
                        <label className='register-label'>Last Name</label>
                        <input
                  type="text"
                  name="lastName"
                  className={`register-input ${formErrors.lastName ? 'err-input-field' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
                {formErrors.lastName && <p className="error">{formErrors.lastName}</p>} {/* Display error */}
              </div>
            </div>  

         </div>

        
        {/* Pass the isEmailVerified state to EmailOtp */}
        <EmailOtp
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
        />

         {/* mobile otp */}
         <PhoneOtp
          isPhoneVerified={isPhoneVerified}
          setIsPhoneVerified={setIsPhoneVerified}
         />

         <div className='register-row'>
           <div className='register-col'>
           <div className={`register-form-control ${formErrors.organisation ? 'error-input' : ''}`}>
                     <label className='register-label'>Organisation</label>
                     <input
                  type="text"
                  name="organisation"
                  className={`register-input ${formErrors.organisation ? 'err-input-field' : ''}`}
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Enter organisation"
                />
            
                {formErrors.organisation && <p className="error">{formErrors.organisation}</p>} 
                </div>
           </div>
           <div className='register-col'>
           <div className={`register-form-control ${formErrors.designation ? 'error-input' : ''}`}>
                     <label className='register-label'>Designation</label>
                     <input
                  type="text"
                  name="designation"
                  className={`register-input ${formErrors.designation ? 'err-input-field' : ''}`}
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                />
                {formErrors.designation && <p className="error">{formErrors.designation}</p>} 

                </div>
           </div>
         </div>

         <div className='register-row'>
           <div className='register-col'>
           <CountryInput
        formData={formData}     // Passing formData
        formErrors={formErrors} // Passing formErrors
        handleChange={handleChange} // Passing handleChange for form updates
      />
           </div>
           <div className='register-col'>
           <div className={`register-form-control ${formErrors.website ? 'error-input' : ''}`}>
                     <label className='register-label'>Website</label>
                     <input
                  type="text"
                  name="website"
                  className={`register-input ${formErrors.website ? 'err-input-field' : ''}`}
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Lorem ipsum"
                />
                {formErrors.website && <p className="error">{formErrors.website}</p>} 
                </div>
           </div>
         </div>
             
        </div>
      </div>
    </>
  )
}

export default CorporateBasicDetail
