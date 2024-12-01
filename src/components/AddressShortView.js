import React from 'react'

function AddressShortView() {
  return (
    <>
      <div className='address-saved-box'>
        <div className='corporate-border'>
            <div className='address-content'>
                 <div className='address-item'>
                    <p className='address-data'>Primary   </p>
                    <p className='address-data'>    Chennai    </p>

                    <p className='address-data'> Tamil Nadu</p>

                 </div>
                 <div className='address-item'>
                    <button type='button' className='save-btn'>Edit</button>
                  <i
              className="material-icons dropdown-icon" >
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
