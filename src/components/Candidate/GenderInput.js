
function GenderInput() {
  return (
    <>
      <div className="register-form-control">
        <label className="register-label">Gender</label>
        <div className="register-radio-box">
          <div className="radio-field">
            <input
              type="radio"
              name="male"
              id="male"
              className="register-radio"
            />
            <label htmlFor="Male" className="radio-label custom-radio">
            Male
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name="female"
              id="Female"
              className="register-radio"
            />
            <label htmlFor="Female" className="radio-label custom-radio">
            Female
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name="other"
              id="Other"
              className="register-radio"
            />
            <label htmlFor="Other" className="radio-label custom-radio">
            Other
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenderInput
