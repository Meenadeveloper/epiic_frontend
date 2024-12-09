import React from 'react'

function FirstNameInput() {
  return (
    <>
      <div class="register-form-control ">
        <label class="register-label">
        First Name</label>
            <input type="text"
             name="firstName"
              class="register-input "
               placeholder="Enter last name" value="" /> 
      </div>
    </>
  )
}

export default FirstNameInput
