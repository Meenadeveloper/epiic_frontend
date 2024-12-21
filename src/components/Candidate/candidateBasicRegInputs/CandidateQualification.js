import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Use Select instead of CreatableSelect
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Search.svg'; // Import search icon

function CandidateQualification({
    name,
    formData,
    formErrors,
    handleChange,
}) {
  
     // States for selected option, input value, and API data
  const [selectedOption, setSelectedOption] = useState(
    formData.qualification ? { label: formData.qualification, value: formData.qualificationId } : null
  );
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [qualifications, setQualifications] = useState([]); // State for college data from API
  

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_CANDIDATE_GET_DATA_API;
    console.log('Fetching college data from:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setQualifications(data.qualification); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching college data:', error);
      });
  }, []);

  // Handle changes in the select input
  const handleSelectChange = (option) => {
    console.log('Selected option:', option);

    if (!option) {
      // Clear the selection
      setSelectedOption(null);
      handleChange({
        target:{ name: {name}, value: '' },
      });
      handleChange({
        target: { name: 'qualificationId', value: '' },
      });
      return;
    }

    setSelectedOption(option);
    handleChange({
      target: { name:{name}, value: option.label }, // Update the displayed name
    });
    handleChange({
      target: { name: 'qualificationId', value: option.value }, // Set college ID
    });
  };

  // Handle input value change for the search functionality
  const handleInputChange = (value) => {
    const sanitizedValue = value.trim();
    setInputValue(sanitizedValue);
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

  const selectOptions = qualifications.map((range) => ({
    value: String(range.id), // Ensure value is a string
    label: range.department_name, // Display name
  }));


  return (
    <>
      <div className="register-form-control">
      <label className="register-label">Qualification</label>
      <Select
        isClearable
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
    </>
  )
}

export default CandidateQualification