import React, { useState } from "react";
import AddressField from "./AddressField";
import AddressShortView from "./AddressShortView";
import AddressView from './AddressView';

const AddressManager = () => {
  const [addresses, setAddresses] = useState([{ id: 0, tags: "", district: "", state: "", saved: false }]);
  const [viewVisibleIndex, setViewVisibleIndex] = useState(null); // State to track which address is currently viewed

  const handleAddMore = () => {
    setAddresses([...addresses, { id: addresses.length, tags: "", district: "", state: "", saved: false }]);
  };

  const handleAddressSave = (index, addressData) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, ...addressData, saved: true } : address
    );
    setAddresses(updatedAddresses);
    console.log("Saved Address:", addressData);
  };

  const handleEdit = (index) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, saved: false } : address
    );
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
              />
              {viewVisibleIndex === index && <AddressView address={address} />} {/* Show AddressView if selected */}
            </div>
          ) : (
            <AddressField
              index={index}
              address={address} // Pass current address to pre-fill form
              onSave={(addressData) => handleAddressSave(index, addressData)}
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
