import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../assets/images/Search.svg'; // Import search icon

function SubSector({ formData, formErrors, handleChange }) {
  // States for selected option, input value, and API data
  const [selectedOption, setSelectedOption] = useState(
    formData.subsector
      ? [{ label: formData.subsector, value: formData.subsectorId }] // Ensure it's an array for multi-select
      : []
  );
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [turnoverRanges, setTurnoverRanges] = useState([]); // State for turnover ranges from API

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_COMMON_API_URL;
    console.log('API URL:', apiUrl); // This should now log the correct URL
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          // Log an error if the response is not ok (e.g., status 404 or 500)
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Fetched Data:', data); // Log the data for debugging
        setTurnoverRanges(data.subSector); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching turnover ranges:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Selected Option:', selectedOption);
    console.log('Input Value:', inputValue);
  }, [selectedOption, inputValue]);

  // Handle changes in the select input
  const handleSelectChange = (options) => {
    console.log('Selected options:', options);
    setSelectedOption(options || []); // Ensure it's always an array for multi-select
    const selectedValues = options ? options.map((option) => option.value) : [];
    handleChange({
      target: { name: 'subsector', value: selectedValues.join(', ') }, // Pass comma-separated values
    });
    handleChange({
      target: { name: 'subsectorId', value: selectedValues.join(', ') },
    });
  };

  // Handle creation of new options
  const handleCreateOption = (inputValue) => {
    const sanitizedInput = typeof inputValue === 'string' ? inputValue.trim() : '';
    if (!sanitizedInput) return;

    const newOption = { value: sanitizedInput.toLowerCase(), label: sanitizedInput };
    setSelectedOption((prevOptions) => [...prevOptions, newOption]);
    handleChange({
      target: { name: 'subsector', value: [...selectedOption, newOption].map(option => option.label).join(', ') },
    });
    handleChange({
      target: { name: 'subsectorId', value: [...selectedOption, newOption].map(option => option.value).join(', ') },
    });
  };

  // Handle input value change for the search functionality
  const handleInputChange = (value) => {
    const sanitizedValue = typeof value === 'string' ? value.trim() : '';
    setInputValue(sanitizedValue);
  };

  // Custom DropdownIndicator with SVG
  const CustomDropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DownArrow width="15" height="15" fill="#000000" className="select-down-arrow" />
      </components.DropdownIndicator>
    );
  };

  // Custom Input component with Search Icon
  const CustomInput = (props) => {
    return (
      <div className="custom-input-container">
        {!isFocused && <SearchIcon className="search-icon drop-down-search-icon" />}
        <components.Input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => props.selectProps.onFocus()} // Add hover functionality
        />
      </div>
    );
  };

  // Custom styles for CreatableSelect
  const customStyles = {
    control: (provided) => ({
      ...provided,
      paddingLeft: '30px',
      backgroundColor: 'transparent',
      border: isFocused ? '1px solid #000000' : '1px solid #000000',
      boxShadow: isFocused ? 'none' : 'none',
      borderRadius: '20px',
      height: '45px',
      fontSize: '12px',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      color: '#000000',
      transition: 'border 0.3s ease', // Smooth transition for border change
      '&:focus': {
        border: '1px solid #000000', // Set the hover border color to be the same as the default
        boxShadow: 'none',
      },
      '&:hover': {
        border: '1px solid #000000', // Set the hover border color to be the same as the default
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
      transition: 'all 0.5s ease',
      cursor: 'pointer',
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
      
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: 'rgba(255, 255, 255, 1)', // White background for tags
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', // Tag box shadow
      borderRadius: '20px', // Rounded corners for tags
      padding: '4px 8px', // Padding inside the tags
      border: '0px solid #000', // Adding a border to the tag
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#000000', // Black text color inside the tags
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#000', // Black remove (x) icon
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#f87171', // Red background on hover
        color: '#fff', // White text color on hover
      },
    }),
  };

  const selectOptions = turnoverRanges.map((range) => ({
    value: String(range.id), // Ensure value is a string
    label: `${range.sub_sector_name}`, // Concatenate as a string
  }));

  return (
    <div className="register-form-control">
      <label className="register-label">Sub Sector</label>
      <CreatableSelect
        isMulti
        isClearable
        value={selectedOption}
        options={selectOptions}
        onChange={handleSelectChange} // Handle selection change
        onInputChange={handleInputChange} // Handle input change (searching)
        onCreateOption={handleCreateOption} // Handle creating new option
        placeholder="Lorem ipsum"
        styles={customStyles}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
      {formErrors.subsector && <p className="error">{formErrors.subsector}</p>}
    </div>
  );
}

export default SubSector;
