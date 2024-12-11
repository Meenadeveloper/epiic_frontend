import React, { useState, useRef, useEffect } from "react";
import AddressField from "./AddressField";
import AddressShortView from "./AddressShortView";
import AddressView from "./AddressView";
import AddressEdit from "./AddressEdit";

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]); // List of all addresses
  const [isAdding, setIsAdding] = useState(true); // Initially display AddressField
  const [viewIndex, setViewIndex] = useState(null); // Tracks the index of the address being viewed
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the address being edited

  // Refs to detect outside clicks
  const fieldRef = useRef(null);
  const viewRef = useRef(null);
  const editRef = useRef(null);

  // Handle outside click
  const handleClickOutside = (event) => {
    if (
      fieldRef.current &&
      !fieldRef.current.contains(event.target) &&
      isAdding
    ) {
      setIsAdding(false);
    }
    if (
      viewRef.current &&
      !viewRef.current.contains(event.target) &&
      viewIndex !== null
    ) {
      setViewIndex(null);
    }
    if (
      editRef.current &&
      !editRef.current.contains(event.target) &&
      editIndex !== null
    ) {
      setEditIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding, viewIndex, editIndex]);

  // Save a new address
  const handleSave = (address) => {
    // Your logic to save the address
    setAddresses([...addresses, address]);
    setIsAdding(false);
  };
  const handleAddressSave = (address) => {
    console.log("Address saved:", address);
    // You can add the logic to save the address here
    setAddresses([...addresses, address]);
    setIsAdding(false);
  };

  // View a specific address
  const handleView = (index) => {
    setViewIndex(index);
    setEditIndex(null);
  };

  // Edit a specific address
  const handleEdit = (index) => {
    setEditIndex(index);
    setViewIndex(null);
  };

  // Update an address after editing
  const handleUpdate = (updatedAddress, index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = updatedAddress;
    setAddresses(updatedAddresses);
    setEditIndex(null);
  };

  // Add more addresses
  const handleAddMore = () => {
    setIsAdding(true);
    setViewIndex(null);
    setEditIndex(null);
  };

  // Delete an address
  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    setViewIndex(null);
    setEditIndex(null);
  };

  return (
    <div>
      {isAdding ? (
        <div ref={fieldRef}>
        <AddressField addressSave={handleAddressSave} />

        </div>
      ) : editIndex !== null ? (
        <div ref={editRef}>
          <AddressEdit
            address={addresses[editIndex]}
            onUpdate={(updatedAddress) => handleUpdate(updatedAddress, editIndex)}
          />
        </div>
      ) : viewIndex !== null ? (
        <div ref={viewRef}>
          <AddressView address={addresses[viewIndex]} />
        </div>
      ) : (
        <>
          {addresses.map((address, index) => (
            <AddressShortView
              key={index}
              address={address}
              onView={() => handleView(index)}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
          <div className='d-center'>
            <button className='save-btn' onClick={handleAddMore}>
              <i className="material-icons">add</i> <p>Add New</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressManager;
