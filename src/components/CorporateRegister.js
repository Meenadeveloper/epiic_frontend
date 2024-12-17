import AboutField from "./AboutField";
import AdditionalInformation from "./AdditionalInformation";
import CorporateBasicDetail from "./CorporateBasicDetail";
import LogoInput from "./LogoInput";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

function CorporateRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
   
    firstName: "",
    lastName: "",
    email: "",
    mobile:"",
    organisation: "",
    designation: "",
    website:"",
    country:"",
    aboutus:"",
    noofemployees:"",
    gst:"",
    turnover:"",
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
    turnover:"",
    natureofindustry:"",
    classifiedindustry:"",
    subsector:"",
    specialization:"",
    logo: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // New state for phone verification
  const [isAddressFilled, setIsAddressFilled] = useState(false); // New state for address verification
// State to store address data
const [addressData, setAddressData] = useState([]);

// Callback function to receive address data from AddressManager
const handleAddressDataChange = (addresses) => {
  setAddressData(addresses);
  console.log("Updated Address Data in Parent:", addresses);
};
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[0-9A-Z]{1}$/;
  const [gstsuccessMessage, setGstsuccessMessage] = useState(false);

  const handleChange = (e) => {
    if (!e.target) return; // Make sure e.target exists
    const { name, value } = e.target;
    
    // Update form data dynamically
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Update errors dynamically
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
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

    if(name==="noofemployees"){
      if (!value.trim()) {
      
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          noofemployees: "No of employees is required.",
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
    errors.turnover = "Turn Over Organization is required.";
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

useEffect(() => {
  // Retrieve the token and form data from localStorage
  const token = localStorage.getItem('access_token');
  const formData = JSON.parse(localStorage.getItem('form_data'));

  if (token) {
    setToken(token);
  }
  if (formData) {
    setUserData(formData);
  }
}, []);




// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare data for submission, extracting only the stateId and districtId
  const dataToSubmit = addressData.map((address) => ({
    state: address.stateId,        // Use stateId instead of state name
    district: address.districtId,  // Use districtId instead of district name
    pincode: address.pincode,      // Submit pincode if required
    address: address.address,      // Submit address if required
    tag: address.tag,
  }));

  console.log("Submitting Data:", dataToSubmit);
// Update the submittedData array by adding new data
setAddressData(prevData => {
  const updatedData = [...prevData, dataToSubmit];

  // Log the format of the updated array
  console.log("Updated Submitted Data Array:", updatedData);
  // Return the updated array to update the state
  return updatedData;
});

const payload = {
  name: `${formData.firstName} ${formData.lastName}`,
  email: formData.email,
  mobile: formData.mobile,
  organization_name: formData.organisation, 
  designation: formData.designation,
  country_id: formData.country,               // Fixed to map correctly to 'country' field
  website: formData.website,                  // Fixed to map correctly to 'website' field
  about_us: formData.aboutus,                 // Correct mapping for 'about_us'
  gst: formData.gst,                          // Correct mapping for 'gst'
  no_of_employee: formData.noofemployees,     // Corrected from duplicated 'designation'
  turnover: formData.turnover,                // Correct mapping for 'turnover'
  classfication_industry_id:formData.classifiedindustry,
  specialisation:formData.specialization,
  tags:formData.turnover,
  nature_industry:formData.turnover,
  company_logo:formData.turnover,

 // Add updated address data here
  address:  addressData.map((address) => ({
    state: address.stateId,        // Use stateId instead of state name
    district: address.districtId,  // Use districtId instead of district name
    pincode: address.pincode,      // Submit pincode if required
    address: address.address,      // Submit address if required
    tag: address.tag,
  })),
};

console.log("form datata",payload)

  const token = localStorage.getItem("access_token");
console.log("check token",token);
  if (!isEmailVerified) {
    toast.error("Please verify your email OTP.");
    return;
  }
  if (!isPhoneVerified) {
    toast.error("Please verify your phone OTP.");
    return;
  }
  if (!isAddressFilled) {
    toast.error("Please fill all Address fields.");
    return;
  }

  if (!validateForm()) {
    try {

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        mobile: formData.phone,
        organization_name: formData.organisation, 
        designation: formData.designation,
        country_id: formData.country,               // Fixed to map correctly to 'country' field
        website: formData.website,                  // Fixed to map correctly to 'website' field
        about_us: formData.aboutus,                 // Correct mapping for 'about_us'
        gst: formData.gst,                          // Correct mapping for 'gst'
        no_of_employee: formData.noofemployees,     // Corrected from duplicated 'designation'
        turnover: formData.turnover,                // Correct mapping for 'turnover'
       // Add updated address data here
        address: dataToSubmit, 
      };
      console.log("form datata",payload)

      const token = localStorage.getItem("access_token");
       alert(token);
      // if (!token) {
      //   toast.error("Session expired. Please log in again.");
      //   navigate("/corporate-login"); // Redirect user to login page if token is missing
      //   return;
      // }

      // Use the environment variable for the API URL
      const apiUrl = process.env.REACT_APP_CORPORATE_COMPLETE_REGISTER_API;
      console.log("post complete register url",apiUrl );
      console.log("Authorization token:", token);
      const params = new URLSearchParams(payload).toString();
      const fullUrl = `${apiUrl}?${params}`;

      console.log("Full URL for form submission:", fullUrl);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  // Submit form data via axios POST request
  const response = await axios.post(apiUrl, payload, { headers });

      if (response.status === 200) {
        toast.success("Form submitted successfully!");

        setFormData({
          firstName: "",
    lastName: "",
    email: "",
    phone:"",
    organisation: "",
    designation: "",
    website:"",
    country:"",
    aboutus:"",
    noofemployees:"",
    gst:"",
    turnover:"",
    natureofindustry:"",
    classifiedindustry:"",
    subsector:"",
    specialization:"",
    logo: "",
        });
        navigate("/corporate-dashboard"); 
      }
    } catch (error) {
      toast.error("There was an error submitting the form. Please try again.");
      console.error("Form submission error:", error);
    }
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
                  isAddressFilled={isAddressFilled}
                  setIsAddressFilled={setIsAddressFilled}
                  onAddressChange={handleAddressDataChange}
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
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
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
