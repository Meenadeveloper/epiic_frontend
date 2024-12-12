import React from 'react';

function AddressShortView({ address, onView, onEdit, onDelete, addressesLength }) {
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

            <div className='address-button-box'>
 {/* Edit and View Buttons */}
 <div className='address-item'>
              <button type='button' className='save-btn edit-btn' onClick={onEdit}>
                Edit
              </button>
             
            </div>
              {/* Conditionally render Delete Button */}
              {addressesLength > 1 && (
                <div className='address-item'>
                  <button type='button' className='save-btn delete-btn' onClick={onDelete}>
                    Delete
                  </button>
                </div>
              )}

            <div className='address-item'>
              <i
                className="material-icons dropdown-icon"
                onClick={onView}  // Call the onView handler when clicked
              >
                arrow_drop_down
              </i>
            </div>
            </div>
           


          </div>
        </div>
      </div>
    </>
  );
}

export default AddressShortView;
