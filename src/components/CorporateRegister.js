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
    aboutus:"",
    noofemployees:"",
    gst:"",
    turnover: "",
    turnoverId: "",
    natureofindustry:"",
    classifiedindustry:"",
    subsector:"",
    specialization:"",
    logo: null, // To store the file in formData
  });
  const [formErrors, setFormErrors] = useState({
   firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    designation: "",
    website:"",
    country:"",
    aboutus:"",
    noofemployees:"",
    gst:"",
    turnover: "",
    turnoverId: "",
    natureofindustry:"",
    classifiedindustry:"",
    subsector:"",
    specialization:"",
    logo: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // New state for phone verification
  const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[0-9A-Z]{1}$/;
  const [gstsuccessMessage, setGstsuccessMessage] = useState(false);

  const handleChange = (e) => {
    if (!e.target) return; // Make sure e.target exists
    const { name, value } = e.target;
  
    // Update form data dynamically
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(), // Trim value to avoid leading/trailing spaces
    }));
  
    // Update errors dynamically
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim()
        ? ""
        : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
    }));
  
    // Simple GST pattern check (You can use a more complex one as needed)
    const gstPattern = /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}$/;
  
    // GST validation check only if name is 'gst'
    if (name === "gst") {
      if (!value.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          gst: "GST number required",
        }));
        setGstsuccessMessage(false);
      } else if (gstPattern.test(value)) {
        setGstsuccessMessage(true);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          gst: "",
        })); // Clear any error
      } else {
        setGstsuccessMessage(false);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          gst: "Invalid GST number",
        }));
      }
    }
  
    // Validate the number of employees (Only numbers allowed)
    if (name === "noofemployees") {
      if (!value.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          noofemployees: "No of employees is required.",
        }));
      } else if (!/^\d+$/.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          noofemployees: "Only numbers are allowed.",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          noofemployees: "", // Clear error if valid number
        }));
      }
    }
  
    
  };
  
  

 // Handle file input change (for logo)
 const parenthandleFileChange = (file) => {
  setFormData((prevData) => ({
    ...prevData,
    logo: file, // Update logo with the selected file
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
  if (!formData.aboutus.trim()) {
    errors.aboutus = "About us is required.";
    isValid = false;
  }
  if (!formData.noofemployees.trim()) {
    errors.noofemployees = "No of employees is required.";
    isValid = false;
} else if (!/^\d+$/.test(formData.noofemployees)) {
    errors.noofemployees = "Only numbers are allowed.";
    isValid = false;
}
  if (!formData.gst.trim()) {
    errors.gst = "GST No is required.";
    isValid = false;
  }
  
  else if (!gstPattern.test(formData.gst)) {
    errors.gst = "Invalid GST No. Please enter a valid GST number.";
    isValid = false;
  }
  if (!formData.turnover.trim()) {
    errors.turnover = "Turn Over organisation is required.";
    isValid = false;
  }
  if (!formData.natureofindustry.trim()) {
    errors.natureofindustry = "Nature of Industry is required.";
    isValid = false;
  }
  if (!formData.classifiedindustry.trim()) {
    errors.classifiedindustry = "Classified Industry is required.";
    isValid = false;
  }

  if (!formData.subsector.trim()) {
    errors.subsector = "Sub sector is required.";
    isValid = false;
  }
  if (!formData.specialization.trim()) {
    errors.specialization = "Specialization is required.";
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
                 
                    <AboutField
                     formData={formData}
                     formErrors={formErrors}
                     handleChange={handleChange}
                    />
                    <AdditionalInformation
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
                    gstsuccessMessage={gstsuccessMessage}
                    />
                    <LogoInput
                    parenthandleFileChange={parenthandleFileChange}
                    />
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
