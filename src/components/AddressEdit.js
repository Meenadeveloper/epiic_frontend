import React from 'react'

function AddressEdit() {
  return (
    <>
       <div className='address-view-box'>
         <div className='corporate-border'>
         <div className='register-full-row'>
         <label className='register-label'>Address 2*</label>
                        <input
                          type='text'
                          name='pincode'
                          className="register-input address-input"
                          placeholder='Enter Address'
                          value="No 3 , 1 street, west mambalam, chennai-33"
                        />   
          
           </div>

           <div className='register-row'>
            <div className='register-col'>
               <div className="register-form-control">
                     <label className='register-label'>Select State</label>
                     <div className="dropdown-container">
                     <div className="search-box-container">
                     <input
                          type='text'
                          name='state'
                          className="register-input drodown-input"
                          placeholder='Search'
                        />
                        <i className="material-icons search-icon">search</i>
                        <i
              className="material-icons dropdown-icon" >
              arrow_drop_down
            </i>
                       </div>
                       {/* dropdown options */}
                       {/* <div className="dropdown-option-box" >
                       <ul className="dropdown-container">
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                       </ul>

                       </div> */}
                       </div>
                        
                        <p className='error'></p>
                </div>     
            </div>

             <div className='register-col'>
              <div className="register-form-control">
                        <label className='register-label'>District</label>
                        <div className="dropdown-container">
                     <div className="search-box-container">
                     <input
                          type='text'
                          name='district'
                          className="register-input drodown-input"
                          placeholder='Search'
                        />
                        <i className="material-icons search-icon">search</i>
                        <i
              className="material-icons dropdown-icon" >
              arrow_drop_down
            </i>
                       </div>
                       {/* dropdown options */}
                       {/* <div className="dropdown-option-box" >
                       <ul className="dropdown-container">
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                       </ul>

                       </div> */}
                       </div>
                        <p className='error'></p>
              </div>
            </div>  

         </div>

         <div className='register-row'>
         <div className='register-col'>
              <div className="register-form-control">
                        <label className='register-label'>Tags</label>
                        <div className="dropdown-container">
                     <div className="search-box-container">
                     <input
                          type='text'
                          name='tags'
                          className="register-input drodown-input"
                          placeholder='Search'
                        />
                        <i className="material-icons search-icon">search</i>
                        <i
              className="material-icons dropdown-icon" >
              arrow_drop_down
            </i>
                       </div>
                       {/* dropdown options */}
                       {/* <div className="dropdown-option-box" >
                       <ul className="dropdown-container">
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                       </ul>

                       </div> */}
                       </div>
                        <p className='error'></p>
              </div>
            </div>
            <div className='register-col'>
               <div className="register-form-control">
                     <label className='register-label'>Pin code</label>
                        <input
                          type='text'
                          name='pincode'
                          className="register-input"
                          placeholder='Enter Name'
                        />
                        <p className='error'></p>
                </div>     
            </div>  

         </div>
         <div className='d-center'>
         <button type="button" class="save-btn">Save</button>
         </div>
         </div>
       
        </div>
    </>
  )
}

export default AddressEdit
