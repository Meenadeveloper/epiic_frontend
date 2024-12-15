import React from 'react';

function LastNameInput({ formData, formErrors, handleChange, name }) {
  return (
    <div className="register-form-control">
      <label className="register-label">Last Name</label>
      <input
        type="text"
        name={name}  // Dynamically set the name
        className="register-input"
        placeholder="Enter Name"
        value={formData[name]}  // Dynamically access formData by the 'name' prop
        onChange={handleChange}  // Handle change event
      />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}  {/* Display error message if any */}
    </div>
  );
}

export default LastNameInput;
