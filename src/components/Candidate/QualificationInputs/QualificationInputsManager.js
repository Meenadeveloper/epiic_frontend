import CandidateCourse from "./CandidateCourse"
import CandidatePursingInput from "./CandidatePursingInput"
import CandidateSpecialityInput from "./CandidateSpecialityInput"
import CandidateState from "./CandidateState"
import CGPAInput from "./CGPAInput"
import HighestQualificationInput from "./HighestQualificationInput"
import ImportantQualificationInput from "./ImportantQualificationInput"
import PassedOutYearInput from "./PassedOutYearInput"
import QualificationInput from "./QualificationInput"

function QualificationInputsManager() {
  return (
    <>
                     <section className="qualification-container-box">
                        <div className="register-row">
                          <div className="register-col">
                            <QualificationInput/>
                          </div>
                          <div className="register-col">
                            <CandidatePursingInput
                                name="type"
                            />
                          </div>
                        </div>

                        <div className="register-row">
                          <div className="register-col">
                            <CandidateCourse
                            />
                          </div>
                          <div className="register-col">
                            <CandidateSpecialityInput />
                          </div>
                        </div>

                        <div className="register-row">
                          <div className="register-col">
                           <PassedOutYearInput/>
                          </div>
                          <div className="register-col">
                            <HighestQualificationInput
                              name="highest_quailfication"
                            />
                          </div>
                        </div>

                        <div className="register-row">
                          <div className="register-col">
                           <CGPAInput
                            name="cgpa"
                           />
                          </div>
                          <div className="register-col">
                            <ImportantQualificationInput
                              name="important_quailfication"
                            />
                          </div>
                        </div>
                        
                        <div className="border-box">
                        <div className="register-label" style={{paddingLeft:'35px'}}>Details of the College / University and Course Details </div>
                        <div className="register-row">
                          <div className="register-col">
                           <CandidateState/>
                          </div>
                          <div className="register-col">
                           
                          </div>
                        </div>
                        

                        </div>

                      </section>
    </>
  )
}

export default QualificationInputsManager