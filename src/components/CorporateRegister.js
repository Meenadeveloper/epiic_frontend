import AboutField from "./AboutField";
import AdditionalInformation from "./AdditionalInformation";
import CorporateBasicDetail from "./CorporateBasicDetail";
import LogoInput from "./LogoInput";

import React, { useState } from "react";
import { toast } from "react-toastify";

function CorporateRegister() {

  const [formData, setFormData] = useState({
   
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    designation: "",
    website:"",
    country:"",
    logo: "",
  });
  const [formErrors, setFormErrors] = useState({
   firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    designation: "",
    website:"",
    country:"",
    logo: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // New state for phone verification
 // Handle form data change
 const handleChange = (e) => {
  const { name, value } = e.target;
  

  // Update errors dynamically
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    [name]: value.trim() ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`, // Dynamic error message
  }));

  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

 // Handle file input change (for logo)
 const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: files[0], // Assuming single file upload
  }));
};


 // Validate form data
 const validateForm = () => {
  const errors = {};
  let isValid = true;

  // Validate required fields
  if (!formData.firstName.trim()) {
    errors.firstName = "First Name is required.";
    isValid = false;
  }
  if (!formData.lastName.trim()) {
    errors.lastName = "Last Name is required.";
    isValid = false;
  }
  if (!formData.organisation.trim()) {
    errors.organisation = "Organisation is required.";
    isValid = false;
  }
  if (!formData.designation.trim()) {
    errors.designation = "Designation is required.";
    isValid = false;
  }
  if (!formData.website.trim()) {
    errors.website = "Website is required.";
    isValid = false;
  }
  if (!formData.country.trim()) {
    errors.country = "Country is required.";
    isValid = false;
  }
 
  if (!formData.logo) {
    errors.logo = "Logo is required.";
    isValid = false;
  }

  // If there are any errors, set them
  setFormErrors(errors);
  return isValid;
};

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  // Check if all OTPs are verified
  if (!isEmailVerified) {
    toast.error("Please verify your email OTP.");
    return;
  }
  if (!isPhoneVerified) {
    toast.error("Please verify your phone OTP.");
    return;
  }
  if (validateForm()) {
    // Proceed with form submission logic (e.g., API call)
    toast.success("Form submitted successfully");
    console.log(formData);
    // Optionally reset form after successful submission
    setFormData({
      firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    designation: "",
    website:"",
    country:"",
    logo: "",
    });
  } else {
    toast.error("Please fill in all required fields.");
  }
};
  return (
    <>
      <div className='register-container'>
        <div className='custom-container'>
          <div className='register-box'>
            <div className='back-btn-box'>
              <button
                className='back-btn'
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = '/'; // Replace '/' with your fallback URL
                  }
                }}
              >
                Back
              </button>
            </div>
            <div className='register-form-container  '>
              <div className='register-form-box corporate-box'>
                <div className='register-heading'>
                  <h2>CORPORATE REGISTRATION</h2>
                </div>

                  <form className="corporate-register"  onSubmit={handleSubmit}>
                   {/* Corporate Basic Detail Section */}
                <CorporateBasicDetail
                  formData={formData}
                  formErrors={formErrors}
                  handleChange={handleChange}
                  isEmailVerified={isEmailVerified}
                  setIsEmailVerified={setIsEmailVerified}
                  isPhoneVerified={isPhoneVerified}
                  setIsPhoneVerified={setIsPhoneVerified}
                />
                 
                    <AboutField/>
                    <AdditionalInformation/>
                    <LogoInput/>
                    <div className="d-center">
                    <button type="submit" className="save-btn">Submit</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CorporateRegister
