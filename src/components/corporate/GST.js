import React from 'react'

function GST({
    formData,
    formErrors,
    handleChange,
    gstsuccessMessage,
}) {
  return (
    <>
    <div className= {`register-form-control ${formErrors.gst ? 'error-input' : ''} `}>
                     <label className='register-label'>GST</label>
                     <div className={`gst-input ${gstsuccessMessage ? 'active' : ''}`}>
                        <input
                          type='text'
                          name='gst'
                          className={`register-input ${formErrors.gst ? 'err-input-field' : ''}`}
                          placeholder='Enter Name'
                          onChange={handleChange}
                          value={formData.gst}
                        />
                        </div>
                        {formErrors.gst && <p className="error ">{formErrors.gst}</p>}
                        {/* Show success message if GST is correct */}
                        </div>
      
    </>
  )
}

export default GST
