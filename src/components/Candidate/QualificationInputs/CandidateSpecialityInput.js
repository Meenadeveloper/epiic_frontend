import React, { useState, useEffect  } from "react";
import Select from "react-select"; // Use Select instead of CreatableSelect
import { components } from "react-select";
import { ReactComponent as DownArrow } from "../../../assets/images/Sort Right.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/Search.svg";
import axios from 'axios';
import { useQualification } from './QualificationContext';  // Import context

function CandidateSpecialityInput() {
  
    const { formData, onHandleChange  } = useQualification();
    const [options, setOptions] = useState([]);  // To store options from API
    const [selectedOption, setSelectedOption] = useState(null);  // To manage selected option

    // Function to fetch data from the API using Axios
  const fetchData = async () => {
    try {
        if (formData.courseId) {
        const response = await axios.get(`${process.env.REACT_APP_CANDIDATE_BASE_URL}/get-specialisations?course_id=${formData.courseId}`);
        // Assuming the qualifications are in response.data.qualification
        const optionDatas = response.data.specialisations || [];
         // Transform qualifications into the format required by react-select
      const transformedData = optionDatas.map(optionData => ({
        value: optionData.id,  // option value is the id
        label: optionData.specialisation_name,  // option label is the department_name
      }));

      setOptions(transformedData);  // Set transformed options
    }
    }
    catch (error) {
        console.error('Error fetching API Data:', error);
      }
  }

 // Use useEffect to automatically fetch qualifications when the component mounts
 useEffect(() => {
    fetchData();
  }, [formData.courseId]);  // Empty dependency array means this runs once after the initial render

  // Handle selection change
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);  // Update selected option in state
     // Update both qualification label and qualificationId dynamically
     onHandleChange('specialisation', selectedOption ? selectedOption.label : '');
     onHandleChange('specialisationId', selectedOption ? selectedOption.value : '');
  };

  // select box style customize
  const singleSelect = {
    control: (provided) => ({
      ...provided,
      paddingLeft: "30px",
      backgroundColor: "transparent",
      border: "1px solid #000000",
      boxShadow: "none",
      borderRadius: "20px",
      height: "45px",
      fontSize: "12px",
      fontFamily: "Montserrat",
      fontWeight: 400,
      color: "#000000",
      "&:hover": {
        border: "1px solid #000000",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0px 4px 4px 0px #00000040",
      marginTop: "5px",
      maxHeight: "210px",
      // overflowY: 'auto',
      overflowY: 'hidden', // Hide the vertical scrollbar
      clipPath: 'inset(0 round 20px)',
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '20px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: '#f0f0f0',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#000000",
      fontSize: "12px",
      padding: "13px 20px",
      borderBottom: "1px solid #ECECEC",
      backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
    }),
    input: (provided) => ({
      ...provided,
      fontFamily: "Montserrat",
      color: "#000000",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: "Montserrat",
    }),
  };

  // Custom DropdownIndicator with SVG
  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <DownArrow
        width="15"
        height="15"
        fill="#000000"
        className="select-down-arrow"
      />
    </components.DropdownIndicator>
  );


  return (
    <>
  <div className="register-form-control">
        <label className="register-label">Specialization</label>
        <div style={{ position: "relative", width: "100%" }}>
          <SearchIcon
            width="15"
            height="15"
            fill="#000000"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
          <Select
            styles={singleSelect}
            components={{ DropdownIndicator }}
            placeholder="Select Specialization"
            options={options}  // Pass the transformed options to Select
            value={selectedOption}  // Set the selected value
           onChange={handleChange}  // Handle selection change
           name="specialisation"
          />
        </div>
      </div>
    </>
  )
}

export default CandidateSpecialityInput