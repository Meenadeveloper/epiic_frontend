
function GeneralEconomicClassStudent({ additionalData, formErrors, handleChange,name }) {

   
  return (
    <>
  <div className="register-form-control">
        <label className="register-label">General Economic class of students</label>
        <p className="radio-sub-txt">(This would help us in bringing applicable CSR opportunities to colleges)</p>
        <div className="register-radio-box">
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="university"
              value="1"  // Pass the value for each radio button
              checked={additionalData.economic_class_of_students === '1'}  // Check if selected
              onChange={handleChange}  // Call handleChange when radio is selected
              className="register-radio"
            />
            <label htmlFor="university" className="radio-label custom-radio">
              Yes
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name={name}
              id="college"
              value="0"
              checked={additionalData.economic_class_of_students === '0'}
              onChange={handleChange}
              className="register-radio"
            />
            <label htmlFor="college" className="radio-label custom-radio">
              No
            </label>
          </div>
         
        </div>

 {formErrors.economic_class_of_students && <p className="error selectbox-error" style={{ textAlign:"left" }}>{formErrors.economic_class_of_students}</p>}

      </div>
    </>
  )
}

export default GeneralEconomicClassStudent