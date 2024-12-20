
function PasswordInput({ formData, formErrors, handleChange, name }) {
  return (
    <>
        <div class="register-form-control ">
        <label class="register-label">Enter Password</label>
        <input
        type="text"
        name={name}  // Dynamically set name
        className="register-input"
        value={formData[name]}  // Dynamically access formData by the 'name' prop
        onChange={handleChange}  // Handle change event
        placeholder="Enter Password"
       />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}
     </div>
    </>
  )
}

export default PasswordInput
