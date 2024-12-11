
function PincodeInput({ value, onChange, error, name  }) {
  return (
    <div className="register-form-control">
      <label className="register-label">Pin Code</label>
      <input
        type="text"
        name={name} // Dynamically set name here
        className="register-input"
        placeholder="Enter Pin Code"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Pass value to parent
      />
      {error && <p className="error">{error}</p>} {/* Display error message */}
    </div>
  );
}

export default PincodeInput;
