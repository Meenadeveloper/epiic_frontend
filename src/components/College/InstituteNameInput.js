
import React, { useState, useEffect, useRef } from 'react';

function InstituteNameInput() {
   // State to track dropdown visibility
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef(null); // Reference to the dropdown container
   // Function to toggle dropdown visibility
   const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };
   
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsDropdownOpen(false); // Close dropdown if clicked outside
       }
     };
   
     // Add event listener to handle clicks outside
     useEffect(() => {
       document.addEventListener('mousedown', handleClickOutside);
   
       // Cleanup the event listener on component unmount
       return () => {
           document.removeEventListener('mousedown', handleClickOutside);
         };
       }, []);

  return (
    <>
       <div className="register-form-control ">
          <label className='register-label'>Name of the Institution</label>
                <div className="dropdown-container trasparent-dropdown-box" ref={dropdownRef}>
                   <div className="search-box-container">
                   <input
                        type='text'
                        name='insitituteName'
                        className="register-input drodown-input"
                        placeholder='Name of the Institution'
                      />
                      <i className="material-icons search-icon">search</i>
                      <i
            className="material-icons dropdown-icon" onClick={toggleDropdown}>
            arrow_drop_down
          </i>
          </div> 
                     {/* Conditionally render the dropdown options based on state */}
             {isDropdownOpen && (
            <div className="dropdown-option-box transparent-bg">
              <ul className="dropdown-container">
                <li className='b-txt'>Tamil Nadu</li>
                <li className='b-txt'>Kerala</li>
                <li className='b-txt'>Karnataka</li>
                <li className='b-txt'>Andhra Pradesh</li>
              </ul>
            </div>
             )}

                    
                     </div>             
       </div>
    </>
  )
}

export default InstituteNameInput



