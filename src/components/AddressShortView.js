import React from 'react';

function AddressShortView({ address, onView, onEdit, onDelete }) {
  return (
    <>
      <div className='address-saved-box'>
        <div className='corporate-border'>
          <div className='address-content'>
            <div className='address-item'>
              <p className='address-data'>{address.tag}</p>
              <p className='address-data'>{address.selectedDistrictName}</p>
              <p className='address-data'>{address.selectedStateName}</p>
            </div>

            {/* Edit and View Buttons */}
            <div className='address-item'>
              <button type='button' className='save-btn' onClick={onEdit}>
                Edit
              </button>
              <i
                className="material-icons dropdown-icon"
                onClick={onView}  // Call the onView handler when clicked
              >
                arrow_drop_down
              </i>
            </div>

            {/* Delete Button */}
            <div className='address-item'>
              <button type='button' className='save-btn' onClick={onDelete}>
                Delete
              </button>
              <i className="material-icons dropdown-icon">
                arrow_drop_down
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressShortView;
