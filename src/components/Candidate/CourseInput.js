import React from 'react'

function CourseInput() {
  return (
    <>
     <div className="register-form-control">
        <label className="register-label">Are you studying any course</label>
        <div className="register-radio-box">
          <div className="radio-field">
            <input
              type="radio"
              name="yes"
              id="Yes"
              className="register-radio"
            />
            <label htmlFor="Yes" className="radio-label custom-radio">
            Yes
            </label>
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name="no"
              id="No"
              className="register-radio"
            />
            <label htmlFor="Female" className="radio-label custom-radio">
            No
            </label>
          </div>
        
        </div>
      </div>
      
    </>
  )
}

export default CourseInput
