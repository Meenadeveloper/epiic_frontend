
function FirstNameInput({ formData, formErrors, handleChange, name }) {
  return (
    <>
      <div class="register-form-control ">
        <label className="register-label">First Name</label>
        <input
        type="text"
        name={name}  // Dynamically set name
        className="register-input"
        value={formData[name]}  // Dynamically access formData by the 'name' prop
        onChange={handleChange}  // Handle change event
        placeholder="Enter Name"
       />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}
      </div>
    </>
  )
}

export default FirstNameInput
