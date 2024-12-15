import React, { useState } from 'react';

function EmailInput(
  formData,
  formErrors,
  handleChange,
  name
) {
  const [inputValue, setInputValue] = useState(formData.email || '');
  return (
    <>
      <div class="register-form-control ">
        <label class="register-label">
        Email ID</label>
            <input type="text"
              class="register-input "
               placeholder="Enter Email"
               name={name}
               value={inputValue}
               onChange={handleChange}
               /> 
   {formErrors.email && <p className="error">{formErrors.email}</p>} {/* Display error message if any */}

      </div>
    </>
  )
}

export default EmailInput
