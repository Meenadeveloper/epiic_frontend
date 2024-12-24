import { useQualification } from './QualificationContext';  // Import context

function CGPAInput({ name }) {
    const { formData, onHandleChange } = useQualification();

    // Handle radio button change
    const handleChange = (event) => {
      const { name, value } = event.target;
      onHandleChange(name, value);  // Update formData with name and value
    };

  return (
    <>
        <div className="register-form-control">
      <label className="register-label">CGPA (Enter your latest CGPA) </label>
      <input
        type="text"
        name={name}  // Dynamically set name
        className="register-input"
        value={formData[name]}  // Dynamically access formData by the 'name' prop
        onChange={handleChange}  // Handle change event
        placeholder="Enter CGPA"
      />
    </div>
    </>
  )
}

export default CGPAInput