import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

function CreatableTags() {
  const [tags, setTags] = useState([]); // Initialize tags state

  const handleTagChange = (newTags) => {
    setTags(newTags); // Update tags state with selected or created tags
  };

  return (
    <div>
      <div className="tag-input-container">
        <label>Tags</label>
        <CreatableSelect
          isMulti
          value={tags}
          onChange={handleTagChange}
          options={tags.map((tag) => ({ label: tag, value: tag }))} // Convert tags to options
          isClearable
          isSearchable
          onCreateOption={(inputValue) => {
            // Add the new tag to the existing tags list
            const newTag = { label: inputValue, value: inputValue };
            setTags((prevTags) => [...prevTags, newTag]);
          }}
        />
      </div>
    </div>
  );
}

export default CreatableTags;
