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
import CollegeBasicRegistrationPage from './page/CollegeBasicRegistrationPage';
import CandidateBasicRegistrationPage from './page/CandidateBasicRegistrationPage';
import CandidateRegistrationPage from './page/CandidateRegistrationPage';

function App() {
  return (
    <>
  <ToastContainer />  {/* Add it here globally */}
   <Router > 
     
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corporate-login" element={<CorporateLogin />} />
        <Route path="/corporate-basic-register" element={<CorporateBasicRegistrationPage />} />
        <Route path="/corporate-registration" element={<CorporateRegistrationPage />} />   
        <Route path="/college-basic-register" element={<CollegeBasicRegistrationPage />} />   
        <Route path="/candidate-basic-register" element={<CandidateBasicRegistrationPage />} />  
        <Route path="/candidate-registeration" element={<CandidateRegistrationPage />} />        
      
     
     
        </Routes>
     
    </Router>
    </>
  );
}

export default App;
