import { ReactComponent as Corporate } from '../assets/images/corporate.svg';
import { ReactComponent as Candidate } from '../assets/images/candidate.svg';

import { ReactComponent as College } from '../assets/images/college.svg';

import { ReactComponent as Speaker } from '../assets/images/speaker.svg';

const EpiicUsers = () => {

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
       <button className="epiic-users-login-button" > Login </button> 
        <button className="epiic-users-register-button " > Register </button> 

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
        <button className="epiic-users-register-button " > Register </button> 

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
