import React, { useState } from "react";
import AddressField from "./AddressField";
import AddressShortView from "./AddressShortView";

function AddressManager() {
    const [addresses, setAddresses] = useState([]); // Stores all saved addresses
    const [showForm, setShowForm] = useState(true); // Show AddressField by default
    const [newAddress, setNewAddress] = useState({}); // Stores the new address data temporarily

    const addNewAddress = () => {
        setShowForm(true); // Show the AddressField when 'Add New' button is clicked
      };

      const saveAddress = (address) => {
        setAddresses([...addresses, address]); // Save new address
        setNewAddress(address); // Store the newly added address
        setShowForm(false); // Hide the AddressField after saving
      };
 

  return (
    <div>
       {showForm ? (
        <AddressField onSave={saveAddress} />
      ) : (
        <AddressShortView addNewAddress={addNewAddress} address={newAddress} />
    )}
        
     
    </div>
  );
}

export default AddressManager;
