import React, { useState, useEffect, useRef } from 'react';

function EmployeesCount({ formData = {}, formErrors = {}, handleChange = () => {} }) {
  // List of static employee options with IDs
  const employeeOptions = [
    { id: 1, name: 'Primary' },
    { id: 2, name: 'Corporate Office' },
    { id: 3, name: 'HO' },
    { id: 4, name: 'Others' }
  ];

  // State to track dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container
  const [inputValue, setInputValue] = useState(formData.noofemployees || ''); // Use formData for inputValue
  const [employeeIdValue, setEmployeeIdValue] = useState(formData.noofemployeesId || ''); // Use formData for employeeIdValue
  const [filteredEmployees, setFilteredEmployees] = useState(employeeOptions); // Filtered employees

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  // Add event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input change and filter options based on input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter employees based on the input value
    if (value === '') {
      setFilteredEmployees(employeeOptions); // Show all options if input is empty
    } else {
      const filtered = employeeOptions.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }

    // Open the dropdown when typing starts
    setIsDropdownOpen(true);
  };

  // Handle employee selection
  const handleEmployeeSelect = (employeeId, employeeName) => {
    setInputValue(employeeName); // Set employee name in visible input
    setEmployeeIdValue(employeeId); // Set employee ID in hidden input
    console.log("Selected employee ID:", employeeId, "Selected employee name:", employeeName); // Log the selected employee ID and name for debugging

    setIsDropdownOpen(false); // Close the dropdown after selection

    // Update the formData (if needed for form submission)
    handleChange({
      target: { name: 'noofemployees', value: employeeName }
    });
    handleChange({
      target: { name: 'noofemployeesId', value: employeeId }
    });
  };

  return (
    <>
      <div className="register-form-control">
        <label className='register-label'>No. of Employees in Organisation</label>
        <div className= {`"dropdown-container ${formErrors.noofemployees ? 'error-input' : ''}`}  ref={dropdownRef}>
          <div className="search-box-container">
            <input
              type='text'
              name='noofemployees'
              className={`register-input drodown-input ${formErrors.noofemployees ? 'err-input-field' : ''}`}
              placeholder='Search'
              value={inputValue}
              onChange={handleInputChange} // Track input changes
            />
            <input
              type='hidden'
              name='noofemployeesId'
              value={employeeIdValue}
            />
            <i className="material-icons search-icon">search</i>
            <i
              className="material-icons dropdown-icon" onClick={toggleDropdown}>
              arrow_drop_down
            </i>
          </div>
          {/* Conditionally display the error message if passed */}
          {formErrors?.noofemployees && <p className="error selectbox-error">{formErrors.noofemployees}</p>}
          {/* Conditionally render the dropdown options */}
          {isDropdownOpen && (
            <div className="dropdown-option-box">
              <ul className="dropdown-list">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map(employee => (
                    <li
                      key={employee.id} // Use employee.id here
                      className='dropdown-list-item'
                      onClick={() => handleEmployeeSelect(employee.id, employee.name)} // Pass employee.id and employee.name
                    >
                      {employee.name} {/* Display employee name */}
                    </li>
                  ))
                ) : (
                  <li className='dropdown-list-item no-options'>No employees found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeesCount;
