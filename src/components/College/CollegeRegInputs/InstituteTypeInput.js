function InstituteTypeInput({ formData, formErrors, handleChange }) {
  return (
    <>
      <div className="register-form-control">
        <label className="register-label">Choose Institution Type</label>
        <div className="register-radio-box">
          <div className="radio-field">
            <input
              type="radio"
              name="instituteType"
              id="university"
              value="University"  // Pass the value for each radio button
              checked={formData.instituteType === 'University'}  // Check if selected
              onChange={handleChange}  // Call handleChange when radio is selected
              className="register-radio"
            />
            <label htmlFor="university" className="radio-label custom-radio">
              University
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name="instituteType"
              id="college"
              value="College"
              checked={formData.instituteType === 'College'}
              onChange={handleChange}
              className="register-radio"
            />
            <label htmlFor="college" className="radio-label custom-radio">
              College
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name="instituteType"
              id="institutions"
              value="Institutions"
              checked={formData.instituteType === 'Institutions'}
              onChange={handleChange}
              className="register-radio"
            />
            <label htmlFor="institutions" className="radio-label custom-radio">
              Institutions
            </label>
          </div>
        </div>

 {formErrors.instituteType && <p className="error selectbox-error" style={{ textAlign:"left" }}>{formErrors.instituteType}</p>}

      </div>
    </>
  );
}

export default InstituteTypeInput;
