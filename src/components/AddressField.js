import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CorporateTextInput from './corporate/CorporateTextInput';
import DestrictInput from './corporate/DestrictInput';
import StateInput from './corporate/StateInput';
import PincodeInput from './corporate/PincodeInput';
import TagsInput from './corporate/TagsInput';

function AddressField({
   index,
   address,
    onSave , 
   addressesLength,
   isAddressFilled,
  setIsAddressFilled,
  setAddresses 
    
    }) {
  const [corporateText, setCorporateText] = useState(address.corporateText || '');
  const [pincode, setPincode] = useState(address.pincode || '');
  const [selectedTag, setSelectedTag] = useState(address.tag || '');
  const [selectedStateId, setSelectedStateId] = useState(address.stateId || '');
  const [selectedStateName, setSelectedStateName] = useState(address.stateName || '');
  const [selectedDistrictId, setSelectedDistrictId] = useState(address.districtId || '');
  const [selectedDistrictName, setSelectedDistrictName] = useState(address.districtName || '');
  const [errors, setErrors] = useState({});
  const [tagError, setTagError] = useState('');
 
  // Function to handle state selection
  const handleStateSelect = (stateId, stateName) => {
    setSelectedStateId(stateId);
    setSelectedStateName(stateName);
    
  };

  // Function to handle district selection
  const handleDistrictSelect = (districtId, districtName) => {
    setSelectedDistrictId(districtId);
    setSelectedDistrictName(districtName);
  };

  // Function to validate all fields
  const validateFields = () => {
    const newErrors = {};
    if (!corporateText) {
      newErrors.corporateText = 'Corporate text is required';
    }
    if (!selectedStateId) {
      newErrors.state = 'State is required';
    }
    if (!selectedDistrictId) {
      newErrors.district = 'District is required';
    }
    if (!pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = 'Please enter a valid Pincode';
    }
    if (!selectedTag) {
      setTagError('Tag is required.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {

    if (validateFields()) {
      onSave({
       address:corporateText,
       corporateText,
        selectedDistrictId,
        selectedDistrictName,
        selectedStateId,
        selectedStateName,
        pincode,
        tag: selectedTag,
      });
      setIsAddressFilled(true); // Update parent component state

    } else {
      toast.error('Please fill in all required fields correctly.');
    }
  };

  const handleTagSelect = (tagId, tagName) => {
    setSelectedTag(tagName);
    setTagError('');
  };

  // Populate state when address prop changes
  useEffect(() => {
    if (address) {
      setCorporateText(address.corporateText || corporateText);
      setPincode(address.pincode || pincode);
      setSelectedTag(address.tag || '');
      setSelectedStateId(address.stateId || '');
      setSelectedStateName(address.stateName || '');
      setSelectedDistrictId(address.districtId || '');
      setSelectedDistrictName(address.districtName || '');
    }
  }, [address]);

  const handleAddressUpdate = (id, field, value) => {
    setAddresses(prevAddresses => 
      prevAddresses.map(address => 
        address.id === id ? { ...address, [field]: value } : address
      )
    );
  };

  return (
    <div className="corporate-border">
      <CorporateTextInput
       label={`Address ${addressesLength}*`} // Dynamically show the length
        value={corporateText}
        onChange={setCorporateText}
        name="address"
        error={errors.corporateText}
      />
      <div className="register-row">
        <div className="register-col">
          <StateInput
             onStateSelect={(stateId, stateName) => {
    handleAddressUpdate(address.id, 'state', stateId);
    handleAddressUpdate(address.id, 'stateName', stateName);
    handleAddressUpdate(address.id, 'stateId', stateId);
  }}
            selectedStateName={selectedStateName}
           selectedStateId={selectedStateId}
            name="stateName"
            error={errors.state}
           
          />
        </div>
        <div className="register-col">
          <DestrictInput
            stateId={selectedStateId}
            onDistrictSelect={(districtId, districtName) => {
    handleAddressUpdate(address.id, 'district', districtId);
    handleAddressUpdate(address.id, 'districtName', districtName);
    handleAddressUpdate(address.id, 'districtId', districtId);
  }}
            selectedDistrictName={selectedDistrictName}
            selectedDistrictId={selectedDistrictId} // Pass the pre-selected value
            name="districtName"
            error={errors.district}
            
          />
        </div>
      </div>
      <div className="register-row">
        <div className="register-col">
          <PincodeInput
            value={pincode}
            onChange={setPincode}
            error={errors.pincode}
            name="pincode"
          />
        </div>
        <div className="register-col">
          <TagsInput
            onTagSelect={handleTagSelect}
            selectedTag={selectedTag} // Pass the pre-selected value
            error={tagError}
            clearError={() => setTagError('')}
            name="tag"
          />
        </div>
      </div>
      <div className="d-center">
        <button type="button" className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddressField;
