
function AddressView({ address }) {
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
                        <p>{address.address1}</p>
                        </div> 
               </div>

               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>State  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>{address.state}</p>
                        </div> 
               </div>
               <div className='address-view-item'>
                   <div className='address-view-data'>
                        <span>District  :</span>
                        </div>
                        <div className='address-view-data'>
                        <p>{address.district}</p>
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
                        <p>{address.tags}</p>
                        </div> 
               </div>
            </div>
        </div>
       </div>

            
    </>
  )
}

export default AddressView
