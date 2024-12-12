
function AddressView({ address , addressesLength }) {
  return (
    <>
      <div className='address-view-box'>
        <div className='corporate-border'>
            <div className='address-view-content'>
               <div className='address-view-item'>
                       <div className='address-view-data'>
                        <span>{`Address ${addressesLength}*     :`}</span> 
                        </div>
                        <div className='address-view-data'>
                        <p className="address-text">{address.corporateText }</p>
                        </div> 
               </div>

               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>State  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>{address.selectedStateName}</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>District  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>{address.selectedDistrictName}</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>Pin code  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>{address.pincode}</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>Tags  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>{address.tag}</p>
                        </div> 
               </div>
            </div>
        </div>
       </div>

            
    </>
  )
}

export default AddressView
