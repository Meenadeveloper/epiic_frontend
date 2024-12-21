
function CandidateInstituteType({
    formData,
    formErrors, 
    handleChange, 
    name,
}) {
  return (
    <>
         <div className="register-form-control">
        <label className="register-label">Choose Institution Type</label>
        <div className="register-radio-box  institute-radio-box">
          <div className="radio-field ">
            <input
              type="radio"
              name={name}
              id="University"
              value="1"
              checked={formData[name] === "1"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="University" className="radio-label custom-radio">
            University
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="College"
               value="2"
              checked={formData[name] === "2"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="College" className="radio-label custom-radio">
            College
            </label>
          </div>

          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="Institutions"
               value="3"
              checked={formData[name] === "3"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
              className="register-radio"
            />
            <label htmlFor="Institutions" className="radio-label custom-radio">
            Institutions
            </label>
          </div>
        
        </div>
        {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}

      </div>
    </>
  )
}

export default CandidateInstituteType