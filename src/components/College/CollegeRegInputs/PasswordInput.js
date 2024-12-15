function PasswordInput({ formData, formErrors, handleChange, name }) {

 
  return (
    <>
      <div class="register-form-control ">
        <label class="register-label">Enter Password</label>
        <input type="password" class="register-input "
         placeholder="Enter Password"
         name={name}
         value={formData[name]}  // Dynamically access formData by the 'name' prop
         onChange={handleChange}  // Handle change event
         />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}

     </div>
    </>
  )
}

export default PasswordInput
