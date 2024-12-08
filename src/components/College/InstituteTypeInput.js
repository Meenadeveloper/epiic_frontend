import React from 'react';

function InstituteTypeInput() {
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
              className="register-radio"
            />
            <label htmlFor="institutions" className="radio-label custom-radio">
              Institutions
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstituteTypeInput;
