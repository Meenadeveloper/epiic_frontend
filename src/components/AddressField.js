import React, { useState } from 'react';
import CorporateTextInput from './corporate/CorporateTextInput';
import DestrictInput from './corporate/DestrictInput';
import StateInput from './corporate/StateInput';

function AddressField({ addressSave }) {
  const [address, setAddress] = useState({
    address1: '',
    state: '',
    district: '',
    pincode: '',
    tags: '',
  });

  
  const [errors, setErrors] = useState({});

  // Pincode pattern (e.g., 6 digits)
  const pincodePattern = /^[0-9]{6}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value, // Update the specific field in the address object
    }));
  };

  const handleValidation = () => {
    let newErrors = {};

    // Required field validation
    if (!address.address1) newErrors.address1 = 'Address Line 1 is required';
    if (!address.state) newErrors.state = 'State is required';
    if (!address.district) newErrors.district = 'District is required';

    // Pincode validation
    if (!pincodePattern.test(address.pincode)) {
      newErrors.pincode = 'Pincode must be a 6-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = () => {
    if (handleValidation()) {
      if (typeof addressSave === "function") {
        addressSave(address); // Ensure addressSave is a function before calling
      } else {
        console.error("addressSave is not a valid function");
      }
    }
  };
  const [selectedState, setSelectedState] = useState(null);

  const handleStateSelect = (stateId, stateName) => {
    console.log("Parent received:", stateId, stateName);
    setSelectedState({ id: stateId, name: stateName });
  };

  return (
    <div className="corporate-border">
     
     <CorporateTextInput/>
 
              <div className='register-row'>
                    <div className='register-col'>
                    <StateInput onStateSelect={handleStateSelect} />
                     </div>

                     <div className='register-col'>
                    
                      <DestrictInput onStateSelect={handleStateSelect} />
                     </div>
                  </div>





      <button type="button" className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default AddressField;
