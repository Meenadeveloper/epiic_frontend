import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Search.svg'; // Import search icon

function InstituteNameInput({ formData, formErrors, handleChange, name, districtId }) {
  // States for selected option, input value, and API data
  const [selectedOption, setSelectedOption] = useState(
    formData.subsector ? { label: formData.subsector, value: formData.subsectorId } : null
  );
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [turnoverRanges, setTurnoverRanges] = useState([]); // State for college data from API
  const apiUrl = process.env.REACT_APP_COLLEGE_API_URL;
  const fullUrl = `${apiUrl}?district_id=${districtId}`;
  console.log('Fetching college data from:', fullUrl);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_COLLEGE_API_URL;
    const fullUrl = `${apiUrl}?district_id=${districtId}`;
    console.log('Fetching college data from:', fullUrl);

    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched college data:', data);
        setTurnoverRanges(data.colleges); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching college data:', error);
      });
  }, [districtId]);

  // Handle changes in the select input
  const handleSelectChange = (option) => {
    console.log('Selected option:', option);

    if (!option) {
      // Clear the selection
      setSelectedOption(null);
      handleChange({
        target:{ name: 'collegeName', value: '' },
      });
      handleChange({
        target: { name: 'college_id', value: '' },
      });
      return;
    }

    setSelectedOption(option);
    handleChange({
      target: { name:'collegeName', value: option.label }, // Update the displayed name
    });
    handleChange({
      target: { name: 'college_id', value: option.value }, // Set college ID
    });
  };

  // Handle creation of new options
  const handleCreateOption = (inputValue) => {
    const sanitizedInput = inputValue.trim();
    if (!sanitizedInput) return;

    const newOption = { value: sanitizedInput.toLowerCase(), label: sanitizedInput };
    setSelectedOption(newOption);

    handleChange({
      target: { name:'collegeName', value: newOption.label },
    });

    // No collegeId for new input
    handleChange({
      target: { name: 'college_id', value: '' },
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

  // Custom styles for CreatableSelect
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

  const selectOptions = turnoverRanges.map((range) => ({
    value: String(range.id), // Ensure value is a string
    label: range.name2, // Display name
  }));

  return (
    <div className="register-form-control">
      <label className="register-label">Name Of the Institution</label>
      <CreatableSelect
        isClearable
        value={selectedOption}
        options={selectOptions}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        onCreateOption={handleCreateOption}
        placeholder="Name Of the Institution"
        styles={customStyles}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />

      {formErrors.college_id && <p className="error">{formErrors.college_id}</p>}
    </div>
  );
}

export default InstituteNameInput;
