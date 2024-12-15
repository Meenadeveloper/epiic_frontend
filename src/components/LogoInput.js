import React, { useState } from 'react';
import { ReactComponent as FileUpload } from '../assets/images/Upload to Cloud.svg';

function LogoInput({ 
  parenthandleFileChange,
  formData,
  formErrors,
  handleChange,
  name
 }) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle file validation and setting
  const handleFile = (selectedFile) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    console.log(selectedFile);  // Log the file object to the console

    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('Invalid file type. Please upload JPG, JPEG, or PNG files only.');
      setFile(null);
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB. Please upload a smaller file.');
      setFile(null);
    } else {
      setErrorMessage('');
      setFile(selectedFile);
      parenthandleFileChange(selectedFile); // Pass the file to the parent
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
    setIsDragOver(false);
  };

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Clear file function (optional feature)
  const handleClearFile = () => {
    setFile(null);
    setErrorMessage('');
    parenthandleFileChange(null); // Clear the file in parent
  };

  return (
    <div className="register-full-row">
      <label className="register-label">Upload Logo (Optional)</label>
      <div
        className={`logo-input-container ${isDragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          className="logo-file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
          accept=".jpg,.jpeg,.png"
          name={name}
          value={formData.college_logo}
        />
        <div className="logo-file-upload-content">
          <FileUpload className="file-upload-img" />
          {file ? (
            <div className='file-name-box'>
              <p>{file.name}</p>
              <button type="button" onClick={handleClearFile} className="clear-btn"><span class="material-icons">close</span>
              </button>
            </div>
          ) : (
            <span>JPG, PNG or PDF, smaller than 5 MB</span>
          )}
          <p>Drag or drop file here or</p>
          <button
            type="button"
            className="file-btn"
            onClick={() => document.getElementById('file-input').click()}
          >
            Choose file
          </button>
        </div>
      </div>
      <div className="file-error">
        {errorMessage && <p className="error">{errorMessage}</p>}
        {formErrors.college_logo && <p className="error">{formErrors.college_logo}</p>} {/* Display error message if any */}

      </div>
    </div>
  );
}

export default LogoInput;
