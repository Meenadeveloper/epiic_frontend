import QualificationInput from "./QualificationInput"
import PursingInput from "./PursingInput"
import CourseInput from "./CourseInput"

function QualificationManager({
    formData,
    formErrors,
    onSelectChange,
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
                onSelectChange={onSelectChange}
              />
         </div>
         <div className='register-col'>
             <PursingInput
              formData={formData}
              formErrors={formErrors}
              name="type"
              onSelectChange={onSelectChange}
             />
         </div>
      </div>

       <div className='register-row'>
        <div className='register-col'>
              <CourseInput
                formData={formData}
                formErrors={formErrors}
                name="course"
                onSelectChange={onSelectChange}
              />
         </div>
         <div className='register-col'>
             <PursingInput
              formData={formData}
              formErrors={formErrors}
              name="type"
              onSelectChange={onSelectChange}
             />
         </div>
      </div>                 
     </section>
    </>
  )
}

export default QualificationManager
