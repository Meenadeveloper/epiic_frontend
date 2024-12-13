import React, { useState } from "react";
import AddressField from "./AddressField";
import AddressShortView from "./AddressShortView";
import AddressView from './AddressView';

const AddressManager = ({
  isAddressFilled,
  setIsAddressFilled,
  onAddressChange
}) => {
  const [addresses, setAddresses] = useState([{ id: 0, address:"",tag: "", district: "", state: "",pincode:"", saved: false }]);
  const [viewVisibleIndex, setViewVisibleIndex] = useState(null); // State to track which address is currently viewed

  const handleAddMore = () => {
    const newAddresses = [...addresses, { id: addresses.length, address: "", tag: "", district: "", state: "", pincode: "", saved: false }];
    setAddresses(newAddresses);
    onAddressChange(newAddresses); // Update parent when addresses change
  };

  const handleAddressSave = (index, addressData) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, ...addressData, saved: true } : address
    );
     // Log the updated address data
    console.log("Updated Address:", updatedAddresses[index]);
    setAddresses(updatedAddresses);
    onAddressChange(updatedAddresses); 
    console.log("Saved Address:", addressData);
  };

  const handleEdit = (index) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, saved: false } : address
    );
    console.log("edit address",updatedAddresses);
    setAddresses(updatedAddresses);
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleViewToggle = (index) => {
    setViewVisibleIndex(viewVisibleIndex === index ? null : index); // Toggle visibility of AddressView
  };

  return (
    <>
      {addresses.map((address, index) => (
        <div key={address.id} className="address-box">
          {address.saved ? (
            <div>
              <AddressShortView
                address={address}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
                onView={() => handleViewToggle(index)}  // Toggle view on click
                addressesLength={addresses.length}  // Pass the length of the addresses array
              />
              {viewVisibleIndex === index && 
                       <AddressView 
                        address={address} 
                        addressesLength={addresses.length}
                        
                        />} {/* Show AddressView if selected */}
            </div>
          ) : (
            <AddressField
              index={index}
              address={address} // Pass current address to pre-fill form
              setAddresses={setAddresses}
              onSave={(addressData) => handleAddressSave(index, addressData)}
              addressesLength={addresses.length} // Pass the address length to AddressField
              isAddressFilled={isAddressFilled}
              setIsAddressFilled={setIsAddressFilled}
            />
          )}
        </div>
      ))}
      <div className="d-center">
        <button type="button" className="save-btn" onClick={handleAddMore}>
          <i className="material-icons">add</i>
          <p>Add New</p>
        </button>
      </div>
    </>
  );
};

export default AddressManager;
