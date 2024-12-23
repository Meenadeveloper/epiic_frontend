import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Search.svg';

function CertificateInput({
    formData,
    formErrors,
    name,
    handleChange,
}) {
    const [certificate, setCertificate] = useState(formData ? formData[name].split(',').map(userdata => ({ label: userdata, value: userdata })) : []);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Handle the change in certificates (tags)
    const onhandleChange = (newCertificates) => {
        setCertificate(newCertificates);
    };

    // Update the parent component when certificates change
    useEffect(() => {
        handleChange(certificate.map(userdata => userdata.value).join(', ')); // Pass updated tags to parent
    }, [certificate, handleChange]);

    // Handle key events (e.g., enter, tab)
    const handleKeyDown = (event) => {
        if (!inputValue) return;
        // Check if the Enter or Tab key was pressed
        if (event.key === 'Enter' || event.key === 'Tab') {
            const newCertificates = inputValue.trim();
            if (newCertificates && !certificate.some(userdata => userdata.value === newCertificates)) {
                setCertificate([...certificate, { label: newCertificates, value: newCertificates }]); // Add new certificate
                setInputValue(''); // Clear the input after adding the tag
            }
            event.preventDefault(); // Prevent the default Enter behavior
        }
    };

    return (
        <div className='auto-fit-row' style={{ padding: '20px 0px', paddingBottom: '40px' }}>
            <div className='auto-fit-column'>
                <div className="register-form-control resposive-form-control">
                    <label className="register-label">Certificates</label>

                    <CreatableSelect
                        isMulti
                        isClearable={false}
                        value={certificate} // Pass selected certificates
                        onChange={onhandleChange} // Update certificate state
                        options={[]} // No predefined options, tags are created by the user
                        onCreateOption={(inputValue) => {
                            const newCertificates = inputValue.trim();
                            if (newCertificates && !certificate.some(userdata => userdata.value === newCertificates)) {
                                setCertificate([...certificate, { label: newCertificates, value: newCertificates }]); // Add new tag
                            }
                        }}
                        menuIsOpen={false} // Hide the dropdown menu
                        components={{
                            DropdownIndicator: () => null, // Hide the dropdown arrow
                            IndicatorSeparator: () => null, // Remove the separator line
                        }}
                        onKeyDown={handleKeyDown} // Listen for key press events (Enter or Tab)
                        inputValue={inputValue}
                        onInputChange={(newValue) => setInputValue(newValue)} // Update inputValue when user types
                        placeholder={
                            certificate.length === 0
                                ? 'Start adding your tags...'
                                : 'You can add more tags or press enter...'
                        }
                        classNamePrefix="custom"
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                width: '100%',
                                background: 'transparent',
                            }),
                            multiValue: (styles) => ({
                                ...styles,
                                backgroundColor: 'rgba(255, 255, 255, 1)', // Custom background color for tags
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                borderRadius: '20px',
                                padding: '2px 4px',
                            }),
                            multiValueLabel: (styles) => ({
                                ...styles,
                                color: 'rgba(0, 0, 0, 1)', // Custom color for tag text
                            }),
                            multiValueRemove: (styles) => ({
                                ...styles,
                                color: 'rgba(0, 0, 0, 1)',
                                ':hover': {
                                    backgroundColor: '#c7d2fe',
                                    color: 'red',
                                },
                            }),
                            control: (styles, { isFocused }) => ({
                                ...styles,
                                borderColor: isFocused ? '#000000' : '#000000',
                                borderRadius: '20px',
                                background: 'transparent',
                                boxShadow: isFocused ? 'none' : 'none',
                                ':hover': {
                                    borderColor: '#000000', // Change border color on hover
                                },
                                height: '100%',
                                maxHeight:'90px',
                                overflowY:'auto',
                                clipPath: 'inset(0 round 20px)',
                                  /* Scrollbar customization */
    '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#888', // Scrollbar thumb color
        borderRadius: '20px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555', // Thumb color on hover
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: '#f0f0f0', // Scrollbar track color
      },
                            }),
                            dropdownIndicator: (styles) => ({
                                ...styles,
                                color: '#2563eb', // Icon color
                            }),
                            indicatorSeparator: (styles) => ({
                                ...styles,
                                display: 'none', // Hide the indicator separator
                            }),
                            menu: (styles) => ({
                                ...styles,
                                maxHeight: '200px', // Set maximum height for the dropdown
                                width: '100%',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: '#6b7280', // Custom placeholder color
                                fontSize: '12px', // Custom placeholder font size
                                textAlign: 'left',
                            }),
                        }}
                    />

                    {formErrors.certifications && <p className="error">{formErrors.certifications}</p>}
                </div>
            </div>
            <div className='auto-fit-column'>
                <p className='register-label' style={{ marginBottom: '0px' }}>OR</p>
            </div>
            <div className='auto-fit-column'>
                <div className="register-form-control resposive-form-control" style={{ height: 'fit-content' }}>
                    <div className="not-applicable-checkbox-wrapper">
                        <input type="checkbox" id="not-applicable" />
                        <label htmlFor="not-applicable"><span className='register-label'>Not Applicable</span></label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CertificateInput;
