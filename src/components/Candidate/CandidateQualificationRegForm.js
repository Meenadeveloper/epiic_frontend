import CandidateQualificationStep from "./CandidateQualificationStep";


function CandidateQualificationRegForm() {
  return (
    <>
         <div className='register-container'>
           <div className='custom-container'>
             <div className='register-box'>
              <div className='back-btn-box'>
              <button
                className='back-btn'
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = '/'; // Replace '/' with your fallback URL
                  }
                }}
              >
                Back
              </button>
            </div>

            <div className='register-form-container '>
              <div className=' candidate-register'>

              {/* form steps */}
               
                 <CandidateQualificationStep/>

                <div className="candidate-register-form-box">
                <div className='reg-form-content-box'>
                  <div className='register-heading'>
                  <h2>QUALIFICATION</h2>
                  </div>

                  <section className="technical-skillset-container">
                      <div className="inline-txt">
                      <label class="register-label">General Economic class of students</label>
                      <p class="heading-sub-txt">(This would help us in bringing applicable CSR opportunities to colleges)</p>
                      </div>

                      <div className="auto-fit-row">
                        <div className="auto-fit-column">
                           <div className="skill-select-box">
                              
                           </div>
                        </div>
                        <div className="auto-fit-column">
                            
                            </div>

                            <div className="auto-fit-column">
                            
                            </div>
                      </div>

                  </section>


                </div>
                </div> 
            </div>
            </div>      


           </div>
       </div>
    </div>
    </>
  )
}

export default CandidateQualificationRegForm