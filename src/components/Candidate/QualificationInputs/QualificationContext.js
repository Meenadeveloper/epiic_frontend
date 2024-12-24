import React, { createContext, useState, useContext } from 'react';

// Creating a context
const QualificationContext = createContext();

export const useQualification = () => {
  return useContext(QualificationContext);
};

export const QualificationProvider = ({ children }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    qualification:'',
    qualificationId:'',
    type:'',
    course:'',
    courseId:'',
    specialisation:'',
    specialisationId:'',
    passout_year:'',
    highest_quailfication:'',
    cgpa:'',
    important_quailfication:'',
    state:'',
    stateId:'',
  });

 // Function to update form data dynamically
 const onHandleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,  // Dynamically update the specific field
    }));
  };

  return (
    <QualificationContext.Provider value={{ formData, onHandleChange }}>
      {children}
    </QualificationContext.Provider>
  );
};
