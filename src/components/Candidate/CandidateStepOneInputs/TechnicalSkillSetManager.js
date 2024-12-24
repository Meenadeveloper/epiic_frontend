import React, { useState } from 'react';
import SkillSetInput from "./SkillSetInput";
import TechnicalSkillBranch from "./TechnicalSkillBranch";
import TechnicalSkillSetInput from './TechnicalSkillSetInput';
function TechnicalSkillSetManager({
    formData,
    formErrors,
    handleChange,
    inputGroups,
    setInputGroups,

}) {
    const handleAddNew = () => {
        setInputGroups([...inputGroups, { technical_skill: '', skill_set: '' }]);
      };
    
      const handleDelete = (index) => {
        const updatedGroups = inputGroups.filter((_, i) => i !== index);
        setInputGroups(updatedGroups);
      };

  return (
    <>
        <section className="technical-skillset-container">
                      <div className="inline-txt">
                      <label class="register-label">Technical Skillset</label>
                      <p class="heading-sub-txt">(This would help us in bringing applicable CSR opportunities to colleges)</p>
                      </div>

                       {inputGroups.map((group, index) => (
                        <div className="auto-fit-row" key={index}>
                          <div className="auto-fit-column">
                            <div className="skill-select-box">
                              <TechnicalSkillBranch
                                formData={formData}
                                formErrors={formErrors}
                                handleChange={(e) => handleChange(e, index)}
                                name="technical_skill"
                              />
                            </div>
                          </div>

                          <div className="auto-fit-column">
                            <div className="skill-set-multiple-box">
                              {/* <SkillSetInput
                                formData={formData}
                                formErrors={formErrors}
                                handleChange={(e) => handleChange(e, index)}
                                name="skill_set"
                              /> */}

                              <TechnicalSkillSetInput
                                 formData={formData}
                                 formErrors={formErrors}
                                  handleChange={(e) => handleChange(e, index)}
                                name="skill_set"
                              />
                            </div>
                          </div>

                          <div className="auto-fit-column">

                            {/* Show "Delete" button for all groups except the last */}
                            {index < inputGroups.length - 1 && (
                              <div className="skill-delete-btn">
                              <button
                                type="button"
                                className=""
                                onClick={() => handleDelete(index)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                              </div>
                            )}
                          </div>
                      {/* Show "Add New" button only for the last group */}
                          {index === inputGroups.length - 1 && (
                          <div className="auto-fit-column">
                            <button
                              type="button"
                              className="add-new-btn"
                              onClick={handleAddNew}
                            >
                              <i className="material-icons">add</i>
                              <p>Add New</p>
                            </button>
                          </div>
                        )}
                          
                        </div>
                      ))}

                  </section>
    </>
  )
}

export default TechnicalSkillSetManager
