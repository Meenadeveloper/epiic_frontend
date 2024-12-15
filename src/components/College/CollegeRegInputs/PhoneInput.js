import React from 'react'

function PhoneInput(
  formData,
  formErrors,
  handleChange,
  name
) {
  return (
    <>
       <div class="register-form-control ">
        <label class="register-label">
        Mobile Number</label>
            <input type="text"
              class="register-input "
               placeholder="Enter mobile number" 
               name={name}
               value={formData.mobile}
               onChange={handleChange}
               /> 
     {formErrors.mobile && <p className="error">{formErrors.mobile}</p>} {/* Display error message if any */}
             
      </div>
    </>
  )
}

export default PhoneInput
