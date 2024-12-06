import { ReactComponent as Corporate } from '../assets/images/corporate.svg';
import { ReactComponent as Candidate } from '../assets/images/candidate.svg';

import { ReactComponent as College } from '../assets/images/college.svg';

import { ReactComponent as Speaker } from '../assets/images/speaker.svg';
import { useNavigate } from 'react-router-dom';

const EpiicUsers = () => {
   const navigate = useNavigate();

   const handleCorporateLoginClick = () => {
      navigate('/corporate-login'); // Navigates to the /register URL
    };
  const handleCorporateRegisterClick = () => {
   navigate('/corporate-register'); // Navigates to the /register URL
 };

 const handleCollegeRegisterClick = () => {
   navigate('/college-basic-register'); // Navigates to the /register URL
 };

  return (
    <div className='custom-container'>
       <div className='epiic-users-box'>
          <div className="epiic-users-container">
              <div className='epiic-users-card-box'>
     <div className="epiic-users-card"> 
     <h3 className="epiic-users-title">CORPORATE</h3>
      <div className="epiic-users-icon">
         <Corporate/>
      </div> 
      </div>

         <div className="epiic-users-buttons"> 
       <button className="epiic-users-login-button"  onClick={handleCorporateLoginClick}> Login </button> 
        <button className="epiic-users-register-button " onClick={handleCollegeRegisterClick}> Register </button> 

         </div>
          </div>

        


          <div className='epiic-users-card-box'>
     <div className="epiic-users-card"> 
     <h3 className="epiic-users-title">COLLEGE</h3>
      <div className="epiic-users-icon">
         <College/>
      </div> 
      </div>

         <div className="epiic-users-buttons"> 
       <button className="epiic-users-login-button" > Login </button> 
        <button className="epiic-users-register-button " onClick={handleCorporateRegisterClick}> Register </button> 

         </div>
          </div>

          <div className='epiic-users-card-box'>
     <div className="epiic-users-card"> 
     <h3 className="epiic-users-title">CANDIDATE</h3>
      <div className="epiic-users-icon">
         <Candidate/>
      </div> 
      </div>

         <div className="epiic-users-buttons"> 
       <button className="epiic-users-login-button" > Login </button> 
        <button className="epiic-users-register-button " > Register </button> 

         </div>
          </div>

          <div className='epiic-users-card-box'>
     <div className="epiic-users-card"> 
     <h3 className="epiic-users-title">SPEAKER</h3>
      <div className="epiic-users-icon">
         <Speaker/>
      </div> 
      </div>

         <div className="epiic-users-buttons"> 
       <button className="epiic-users-login-button" > Login </button> 
        <button className="epiic-users-register-button " > Register </button> 

         </div>
          </div>

    </div>
     </div>
     
    </div>
    
  );
};

export default EpiicUsers;
