import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../assets/images/Search.svg'; // Import search icon
function Specialization({ formData, formErrors, handleChange }) {
 
    // States for selected option, input value, and API data
            const [selectedOption, setSelectedOption] = useState(
              formData.turnover
                ? { label: formData.subsector, value: formData.subsectorId }
                : null
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
                  console.log('Fetched Data:', data); // Log the data for debugging
                  setTurnoverRanges(data.specialisation); // Update state with fetched data
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
            const handleSelectChange = (option) => {
              console.log('Selected option:', option);
            
              if (!option) {
                // Clear both `selectedOption` and `inputValue`
                setSelectedOption(null);
                setInputValue('');
                handleChange({
                  target: { name: 'specialization', value: '' },
                });
                handleChange({
                  target: { name: 'specializationId', value: '' },
                });
                return;
              }
            
              setSelectedOption(option);
              setInputValue(option.label); // Ensure `inputValue` reflects the selected option's label
              handleChange({
                target: {
                  name: 'subsector',
                  value: option.label,
                },
              });
              handleChange({
                target: {
                  name: 'subsectorId',
                  value: option.value,
                },
              });
            };
            
          
            // Handle creation of new options
            const handleCreateOption = (inputValue) => {
             // Ensure `inputValue` is a string
             const sanitizedInput = typeof inputValue === 'string' ? inputValue.trim() : '';
             if (!sanitizedInput) return;
           
             const newOption = { value: sanitizedInput.toLowerCase(), label: sanitizedInput };
             setSelectedOption(newOption);
             handleChange({
              target: { name: 'specialization', value: newOption.label },
            });
          
            handleChange({
              target: { name: 'specializationId', value: newOption.value },
            });
            };
          
            // Handle input value change for the search functionality
            const handleInputChange = (value) => {
             // Ensure `value` is a string before trimming
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
            };
          
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
  value={selectedOption}
  options={selectOptions}
  onChange={(option) => {
    console.log('Option onChange:', option); // Debugging log
    handleSelectChange(option);
  }}
  onInputChange={(value) => {
    console.log('Input value onInputChange:', value); // Debugging log
    handleInputChange(value);
  }}
  onCreateOption={(inputValue) => {
    console.log('Input value onCreateOption:', inputValue); // Debugging log
    handleCreateOption(inputValue);
  }}
  placeholder="Lorem ipsum"
  styles={customStyles}
  components={{ DropdownIndicator: CustomDropdownIndicator }}
/>

      {formErrors.specialization && <p className="error">{formErrors.specialization}</p>}
    </div>
    </>
  )
}

export default Specialization
