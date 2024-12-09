import React from 'react'

function LastNameInput() {
  return (
    <>
      <div class="register-form-control ">
        <label class="register-label">
        Last Name</label>
            <input type="text"
             name="lastName"
              class="register-input "
               placeholder="Enter last name" value="" /> 
      </div>
    </>
  )
}

export default LastNameInput
