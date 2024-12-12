import React from 'react'

function NoOfEmployees({
    formData,
    formErrors,
    handleChange,
}) {
  return (
    <>
        <div className= {`register-form-control ${formErrors.noofemployees ? 'error-input' : ''} `}>
                     <label className='register-label'>No. of Employess in Organisation</label>
                     
                        <input
                          type='text'
                          name='noofemployees'
                          className={`register-input ${formErrors.noofemployees ? 'err-input-field' : ''}`}
                          placeholder='Lorem ipsum'
                          onChange={handleChange}
                          value={formData.noofemployees}
                        />
                       
                        {formErrors.noofemployees && <p className="error ">{formErrors.noofemployees}</p>}
                        {/* Show success message if GST is correct */}
                        </div>
    </>
  )
}

export default NoOfEmployees
