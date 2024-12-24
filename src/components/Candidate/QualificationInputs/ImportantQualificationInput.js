import { useQualification } from './QualificationContext';  // Import context

function ImportantQualificationInput({ name }) {
    const { formData, onHandleChange } = useQualification();

    // Handle radio button change
    const handleChange = (event) => {
      const { name, value } = event.target;
      onHandleChange(name, value);  // Update formData with name and value
    };
  
  return (
    <>
   <div className="register-form-control">
      <label className="register-label">Is this an Important Qualification ?</label>
      <div className="register-radio-box institute-radio-box">
        <div className="radio-field">
          <input
            type="radio"
            name={name}
            id="ImportantYes"
            value="1"
            checked={formData[name] === "1"}  // Check if the current formData value matches "pursuing"
            onChange={handleChange}  // Handle change event
            className="register-radio"
          />
          <label htmlFor="ImportantYes" className="radio-label custom-radio">
            Yes
          </label>
        </div>
        <div className="radio-field">
          <input
            type="radio"
            name={name}
            id="ImportantNo"
            value="0"
            checked={formData[name] === "0"}  // Check if the current formData value matches "completed"
            onChange={handleChange}  // Handle change event
            className="register-radio"
          />
          <label htmlFor="ImportantNo" className="radio-label custom-radio">
            No
          </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default ImportantQualificationInput