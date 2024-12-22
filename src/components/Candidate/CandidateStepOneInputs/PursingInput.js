
function PursingInput({
    formData,
    formErrors, 
    handleChange, 
    name,
}) {
  return (

    <>
        <div className="register-form-control">
        <label className="register-label">Pursuing / Completed</label>
        <div className="register-radio-box  institute-radio-box">
          <div className="radio-field ">
            <input
              type="radio"
              name={name}
              id="Pursuing"
              value="pursuing"
              checked={formData[name] === "pursuing"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="Pursuing" className="radio-label custom-radio">
            Pursuing
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="Completed"
               value="completed"
              checked={formData[name] === "completed"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="Completed" className="radio-label custom-radio">
            Completed
            </label>
          </div>

         
        
        </div>
        {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}

      </div>
    </>
  )
}

export default PursingInput
