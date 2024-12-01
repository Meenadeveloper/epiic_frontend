
function AdditionalInformation() {
  return (
    <>
      <div className="corporate-basic-box">
        <div className="corporate-heading">
            <h2 className="corporate-head">Basic Details</h2>
        </div>
        <div className="corporate-borderless">
        <div className='register-row'>
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
                       <div className="dropdown-option-box" >
                       <ul className="dropdown-container">
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                        <li>Tamil nadu</li>
                       </ul>

                       </div>
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

       </div>
       <div className='register-full-row'>
            <label className='register-label'>Address 1*</label>
             <textarea  className="textarea-input"
                  rows="4"  placeholder='Lorem ipsum'>
                            </textarea>   
          
           </div>
        </div>
    </div>
    </>
  )
}

export default AdditionalInformation
