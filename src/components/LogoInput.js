import React, { useState } from 'react';
import { ReactComponent as FileUpload } from '../assets/images/Upload to Cloud.svg'; // Adjusted name for React import

function LogoInput() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false); // New state to track drag over

  // Handle file validation and setting
  const handleFile = (selectedFile) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('Invalid file type. Please upload JPG, JPEG, or PNG files only.');
      setFile(null);
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB. Please upload a smaller file.');
      setFile(null);
    } else {
      setErrorMessage('');
      setFile(selectedFile);
    }
  };

  // Handle file change on input
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  // Handle drag and drop file
  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    handleFile(selectedFile);
    setIsDragOver(false); // Reset drag state when file is dropped
  };

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true); // Set drag state to true when dragging over
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragOver(false); // Reset drag state when leaving the drop zone
  };

  return (
    <>
      <div className="register-full-row" >
        <label className="register-label">Address 1*</label>
        <div
          className={`logo-input-container ${isDragOver ? 'drag-over' : ''}`} // Conditionally apply class
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Hidden input for choosing file */}
          <input
            type="file"
            className="logo-file-input"
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hide the default input for styling
            id="file-input"
            accept=".jpg,.jpeg,.png" // File types allowed
          />
          <div className="logo-file-upload-content">
            <FileUpload className="file-upload-img" />
            {file ? (
              <p>{file.name}</p> // Display selected file name
            ) : (
              <span>JPG, PNG or PDF, smaller than 5 MB</span>
            )}
            <p>Drag or drop file here or</p>
            {/* Button to trigger file input */}
            <button type="button"
              className="file-btn"
              onClick={() => document.getElementById('file-input').click()}
            >
              Choose file
            </button>
          </div>
        </div>
        <div className='file-error'>
        {errorMessage && <p className="error ">{errorMessage}</p>}

        </div>

      </div>
    </>
  );
}

export default LogoInput;
