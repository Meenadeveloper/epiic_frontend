function GenderInput({ formData, formErrors, handleChange, name }) {
  return (
    <>
      <div className="register-form-control">
        <label className="register-label">Gender</label>
        <div className="register-radio-box">
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="male"
              className="register-radio"
              value="Male"  // Value should be the gender option
              checked={formData[name] === "Male"}  // Check if the current formData value matches "Male"
              onChange={handleChange}  // Handle change event
            />
            <label htmlFor="male" className="radio-label custom-radio">
              Male
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="female"
              className="register-radio"
              value="Female"  // Value should be the gender option
              checked={formData[name] === "Female"}  // Check if the current formData value matches "Female"
              onChange={handleChange}  // Handle change event
            />
            <label htmlFor="female" className="radio-label custom-radio">
              Female
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="other"
              className="register-radio"
              value="Other"  // Value should be the gender option
              checked={formData[name] === "Other"}  // Check if the current formData value matches "Other"
              onChange={handleChange}  // Handle change event
            />
            <label htmlFor="other" className="radio-label custom-radio">
              Other
            </label>
          </div>
        </div>
        {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}
      </div>
    </>
  );
}

export default GenderInput;
