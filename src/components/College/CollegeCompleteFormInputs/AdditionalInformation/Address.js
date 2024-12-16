
function Address({ additionalData, formErrors, handleChange, name }) {
  return (
    <>
       <div className="register-form-control">
      <label className="register-label">Address</label>
      <input
        type="text"
        name={name}  // Dynamically set name
        className="register-input"
        value={additionalData[name]}  // Dynamically access formData by the 'name' prop
        onChange={handleChange}  // Handle change event
        placeholder="Enter address"
      />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}
    </div>
    </>
  )
}

export default Address
