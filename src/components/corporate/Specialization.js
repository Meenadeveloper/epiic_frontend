import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../assets/images/Search.svg'; // Import search icon

function Specialization({ formData, formErrors, handleChange }) {
  // State for selected options, input value, and API data
  const [selectedOptions, setSelectedOptions] = useState(
    Array.isArray(formData.specialization)
      ? formData.specialization.map((item) => ({
          label: item.label,
          value: item.value,
        }))
      : [] // Fallback to an empty array if formData.subsector is not an array
  );
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [turnoverRanges, setTurnoverRanges] = useState([]); // State for turnover ranges from API

  // Fetching data from API on component mount
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_COMMON_API_URL;

    if (!apiUrl) {
      console.error("API URL is missing");
      return;
    }

    console.log('API URL:', apiUrl); // This should now log the correct URL
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.specialisation)) {
          setTurnoverRanges(data.specialisation); // Update state with fetched data
        } else {
          console.error('Expected an array for specialisation data');
        }
      })
      .catch((error) => {
        console.error('Error fetching turnover ranges:', error);
      });
  }, []);

  // Handle changes in the select input
  const handleSelectChange = (options) => {
    console.log('Selected options:', options);

    // If no options are selected, clear the state and form data
    if (!options || options.length === 0) {
      setSelectedOptions([]);
      handleChange({
        target: { name: 'specialization', value: [] },
      });
      handleChange({
        target: { name: 'specializationId', value: [] },
      });
      return;
    }

    // Update selectedOptions and pass data to the parent component
    setSelectedOptions(options);

    const selectedLabels = options.map((option) => option.label);
    const selectedValues = options.map((option) => option.value);

    handleChange({
      target: {
        name: 'specialization',
        value: selectedLabels,
      },
    });
    handleChange({
      target: {
        name: 'specializationId',
        value: selectedValues,
      },
    });
  };

  // Handle creation of new options
  const handleCreateOption = (inputValue) => {
    if (!inputValue) return; // Ensure the input is not empty

    const newOption = { value: inputValue.toLowerCase(), label: inputValue };

    // Update the selected options state
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions, newOption];

      // Update the form data in the parent component
      handleChange({
        target: { name: 'specialization', value: updatedOptions.map(option => option.label).join(', ') },
      });
      handleChange({
        target: { name: 'specializationId', value: updatedOptions.map(option => option.value).join(', ') },
      });

      return updatedOptions; // Return the updated options
    });
  };

  // Handle input value change without trimming spaces or symbols
  const handleInputChange = (value) => {
    setInputValue(value); // Directly set the input value without trimming
  };

  // Custom DropdownIndicator with SVG
  const CustomDropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DownArrow width="15" height="15" fill="#000000" className="select-down-arrow" />
      </components.DropdownIndicator>
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
      transition: 'border 0.3s ease',
      '&:focus': {
        border: '1px solid #000000',
        boxShadow: 'none',
      },
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
  };

  // Prepare options for the CreatableSelect component
  const selectOptions = turnoverRanges.map((range) => ({
    value: String(range.id), // Ensure value is a string
    label: `${range.specialisation_name}`, // Concatenate as a string
  }));

  return (
    <>
      <div className="register-form-control">
        <label className="register-label">Specialization</label>
        <CreatableSelect
          isClearable
          isMulti
          value={selectedOptions}
          options={selectOptions}
          onChange={(options) => {
            console.log('Options onChange:', options); // Debugging log
            handleSelectChange(options);
          }}
          onInputChange={(value) => {
            console.log('Input value onInputChange:', value); // Debugging log
            handleInputChange(value);
          }}
          onCreateOption={(inputValue) => {
            console.log('Input value onCreateOption:', inputValue); // Debugging log
            handleCreateOption(inputValue);
          }}
          placeholder="Select or create specialization"
          styles={customStyles}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
        />
        {formErrors.specialization && <p className="error">{formErrors.specialization}</p>}
      </div>
    </>
  );
}

export default Specialization;
