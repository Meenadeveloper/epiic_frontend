import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg';
import { ReactComponent as SearchIcon } from '../../../assets/images/Search.svg';

function SkillSetInput({
  name,
  formData,
  formErrors,
  handleChange,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    formData.skill_set ? formData.skill_set.map(skill => ({ label: skill, value: skill })) : []
  );
  
  const [inputValue, setInputValue] = useState('');
  const [qualifications, setQualifications] = useState([]);

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
        setQualifications(data.qualification);
      })
      .catch((error) => {
        console.error('Error fetching qualification data:', error);
      });
  }, []);

  const handleSelectChange = (options, actionMeta) => {
    if (!options) {
      setSelectedOptions([]);  // Reset the selected options
      handleChange({
        target: { name, value: [] }, // Reset the parent form values
      });
      return;
    }

    if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
      const updatedOptions = options.map(option => ({
        label: option.label,
        value: option.value,
      }));

      setSelectedOptions(updatedOptions);

      // Map the selected options to their values
      const selectedValues = updatedOptions.map(option => option.value);
      
      // Pass the selected values to the parent component through handleChange
      handleChange({
        target: { name, value: selectedValues },
      });
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value.trim());
  };

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <DownArrow width="15" height="15" fill="#000000" className="select-down-arrow" />
    </components.DropdownIndicator>
  );

  const CustomOption = (props) => (
    <components.Option {...props}>
      <span style={{ marginRight: '5px', fontWeight: '500', color: '#000000', fontSize: '14px' }}>+</span> {props.label}
    </components.Option>
  );

  const CustomMultiValueContainer = ({ children, ...props }) => (
    <components.MultiValueContainer {...props}>
      <div style={{
        display: 'flex',
        backgroundColor: '#ffff',
        borderRadius: '20px',
        padding: '5px',
        fontSize: '12px',
        color: '#000',
        width: 'fit-content',
        border: '1px solid #fff',
      }}>
        {children}
      </div>
    </components.MultiValueContainer>
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: '1px solid #000000',
      boxShadow: 'none',
      borderRadius: '20px',
      padding: '10px 10px',
      paddingLeft: '30px',
      height: '100%',
      maxHeight: '150px',
      overflowY: 'auto',
      fontSize: '12px',
      fontFamily: 'Montserrat',
      color: '#000000',
      clipPath: 'inset(0 round 20px)',
      '&:hover': {
        border: '1px solid #000000',
      },
      position: 'relative',
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
      backgroundColor: 'rgb(209, 205, 201)',
      zIndex: '2',
      border: '1px solid rgba(0, 0, 0, 0.68)',
      borderRadius: '20px',
      boxShadow: '0px 4px 4px 0px #00000040',
      marginTop: '10px',
      maxHeight: '210px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      gap: '30px',
      overflowY: 'auto',
      clipPath: 'inset(0 round 20px)',
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
    option: (provided, state) => ({
      ...provided,
      color: '#000000',
      fontSize: '12px',
      padding: '10px 20px',
      backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
      width: 'fit-content',
      borderRadius: '20px',
      display: 'inline-flex',
      marginRight: '30px',
      marginTop: '10px',
      marginBottom: '10px',
      cursor: 'pointer',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      borderRadius: '20px',
      fontSize: '12px',
      color: '#000',
      marginRight: '20px',
      marginBottom: '5px',
      marginTop: '5px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#000',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#000000',
      ':hover': {
        backgroundColor: 'transparent',
      },
    }),
  };

  const selectOptions = qualifications.map((range) => ({
    value: String(range.id),
    label: range.department_name,
  }));

  return (
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
          cursor: 'pointer',
        }}
      />
      <CreatableSelect
        isMulti
        isClearable
        value={selectedOptions}
        options={selectOptions}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        placeholder="Search...."
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          Option: CustomOption,
          MultiValueContainer: CustomMultiValueContainer,
        }}
        formatCreateLabel={(inputValue) => `${inputValue}`}
      />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}
    </div>
  );
}

export default SkillSetInput;
