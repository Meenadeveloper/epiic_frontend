import React, { useState } from "react";

function AddressEdit({ address, onUpdate }) {
  const [editableAddress, setEditableAddress] = useState({ ...address });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableAddress({ ...editableAddress, [name]: value });
  };

  const handleUpdate = () => {
    if (
      editableAddress.address1 &&
      editableAddress.state &&
      editableAddress.district &&
      editableAddress.pincode
    ) {
      onUpdate(editableAddress);
    }
  };

  return (
    <div className="address-view-box">
      <div className="corporate-border">
        <div className="register-full-row">
          <label className="register-label">Address Line 1*</label>
          <input
            type="text"
            name="address1"
            className="register-input address-input"
            placeholder="Enter Address"
            value={editableAddress.address1}
            onChange={handleChange}
          />
        </div>

        <div className="register-row">
          <div className="register-col">
            <div className="register-form-control">
              <label className="register-label">State*</label>
              <input
                type="text"
                name="state"
                className="register-input"
                placeholder="Enter State"
                value={editableAddress.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="register-col">
            <div className="register-form-control">
              <label className="register-label">District*</label>
              <input
                type="text"
                name="district"
                className="register-input"
                placeholder="Enter District"
                value={editableAddress.district}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="register-row">
          <div className="register-col">
            <div className="register-form-control">
              <label className="register-label">Pincode*</label>
              <input
                type="text"
                name="pincode"
                className="register-input"
                placeholder="Enter Pincode"
                value={editableAddress.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="register-col">
            <div className="register-form-control">
              <label className="register-label">Tags</label>
              <input
                type="text"
                name="tags"
                className="register-input"
                placeholder="Enter Tags"
                value={editableAddress.tags}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="button" className="save-btn" onClick={handleUpdate}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddressEdit;
