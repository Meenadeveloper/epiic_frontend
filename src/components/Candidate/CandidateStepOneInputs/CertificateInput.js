import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Search.svg';

function CertificateInput({
    formData = {},
    formErrors = {},
    handleChange,
}) {
    // States for selected option, input value, and API data
  const [selectedOption, setSelectedOption] = useState(
    formData.certifications ? { label: formData.certifications, value: formData.certificationsId } : null
  );
    
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track focus state
    const [turnoverRanges, setTurnoverRanges] = useState([]); // State for turnover ranges from API

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_COMMON_API_URL;
        // console.log('API URL:', apiUrl); 
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

        // Create an array of selected values and labels
        const selectedValues = options ? options.map((option) => option.value) : [];
        const selectedLabels = options ? options.map((option) => option.label) : [];

        if (handleChange) {
          
            // Update parent state
            handleChange({ target: { name: 'certifications', value: selectedLabels.join(', ') } });
            handleChange({ target: { name: 'certificationsId', value: selectedValues.join(', ') } });
        } else {
            console.error('handleChange function is not defined');
        }
    };
  
    
    // Handle creation of new options
    const handleCreateOption = (inputValue) => {
        const sanitizedInput = typeof inputValue === 'string' ? inputValue.trim() : '';
        if (!sanitizedInput) return;

        const newOption = { value: sanitizedInput.toLowerCase(), label: sanitizedInput };
        setSelectedOption((prevOptions) => [...prevOptions, newOption]);
        handleChange({
            target: { name: 'certifications', value: [...selectedOption, newOption].map(option => option.label).join(', ') },
        });
        handleChange({
            target: { name: 'certificationsId', value: [...selectedOption, newOption].map(option => option.value).join(', ') },
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

    // Custom styles for CreatableSelect
    const customStyles = {
        control: (provided) => ({
            ...provided,
            paddingLeft: '30px',
            backgroundColor: 'transparent',
            border: isFocused ? '1px solid #000000' : '1px solid #000000',
            boxShadow: isFocused ? 'none' : 'none',
            borderRadius: '20px',
            height: '100%',
            overflowY:'auto',
            clipPath: 'inset(0 round 20px)',
            maxHeight:'100px',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            fontWeight: 400,
            color: '#000000',
            position: 'relative',
            padding:'10px 20px',
            transition: 'border 0.3s ease', 
            '&:focus': {
                border: '1px solid #000000', 
                boxShadow: 'none',
            },
            '&:hover': {
                border: '1px solid #000000',
            },
            '::-webkit-scrollbar': {
                width: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '20px',
            },
            '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555',
            },
            '::-webkit-scrollbar-track': {
                backgroundColor: '#f0f0f0',
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
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            borderRadius: '20px',
            padding: '4px 8px',
            border: '0px solid #000',
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: '#000000',
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: '#000',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: '#f87171',
                color: '#fff',
            },
        }),
    };

    const selectOptions = turnoverRanges.map((range) => ({
        value: String(range.id), // Ensure value is a string
        label: `${range.sub_sector_name}`, // Concatenate as a string
    }));

    return (
        <div className='auto-fit-row' style={{ padding:'20px 0px',paddingBottom:'40px' }}>
            <div className='auto-fit-column'>
                <div className="register-form-control resposive-form-control">
                    <label className="register-label">Certificates</label>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <SearchIcon
                            width="15"
                            height="15"
                            fill="#000000"
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor:'pointer',
                            }}
                        />
                        <CreatableSelect
                            isMulti
                            isClearable
                            value={selectedOption}
                            options={selectOptions}
                            onChange={handleSelectChange} 
                            onInputChange={handleInputChange} 
                            onCreateOption={handleCreateOption} 
                            placeholder="Search"
                            styles={customStyles}
                            components={{ DropdownIndicator: CustomDropdownIndicator }}
                        />
                    </div>
                    {formErrors.certifications && <p className="error">{formErrors.certifications}</p>}
                </div>                    
            </div>
            <div className='auto-fit-column'>
                <p className='register-label' style={{ marginBottom:'0px' }}>OR</p>
            </div>
            <div className='auto-fit-column'>
            <div className="register-form-control resposive-form-control" style={{ height:'fit-content' }}>
            <div className="not-applicable-checkbox-wrapper">
               <input type="checkbox" id="not-applicable" />
               <label for="not-applicable"><span className='register-label'>Not Applicable</span></label>
               </div>
            </div>
            </div>
        </div>
    );
}

export default CertificateInput;
