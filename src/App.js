import './assets/style/header.css';
import './assets/style/footer.css';
import './assets/style/components.css';
import './assets/style/body.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './page/Home';
import CorporateLogin from './page/CorporateLogin';
import CorporateRegistrationPage from './page/CorporateRegistrationPage';
import CorporateBasicRegistrationPage from './page/CorporateBasicRegistrationPage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CandidateBasicRegistrationPage from './page/candidate/CandidateBasicRegistrationPage';
import CandidateRegistrationPage from './page/candidate/CandidateRegistrationPage';
import CandidateLoginPage from './page/candidate/CandidateLoginPage';
import axios from 'axios';
import CorporateDashboard from './page/corporate/CorporateDashboard';
import CollegeLoginPage from './page/college/CollegeLoginPage';
import CollegeBasicRegistrationPage from './page/college/CollegeBasicRegistrationPage';
import CollegeRegistrationPage from './page/college/CollegeRegistrationPage';
import CollegeDashboard from './components/College/CollegeDashboard';
import CandidateStepOneRegPage from './page/candidate/CandidateStepOneRegPage';
import CandidateDashboard from './page/candidate/Dashboard/CandidateDashboard';
import CandidatePersonalInformationForm from './components/Candidate/CandidatePersonalInformationForm';
import CandidatePersonalInformationPage from './page/candidate/CandidatePersonalInformationPage';
function App() {
  return (
    <>
  <ToastContainer />  {/* Add it here globally */}
   <Router > 
     
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corporate-login" element={<CorporateLogin />} />
        <Route path="/corporate-basic-register" element={<CorporateBasicRegistrationPage />} />
        <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
        <Route path="/corporate-registration" element={<CorporateRegistrationPage />} />   

        {/* college login and registration */}
        <Route path="/college-login" element={<CollegeLoginPage />} />
        <Route path="/college-basic-register" element={<CollegeBasicRegistrationPage />} />
        <Route path="/college-registration" element={<CollegeRegistrationPage />} />   
        <Route path="/college-dashboard" element={<CollegeDashboard />} />   



        <Route path="/candidate-login" element={<CandidateLoginPage />} />
        <Route path="/candidate-basic-register" element={<CandidateBasicRegistrationPage />} /> 
        <Route path="/candidate-basic-register" element={<CandidateBasicRegistrationPage />} /> 
        <Route path="/candidate-qualification-register" element={<CandidateStepOneRegPage />} /> 
        <Route path="/candidate-personal-information" element={<CandidatePersonalInformationPage />} /> 
        <Route path="/candidate-registeration" element={<CandidateRegistrationPage />} />  
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />        
      
      
     
     
        </Routes>
     
    </Router>
    </>
  );
}

export default App;
