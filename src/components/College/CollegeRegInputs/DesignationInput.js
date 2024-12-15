import React from 'react'

function DesignationInput({ formData, formErrors, handleChange, name }) {
  return (
    <>
      <div class="register-form-control ">
        <label class="register-label">Designation</label>
        <input type="text" 
         class="register-input "
         placeholder="Enter designation"
         name={name}
         value={formData[name]}  // Dynamically access formData by the 'name' prop
         onChange={handleChange}  // Handle change event
         
         />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}

     </div>
    </>
  )
}

export default DesignationInput

