import React, { useState } from "react";

function AddressField({ onSave }) {
 // Using an array to store the address fields
 const [address, setAddress] = useState([{
  address1: "",
  state: "",
  district: "",
  pincode: "",
  tags: "",
}]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setAddress((prevAddress) => ({
    ...prevAddress,
    [name]: value,
  }));
};

const handleSave = () => {
  // Your save logic here, such as passing data to a parent component or saving it in state
  onSave(address); // Pass the address data back to the parent component
};


 
  return (
    <>
        <div className="corporate-border">
          <div className='register-full-row'>
            <label className='register-label'>Address 1*</label>
            <textarea
  className="textarea-input"
  rows="3"
  placeholder="Lorem ipsum"
  name="address1"
  value={address.address1}
  onChange={handleChange}
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
                          
                        
                    className="register-input drodown-input"
                    placeholder="Search"
                    name="state"
          value={address.state}
          onChange={handleChange}
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
                         
                    className="register-input drodown-input"
                    placeholder="Search"
                    name="district"
          value={address.district}
          onChange={handleChange}
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
                     <label className='register-label'>Pin code</label>
                        <input
                          type='text'
                className="register-input"
                placeholder="Enter Pin code"
                name="pincode"
          value={address.pincode}
          onChange={handleChange}
                        />
                        <p className='error'></p>
                </div>     
            </div>

             <div className='register-col'>
              <div className="register-form-control">
                        <label className='register-label'>Tags</label>
                        <div className="dropdown-container">
                     <div className="search-box-container">
                     <input
                          type='text'
                    className="register-input drodown-input"
                    placeholder="Search"
                    name="tags"
          value={address.tags}
          onChange={handleChange}
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
         <div className='d-center'>
         <button type="button" class="save-btn" onClick={handleSave}>Save</button>
         </div>
        </div>

       
      
    </>
  )
}

export default AddressField
