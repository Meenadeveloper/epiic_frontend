import React, { useEffect, useState } from 'react';

function CollegeCompleteRegisterForm() {
  const [formData, setFormData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve form data from localStorage and set it if available
    const storedFormData = localStorage.getItem('form_data');
    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        console.log('Form data from localStorage:', parsedFormData); // Log the formData
        setFormData(parsedFormData);
      } catch (err) {
        console.error('Error parsing form data from localStorage:', err);
        setError('Failed to load form data');
      }
    } else {
      setError('No form data found in localStorage');
    }
  }, []);

  // If there's an error, show the error message
  if (error) {
    console.error('Error:', error);
    return <p>{error}</p>;
  }

  // If formData is still null, show a loading message
  if (!formData) {
    return <p>Loading form data...</p>; // Wait until formData is set
  }

  // Log formData whenever it's loaded
  console.log('Loaded formData:', formData);

  return (
    <>
       <div className="register-container">
      <div className="custom-container">
        <div className="register-box">
          <div className="back-btn-box">
            <button
              className="back-btn"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
            >
              Back
            </button>
          </div>

          <div className="register-form-container">
            <div className="register-form-box college-register">
              <div className="reg-form-content-box">
                <div className="register-heading">
                  <h2 className='college-heading'>COLLEGE REGISTRATION</h2>
                </div>

                <div className='college-data-container'>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>State</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'> {formData.stateName}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>District</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{formData.districtName}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>Institution Type</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{formData.instituteType}</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>Name of the Institution</p>
                  </div>
                  <div className='college-data-item'>
                    <p className='college-data-txt'>{formData.collegeName}</p>
                  </div>
                </div>
                <div className="borderless-form-box">
                <h2 className="college-heading">Additional Information</h2>
                <div className="register-row">
                  <div className="register-col">
                     
                  </div>
                  <div className="register-col">
                     
                  </div>
               </div>


                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CollegeCompleteRegisterForm;
