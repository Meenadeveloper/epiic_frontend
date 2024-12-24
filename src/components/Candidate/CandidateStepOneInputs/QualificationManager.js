import React from "react";
import { useFormContext } from "../CandidateQualificationRegForm"; // Adjust the import path as necessary
import QualificationInput from "./QualificationInput";
import PursingInput from "./PursingInput";
import CourseInput from "./CourseInput";

function QualificationManager() {
  // Access formData, formErrors, and onSelectChange from FormContext
  const { formData, formErrors, handleSelectChange } = useFormContext();

  return (
    <>
      <section className="qualification-container-box">
        <div className="register-row">
          <div className="register-col">
            {/* Qualification Input */}
            <QualificationInput
              formData={formData}
              formErrors={formErrors}
              name="qualification"
              onSelectChange={handleSelectChange} // Using handleSelectChange from context
            />
          </div>
          <div className="register-col">
            {/* Pursing Input for Type */}
            <PursingInput
              formData={formData}
              formErrors={formErrors}
              name="type"
              onSelectChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="register-row">
          <div className="register-col">
            {/* Course Input */}
            <CourseInput
              formData={formData}
              formErrors={formErrors}
              name="course"
              onSelectChange={handleSelectChange}
            />
          </div>
          <div className="register-col">
            {/* If not needed, replace or remove */}
            <PursingInput
              formData={formData}
              formErrors={formErrors}
              name="type"
              onSelectChange={handleSelectChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default QualificationManager;
