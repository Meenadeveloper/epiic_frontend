import React from 'react'

function AddressView() {
  return (
    <>
      <div className='address-view-box'>
        <div className='corporate-border'>
            <div className='address-view-content'>
               <div className='address-view-item'>
                       <div className='address-view-data'>
                        <span>Address 1*  :</span> 
                        </div>
                        <div className='address-view-data'>
                        <p>No 3 , 1 street, west mambalam, chennai-33</p>
                        </div> 
               </div>

               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>State  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>Tamil Nadu</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>District  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>Chennai</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>Pin code  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>600039</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>Tags  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>Primary</p>
                        </div> 
               </div>
            </div>
        </div>
       </div>

       <div className='d-center'>
        <button className='save-btn'><i class="material-icons">add</i> <p>Add New</p></button>
        </div>     
    </>
  )
}

export default AddressView
