
function CorporateTextInput({ value, onChange, error , name}) {
  // Handle input change
  const handleChange = (event) => {
    onChange(event.target.value); // Pass value back to parent
  };

  return (
    <div className="register-full-row">
      <label className="register-label">Address*</label>
      <textarea
        className="textarea-input"
        rows="3"
        placeholder="Enter Address"
        name={name} // Dynamically set the name attribute
        value={value}
        onChange={handleChange}
      />
      {/* Display error message if exists */}
      {error && <p className="error textbox-error">{error}</p>}
    </div>
  );
}

export default CorporateTextInput;
