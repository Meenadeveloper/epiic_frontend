import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Use Select instead of CreatableSelect
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Search.svg'; // Import search icon

function QualificationInput({
  formData,
  formErrors,
  name,
  onSelectChange, // Function passed down from the parent component to handle selected values
}) {
  // States for selected option, input value, and API data
  const [selectedOption, setSelectedOption] = useState(
    formData[name] ? { label: formData[`${name}Name`], value: formData[`${name}Id`] } : null
  );
  const [inputValue, setInputValue] = useState('');
  const [qualifications, setQualifications] = useState([]); // State for qualification data from API

  // Fetch qualifications from the API on component mount
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_CANDIDATE_GET_DATA_API;
    console.log('Fetching qualification data from:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Log the full response data for inspection
        console.log("Fetched qualification data:", data);

        if (data && Array.isArray(data.qualification)) {
          setQualifications(data.qualification); // Update state with fetched data
        } else {
          console.error("Data structure is not as expected:", data);
        }
      })
      .catch((error) => {
        console.error('Error fetching qualification data:', error);
      });
  }, []);

  // Handle changes in the select input
  const handleSelectChange = (option) => {
    console.log('Selected option:', option);

    if (!option) {
      // Clear the selection
      setSelectedOption(null);
      onSelectChange(name, { label: '', value: '' }); // Call parent handler to clear data
      return;
    }

    setSelectedOption(option);
    onSelectChange(name, { label: option.label, value: option.value }); // Call parent handler with selected data
  };

  // Handle input value change for search functionality
  const handleInputChange = (value) => {
    setInputValue(value.trim());
  };

  // Custom DropdownIndicator with SVG
  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <DownArrow width="15" height="15" fill="#000000" className="select-down-arrow" />
    </components.DropdownIndicator>
  );

  // Custom styles for Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      paddingLeft: '30px',
      backgroundColor: 'transparent',
      border: '1px solid #000000',
      boxShadow: 'none',
      borderRadius: '20px',
      height: '45px',
      fontSize: '12px',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      color: '#000000',
      '&:hover': {
        border: '1px solid #000000',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0px 4px 4px 0px #00000040',
      marginTop: '5px',
      maxHeight: '210px',
      clipPath: 'inset(0 round 20px)',
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#000000',
      fontSize: '12px',
      padding: '13px 20px',
      borderBottom: '1px solid #ECECEC',
      backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
    }),
    input: (provided) => ({
      ...provided,
      fontFamily: 'Montserrat',
      color: '#000000',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: 'Montserrat',
    }),
  };

  const selectOptions = qualifications.map((qual) => ({
    value: String(qual.id), // Ensure value is a string
    label: qual.department_name, // Display name
  }));

  return (
    <div className="register-form-control">
      <label className="register-label">Qualification</label>
      <Select
        isClearable={false} // Disable clearing of the selection
        value={selectedOption}
        options={selectOptions}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        placeholder="Qualification"
        styles={customStyles}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}
    </div>
  );
}

export default QualificationInput;
