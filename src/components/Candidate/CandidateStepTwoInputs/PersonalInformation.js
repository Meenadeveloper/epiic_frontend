import CandidateNativeState from "./CandidateNativeState"

function PersonalInformation({
    formData,
    formErrors,
    onStateSelect,
    selectedStateName,
    selectedStateId,
   
}) {
  return (
    <>
         <div className='reg-form-content-box reg-form-content-two'>
                  <div className='register-row-three'>
                     <div className='register-col-three'>
                             <CandidateNativeState
                                 formData={formData}  // Passing formData to the child
                      formErrors={formErrors}  // Passing formErrors to the child
                      onStateSelect={onStateSelect}  // Passing the callback function
                      selectedStateName={selectedStateName}  // Passing the selected state name (edit mode)
                      selectedStateId={selectedStateId}  // Passing the selected state ID (edit mode)
                      name="state_name"  // Name for the hidden input
                             /> 
                      </div>
                       </div>
                  </div>
    </>
  )
}

export default PersonalInformation