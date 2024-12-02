import CountryInput from "./CountryInput"
import EmailOtp from "./EmailOtp"
import PhoneOtp from "./PhoneOtp"

function CorporateBasicDetail() {
  return (
    <>
      <div className="corporate-basic-box">
        <div className="corporate-heading">
            <h2 className="corporate-head">Basic Details</h2>
        </div>
        <div className="corporate-border">
         <div className='register-row'>
            <div className='register-col'>
               <div className="register-form-control">
                     <label className='register-label'>First Name</label>
                        <input
                          type='text'
                          name='firstName'
                          className="register-input"
                          placeholder='Enter Name'
                        />
                        <p className='error'></p>
                </div>     
            </div>

             <div className='register-col'>
              <div className="register-form-control">
                        <label className='register-label'>Last Name</label>
                        <input
                          type='text'
                          name='lastName'
                          className="register-input "
                          placeholder='Enter last name'
                         
                        />
                        <p className='error'></p>
              </div>
            </div>  

         </div>

         {/* email row component */}
         <EmailOtp/>

         {/* mobile otp */}
         <PhoneOtp/>

         <div className='register-row'>
           <div className='register-col'>
           <div className="register-form-control">
                     <label className='register-label'>Organisation</label>
                        <input
                          type='text'
                          name='firstName'
                          className="register-input"
                          placeholder='Enter organisation'
                        />
                        <p className='error'></p>
                </div>
           </div>
           <div className='register-col'>
           <div className="register-form-control">
                     <label className='register-label'>Designation</label>
                        <input
                          type='text'
                          name='firstName'
                          className="register-input"
                          placeholder='Enter designation'
                        />
                        <p className='error'></p>
                </div>
           </div>
         </div>

         <div className='register-row'>
           <div className='register-col'>
           <CountryInput/>
           </div>
           <div className='register-col'>
           <div className="register-form-control">
                     <label className='register-label'>Website</label>
                        <input
                          type='text'
                          name='firstName'
                          className="register-input"
                          placeholder='Lorem ipsum'
                        />
                        <p className='error'></p>
                </div>
           </div>
         </div>
             
        </div>
      </div>
    </>
  )
}

export default CorporateBasicDetail
