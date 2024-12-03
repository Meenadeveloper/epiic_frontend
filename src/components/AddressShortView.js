import React from 'react'
import AddressView from './AddressView'

function AddressShortView({ address, addNewAddress }) {
   // Ensure that address is properly defined before rendering
   if (!address) return <p>Loading...</p>; // Optionally, return a loading state when no address is available

 // Use optional chaining or default values to avoid errors if any property is missing
 const { state = "", district = "", tags = "" } = address;
  return (
    <>
      <div className='address-saved-box'>
        <div className='corporate-border'>
       
            <div className='address-content'>
                 <div className='address-item'>
                 <p className='address-data'>{tags}</p>
            <p className='address-data'>{district}</p>
            <p className='address-data'>{state}</p>
           

                 </div>
                 <div className='address-item'>
                    <button type='button' className='save-btn'>Edit</button>
                  <i
              className="material-icons dropdown-icon"  >
              arrow_drop_down
            </i>
                 </div>
            </div>
         
        </div>


        <div className='d-center'>
        <button className='save-btn' onClick={addNewAddress}><i class="material-icons">add</i> <p>Add New</p></button>
        </div>
      </div>
    </>
  )
}

export default AddressShortView
