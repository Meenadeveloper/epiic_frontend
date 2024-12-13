import GST from "./corporate/GST"
import NoOfEmployees from "./corporate/NoOfEmployees"
import TurnOverOrganization from "./corporate/TurnOverOrganization"
import NatureOfIndustry from './corporate/NatureOfIndustry';
import ClassificationOfIndustry from "./Candidate/ClassificationOfIndustry";
import SubSector from "./Candidate/SubSector";
import Specialization from "./corporate/Specialization";

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
             <NatureOfIndustry
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
             />
            </div>  

         </div>
         <div className='register-row'>
           

           <div className='register-col'>
           <ClassificationOfIndustry
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
           />
          </div>

             <div className='register-col'>
           <SubSector
            formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
           />
          </div>  

       </div>
       <div className='register-row'>
           

           <div className='register-col'>
           <Specialization
             formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}

           />
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
