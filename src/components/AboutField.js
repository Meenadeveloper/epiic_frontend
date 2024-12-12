import React from 'react'

function AboutField({
  formData,
  formErrors,
  handleChange,}) {
  return (
    <>
    <div className='about-box'>
    <div className={`register-full-row ${formErrors.aboutus ? 'error-input' : ''}`}>
            <label className='register-label'>About Us</label>
             <textarea  className={`textarea-input ${formErrors.aboutus ? 'err-input-field' : ''}`}
                  rows="5"  placeholder='Lorem ipsum' name='aboutus'
                  onChange={handleChange}
                  value={formData.aboutus}
                  />
                             
             {formErrors.aboutus && <p className="error textbox-error">{formErrors.aboutus}</p>}
          
           </div>
    </div>
      
    </>
  )
}

export default AboutField
