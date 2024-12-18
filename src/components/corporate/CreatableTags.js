import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

const CreatableTags = ({ formData, handleTagsChange }) => {
  const [tags, setTags] = useState(formData ? formData.tags.split(',').map(tag => ({ label: tag, value: tag })) : []); // Initialize tags state as objects
  const [inputValue, setInputValue] = useState(''); // Manage the input value

  const handleChange = (newTags) => {
    // Update tags state with selected or created tags
    setTags(newTags);
  };

  useEffect(() => {
    // Update the parent with the tags as a comma-separated string when tags change
    handleTagsChange(tags.map(tag => tag.value).join(', ')); // Pass updated tags to parent
  }, [tags, handleTagsChange]);

  const handleKeyDown = (event) => {
    if (!inputValue) return; // Do nothing if there's no input value
    // Check if the Enter or Tab key was pressed
    if (event.key === 'Enter' || event.key === 'Tab') {
      const newTag = inputValue.trim();
      if (newTag && !tags.some(tag => tag.value === newTag)) {
        setTags([...tags, { label: newTag, value: newTag }]); // Add the new tag to the tags list
        setInputValue(''); // Clear the input after adding the tag
      }
      event.preventDefault(); // Prevent the default Enter behavior
    }
  };

  return (
    <div className="tag-input-container" style={{ maxWidth: '100%', height: '100px' }}>
      <CreatableSelect
        isMulti 
        value={tags} // The tags should be passed as objects with label and value
        onChange={handleChange}
        options={[]} // No predefined options, tags are created by the user
        onCreateOption={(inputValue) => {
          const newTag = inputValue.trim();
          if (newTag && !tags.some(tag => tag.value === newTag)) {
            setTags([...tags, { label: newTag, value: newTag }]); // Add new tag on creation
          }
        }}
        menuIsOpen={false} // Hide the dropdown menu
        components={{
          DropdownIndicator: () => null, // Hide the dropdown arrow
          IndicatorSeparator: () => null, // Remove the separator line
        }}
        onKeyDown={handleKeyDown} // Listen for key press events (Enter or Tab)
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)} // Update the inputValue when the user types
        placeholder={
          tags.length === 0
            ? 'Start adding your tags...'
            : 'You can add more tags or press enter...'
        } // Dynamic placeholder text based on tag count
        classNamePrefix="custom"
        styles={{
          container: (provided) => ({
            ...provided,
            width: '100%',
            height: '100px',
          }),
          multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#e0e7ff', // Custom background color for tags
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: '#1e40af', // Custom color for tag text
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: '#1e40af',
            ':hover': {
              backgroundColor: '#c7d2fe',
              color: '#1e3a8a',
            },
          }),
          control: (styles) => ({
            ...styles,
            borderColor: '#93c5fd', // Border color for the input field
            ':hover': {
              borderColor: '#2563eb', // Change border color on hover
            },
            height: '100%', // Make sure the height is consistent
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
            width: '100%', // Ensure the dropdown takes up full width
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#6b7280', // Custom placeholder color
            fontStyle: 'italic', // Custom placeholder font style
            fontSize: '12px', // Custom placeholder font size
          }),
        }}
      />
    </div>
  );
};

export default CreatableTags;
