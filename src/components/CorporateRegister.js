import AboutField from "./AboutField";
import AdditionalInformation from "./AdditionalInformation";
import CorporateBasicDetail from "./CorporateBasicDetail";
import LogoInput from "./LogoInput";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import CreatableTags from "./corporate/CreatableTags";

 function CorporateRegister() {
  const navigate = useNavigate();
  const token123 = localStorage.getItem('access_token');
const fullUrl = process.env.REACT_APP_CORPORATE_PROFILE; // Ensure your .env file has the correct URL
const headers = {
  Authorization: `Bearer ${token123}`,
  "Content-Type": "application/json",
};

// Initialize formData with useState
const [formData, setFormData] = useState({
  firstName: "", // Default value
  lastName: "",
  email: "",
  mobile: "",
  organisation: "",
  designation: "",
  website: "",
  countryName: "",
  countryId:"",
  aboutus: "",
  noofemployees: "",
  noofemployeesId:"",
  gst: "",
  turnover: "",
  natureofindustry: "",
  natureofindustryId:"",
  classfication_industry_id: "",
  subsector:"",
  subsectorId: "",
  specialization: "",
  specializationId:"",
  tags:"",
  logo: null, // To store the file in formData
});
const [userEmail, setUserEmail] = useState(null); // State for userEmail
const [userMobile, setUserMobile] = useState(null);

useEffect(() => {
  // API call to prefill the form data
  axios.get(fullUrl, { headers })
    .then((response) => {
      if (response.status === 200) {
        console.log("Response", response.data);
        // Assuming response.data.user contains the form values
        const userData = response.data.user.corporate;
        setFormData(prevState => ({
          ...prevState,
          firstName: userData.name || "", // Prefill with API data or default value
          organisation:userData.organization_name || "",
          designation:userData.designation || "",
          email:userData.email || "",
          mobile:userData.mobile_no || "",
          
          // Add other form fields if needed
        }));

          // Update userEmail state
          setUserEmail(userData.email); // Set the email in state
           // Try to access the mobile number
           setUserMobile(userData.mobile_no);
       
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      toast.error("Failed to prefill form data.");
    });
  }, []);



  const [formErrors, setFormErrors] = useState({
   firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    designation: "",
    website:"",
    countryName:"",
    aboutus:"",
    noofemployees:"",
    gst:"",
    turnover:"",
    natureofindustry:"",
    natureofindustryId:"",
    classfication_industry_id:"",
    subsector:"",
    specialization:"",
    logo: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // New state for phone verification
  const [isAddressFilled, setIsAddressFilled] = useState(false); // New state for address verification
  const[ispreFilledEmail, setIsprefilledEmail] = useState(false);
 
  useEffect(() => {
    if (userEmail !== null) {
      setIsprefilledEmail(true);
      console.log('Updated userEmail state:', userEmail);
    }
  }, []); // Runs every time userEmail changes
  
  useEffect(() => {
    if (userMobile !== null) {
      console.log('Updated userMobile state:', userMobile);
    }
  }, []); // This will run whenever userMobile changes



// State to store address data
const [addressData, setAddressData] = useState([]);

// Callback function to receive address data from AddressManager
const handleAddressDataChange = (addresses) => {
  setAddressData(addresses);
  console.log("Updated Address Data in Parent:", addresses);
};
 

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
 const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');

  const handleCountrySelect = (countryId, countryName) => {
    setSelectedCountryId(countryId);
    setSelectedCountryName(countryName);

     // Log the selected country details
  console.log('Selected parent Country ID:', countryId);
  console.log('Selected parent Country Name:', countryName);
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
  if (!formData.website) {
    errors.website = "Website is required.";
    isValid = false;
  }
  if (!formData.classfication_industry_id) {
    errors.country = "Country is required.";
    isValid = false;
  }
  if (!formData.aboutus.trim()) {
    errors.aboutus = "About us is required.";
    isValid = false;
  }
  if (!formData.noofemployees) {
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
  if (!formData.turnover) {
    errors.turnover = "Turn Over Organization is required.";
    isValid = false;
  }
  if (!formData.natureofindustry) {
    errors.natureofindustry = "Nature of Industry is required.";
    isValid = false;
  }
  if (!formData.classifiedindustry) {
    errors.classifiedindustry = "Classified Industry is required.";
    isValid = false;
  }

  if (!formData.subsector) {
    errors.subsector = "Sub sector is required.";
    isValid = false;
  }
  if (!formData.specialization) {
    errors.specialization = "Specialization is required.";
    isValid = false;
  }
 
  if (!formData.logo) {
    errors.logo = "Logo is required.";
    isValid = false;
  }

  // If there are any errors, set them
  setFormErrors(errors);
  console.log("errors",errors);
  return isValid;
};

// useEffect(() => {
//   // Retrieve the token and form data from localStorage
//   const token = localStorage.getItem('access_token');
//   //const formData = JSON.parse(localStorage.getItem('form_data'));
//   if (token) {
//     setToken(token);
//   }
// }, []);

// Function to update only the email field
const updateEmailInParent = (newEmail) => {
  setFormData((formData) => ({
    ...formData,
    email: newEmail, // Update only the email field
  }));
   // Log the new email value to check if it is passed correctly
   console.log('Updated email in parent:', newEmail);
};

// Function to update only the email field
const updatePhoneInParent = (newPhone) => {
  setFormData((formData) => ({
    ...formData,
    mobile: newPhone, // Update only the phone field
  }));
   // Log the new phone value to check if it is passed correctly
   console.log('Updated phone in parent:', newPhone);
};


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

  const dataArraySubmit = addressData.reduce((acc, address, index) => {
    acc[`address[${index}]`] = {
      state: address.stateId,        // Use stateId instead of state name
      district: address.districtId,  // Use districtId instead of district name
      pincode: address.pincode,      // Submit pincode if required
      address: address.address,      // Submit address if required
      tag: address.tag,
    };
    return acc;
  }, {});

  // console.log("Submitting Data:", dataToSubmit);
// Update the submittedData array by adding new data
setAddressData(prevData => {
  const updatedData = [...prevData, dataToSubmit];

  // Log the format of the updated array
  // console.log("Updated Submitted Data Array:", updatedData);
  // Return the updated array to update the state
  return updatedData;
});

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

  if (validateForm()) {
    try {
      const nature_industry = formData.natureofindustryId
      ? Object.assign(
          {}, 
          formData.natureofindustryId.split(',').map(Number).reduce((acc, val, index) => {
            acc[`nature_industry[${index}]`] = val;
            return acc;
          }, {})
        )
      : {};

      // selected values convert to  array format
      const subsector = formData.subsectorId
      ? Object.assign(
          {}, 
          formData.subsectorId.split(',').map(Number).reduce((acc, val, index) => {
            acc[`subsector[${index}]`] = val;
            return acc;
          }, {})
        )
      : {};

      // selected values convert to  array format
      const specialisation = formData.specializationId
      ? Object.assign(
          {}, 
          formData.specializationId.split(',').map(Number).reduce((acc, val, index) => {
            acc[`specialisation[${index}]`] = val;
            return acc;
          }, {})
        )
      : {};

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        mobile: formData.mobile,
        organization_name: formData.organisation, 
        designation: formData.designation,
        countryName:selectedCountryName,      
        country_id:selectedCountryId,   
        website:formData.website,             // Fixed to map correctly to 'country' field
        about_us: formData.aboutus,                 // Correct mapping for 'about_us'
  gst: formData.gst,                          // Correct mapping for 'gst'
  no_of_employee: formData.noofemployeesId,     // Corrected from duplicated 'designation'
  turnover: formData.turnover,                // Correct mapping for 'turnover'
  classfication_industry_id:formData.classfication_industry_id,
  specialisation:formData.specializationId,
  tags:formData.tags,
  company_logo:formData.logo,
  subsectorId:formData.subsectorId,
  subsector:formData.subsectorId,
       // Add updated address data here
        ...dataArraySubmit, 
        ...nature_industry,
        ...subsector,
        ...specialisation,
      };
      console.log("form datata",payload)

      const token = localStorage.getItem("access_token");
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

const handleTagsChange = (tags) => {
  setFormData((prev) => ({
    ...prev,
    tags // Update the form data with the new comma-separated tags string
  }));
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
                  setEmailInParent={updateEmailInParent} // Pass the function to the child
                  setPhoneInParent={updatePhoneInParent}// Pass the function to the child
                  useremail = {userEmail}
                  userMobile={userMobile}
                  setIsprefilledEmail={setIsprefilledEmail}
                        onCountrySelect={handleCountrySelect}
                        selectedCountryName={selectedCountryName}
                        selectedCountryId={selectedCountryId}
                       
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
                    handleTagsChange={handleTagsChange}
                    />
                  
                    <LogoInput
                    formData={formData}
                    formErrors={formErrors}
                    handleChange={handleChange}
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
