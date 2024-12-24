import React, { useState} from "react";
import { toast } from "react-toastify";
import CandidateQualificationStep from "./CandidateQualificationStep";
import QualificationInputsManager from "./QualificationInputs/QualificationInputsManager";
import {  useQualification } from "./QualificationInputs/QualificationContext"; 

function CandidateQualificationForm() {
  const [formErrors, setFormErrors] = useState({});
  const { formData } = useQualification();  // Access context data here, inside handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        // Include formData in the payload
        qualifications: formData.qualificationId,
        qualificationName:formData.qualification,
        type:formData.type,
        course:formData.courseId,
        courseName:formData.course,
        specialisation:formData.specialisation,
        specialisationId:formData.specialisationId,
        passout_year:formData.passout_year,
        highest_quailfication:formData.highest_quailfication,
        cgpa:formData.cgpa,
        important_quailfication:formData.important_quailfication,


      };
      // Log the payload for debugging
      console.log("Submitted Form data", payload);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again later.",
        {
          position: "top-right",
          className: "toast-error",
        }
      );
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="custom-container">
          <div className="register-box">
            <div className="back-btn-box">
              <button
                className="back-btn"
                onClick={() => window.history.back()}
              >
                Back
              </button>
            </div>
            <div className="register-form-container">
              <div className="candidate-register">
                <CandidateQualificationStep />
                <div className="candidate-register-form-box">
                  <div className="reg-form-content-box">
                    <div className="register-heading">
                      <h2>QUALIFICATION</h2>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
                    {/* qualification */}
                      <QualificationInputsManager/>
                      <div className="d-center">
                        <button type="submit" className="save-btn">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateQualificationForm;
