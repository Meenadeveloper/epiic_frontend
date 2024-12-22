import QualificationInput from "./QualificationInput"
import PursingInput from "./PursingInput"

function QualificationManager({
    formData,
    formErrors,
    handleChange,
}) {
  return (
    <>
      
     <section className="qualification-container-box">
     <div className='register-row'>
        <div className='register-col'>
              <QualificationInput
                formData={formData}
                formErrors={formErrors}
                name="qualification"
                handleChange={handleChange}
              />
         </div>
         <div className='register-col'>
             <PursingInput
              formData={formData}
              formErrors={formErrors}
              name="type"
              handleChange={handleChange}
             />
         </div>
      </div>                 
     </section>
    </>
  )
}

export default QualificationManager
