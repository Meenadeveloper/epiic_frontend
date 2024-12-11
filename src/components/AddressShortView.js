import React from 'react'

function AddressShortView({ address, onView, onEdit, onDelete }) {
   
  return (
    <>
      <div className='address-saved-box'>
        <div className='corporate-border'>
       
            <div className='address-content'>
                 <div className='address-item'>
                 <p className='address-data'>{address.tags}</p>
            <p className='address-data'>{address.district}</p>
            <p className='address-data'>{address.state}</p>
           

                 </div>
                 <div className='address-item'>
                    <button type='button' className='save-btn' onClick={onEdit}>Edit</button>
                  <i
              className="material-icons dropdown-icon"   onClick={onView}>
              arrow_drop_down
            </i>
                 </div>

                 <div className='address-item'>
                    <button type='button' className='save-btn' onClick={onDelete}>Delete</button>
                  <i
              className="material-icons dropdown-icon"  >
              arrow_drop_down
            </i>
                 </div>
            </div>
         
        </div>


       
      </div>
    </>
  )
}

export default AddressShortView
