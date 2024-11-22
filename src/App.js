import './assets/style/header.css';
import './assets/style/footer.css';
import './assets/style/components.css';
import './assets/style/body.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './page/Home';
import CorporateLogin from './page/CorporateLogin';
function App() {
  return (
    <>

   <Router> 
     
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corporate-login" element={<CorporateLogin />} />

          
        </Routes>
     
    </Router>
    </>
  );
}

export default App;
