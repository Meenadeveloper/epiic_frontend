
function IntermediateYear({ additionalData, formErrors, handleChange, name }) {
  return (
    <>
      <div className="register-form-control">
      <input
        type="text"
        name={name}  // Dynamically set name
        className="register-input"
        value={additionalData[name]}  // Dynamically access formData by the 'name' prop
        onChange={handleChange}  // Handle change event
        placeholder="Lorem Ipsum"
      />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}
    </div>
    </>
  )
}

export default IntermediateYear
