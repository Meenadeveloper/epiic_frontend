import React from 'react'

function EmailInput() {
  return (
    <>
      <div class="register-form-control ">
        <label class="register-label">
        Email ID</label>
            <input type="text"
             name="firstName"
              class="register-input "
               placeholder="Enter Email" value="" /> 
      </div>
    </>
  )
}

export default EmailInput
