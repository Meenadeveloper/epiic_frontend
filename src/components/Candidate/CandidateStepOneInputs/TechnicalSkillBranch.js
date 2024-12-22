import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Use Select instead of CreatableSelect
import { components } from 'react-select';
import { ReactComponent as DownArrow } from '../../../assets/images/Sort Right.svg'; // Import your dropdown icon here

function TechnicalSkillBranch({
    name,
    formData,
    formErrors,
    handleChange,
}) {
  const selectOptions = [
    { value: '1', label: 'IT' },
    { value: '2', label: 'HR' },
    { value: '3', label: 'Banking' },
    { value: '4', label: 'Admin' },
    { value: '5', label: 'Others' },
  ];

  // Set the first option as default
  const [selectedOption, setSelectedOption] = useState(selectOptions[0]);

  useEffect(() => {
    handleChange({
      target: { name: name, value: selectOptions[0].label }, // Default to first option
    });
    handleChange({
      target: { name: 'technical_skill_id', value: selectOptions[0].value },
    });
  }, []);

  const handleSelectChange = (option) => {
    if (!option) {
      setSelectedOption(null);
      handleChange({ target: { name: name, value: '' } });
      handleChange({ target: { name: 'technical_skill_id', value: '' } });
      return;
    }

    setSelectedOption(option);
    handleChange({
      target: {  name: name, value: option.label },
    });
    handleChange({
      target: { name: 'technical_skill_id', value: option.value },
    });
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
      border: '1px solid rgba(0, 0, 0, 0.6)',
      boxShadow: 'none',
      borderRadius: '20px',
      height: '45px',
      maxHeight:'100%',
      fontSize: '14px',
      fontFamily: 'Montserrat',
      fontWeight: 700,
      textAlign:'center',
      color: 'rgba(0, 0, 0, 0.6)',
      '&:hover': {
        border: '1px solid rgba(0, 0, 0, 0.6)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0px 4px 4px 0px #00000040',
      marginTop: '5px',
      maxHeight: '230px',
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
    input: () => ({
      display: 'none', // Disable typing input
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: 'Montserrat',
    }),
  };

  return (
    <>
     <div className="register-form-control">
      <Select
        isClearable={false} // Disable clearing of the selection
        value={selectedOption}
        options={selectOptions}
        onChange={handleSelectChange}
        placeholder={null} // No placeholder
        styles={customStyles}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
      {formErrors[name] && <p className="error">{formErrors[name]}</p>}
      </div>
    </>
  );
}

export default TechnicalSkillBranch;
