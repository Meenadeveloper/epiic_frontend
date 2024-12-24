import { useQualification } from './QualificationContext';  // Import context

function CandidatePursingInput({ name }) {
  const { formData, onHandleChange } = useQualification();

  // Handle radio button change
  const handleChange = (event) => {
    const { name, value } = event.target;
    onHandleChange(name, value);  // Update formData with name and value
  };

  return (
    <div className="register-form-control">
      <label className="register-label">Pursuing / Completed</label>
      <div className="register-radio-box institute-radio-box">
        <div className="radio-field">
          <input
            type="radio"
            name={name}
            id="Pursuing"
            value="pursuing"
            checked={formData[name] === "pursuing"}  // Check if the current formData value matches "pursuing"
            onChange={handleChange}  // Handle change event
            className="register-radio"
          />
          <label htmlFor="Pursuing" className="radio-label custom-radio">
            Pursuing
          </label>
        </div>
        <div className="radio-field">
          <input
            type="radio"
            name={name}
            id="Completed"
            value="completed"
            checked={formData[name] === "completed"}  // Check if the current formData value matches "completed"
            onChange={handleChange}  // Handle change event
            className="register-radio"
          />
          <label htmlFor="Completed" className="radio-label custom-radio">
            Completed
          </label>
        </div>
      </div>
    </div>
  );
}

export default CandidatePursingInput;
