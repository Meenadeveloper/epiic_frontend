import GST from "./corporate/GST"
import NoOfEmployees from "./corporate/NoOfEmployees"
import TurnOverOrganization from "./corporate/TurnOverOrganization"

function AdditionalInformation(
  {
    formData,
    formErrors,
    handleChange,
    gstsuccessMessage

  }
) {
  return (
    <>
      <div className="corporate-basic-box">
        <div className="corporate-heading">
            <h2 className="corporate-head">Additional Information</h2>
        </div>
        <div className="corporate-borderless">
        <div className='register-row'>
            <div className='register-col'>
               <GST
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                gstsuccessMessage={gstsuccessMessage}
               />     
            </div>

             <div className='register-col'>
             

             <NoOfEmployees
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
             />
            </div>  

         </div>
         <div className='register-row'>
           

             <div className='register-col'>
             

              <TurnOverOrganization
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              
              />
            </div>

            <div className='register-col'>
              <div className="register-form-control">
                        <label className='register-label'>Nature of Industry</label>
                        <div className="dropdown-container">
                     <div className="search-box-container">
                     <input
                          type='text'
                          name='natureoforganisation'
                          className="register-input drodown-input"
                          placeholder='Lorem ipsum'
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
                      <label className='register-label'>Classification of Industry</label>
                      <div className="dropdown-container">
                   <div className="search-box-container">
                   <input
                        type='text'
                        name='classificationofindustry'
                        className="register-input drodown-input"
                        placeholder='Lorem ipsum'
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
                      <label className='register-label'>Classification of Industry</label>
                      <div className="dropdown-container">
                   <div className="search-box-container">
                   <input
                        type='text'
                        name='classificationofindustry'
                        className="register-input drodown-input"
                        placeholder='Lorem ipsum'
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
            <label className='register-label'>Tags (optional)</label>
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
