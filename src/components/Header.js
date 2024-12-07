import { Link } from 'react-router-dom';  // If you're using React Router for navigation
import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as MobileLogo } from '../assets/images/mobile_logo.svg';


function Header() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const [isMobileOpen, setIsMobileOpen] = useState(false);

const handleMobileOpen = () => setIsMobileOpen(true);
const handleMobileClose = () => setIsMobileOpen(false);
  return (
   
    <>
    <header className='main-header'>
     
      <nav className="desktop-nav blur-bg ">
         
            <div className='custom-container'>
            <div className="inner-nav">
            <Link className="navbar-brand" to="#">
            <Logo   className='logo-img' />
            </Link>
            
            <div className="menu-box">
              <ul className="menu-list-box ">
                <li className="menu-list-item">
                  <a className="menu-link active" href="#">
                    Corporate
                  </a>
                </li>
                <li className="menu-list-item">
                  
                  <a className="menu-link" href="#">
                    College
                  </a>
                </li>
                <li className="menu-list-item">
                 
                  <a className="menu-link" href="#">
                    Candidate
                  </a>
                </li>
                <li className="menu-list-item">
                  
                  <a className="menu-link" href="#">
                    Speaker
                  </a>
                </li>
               
              </ul>
            </div>

            <div className="menu-box ">
              <ul className="menu-list-box login-menu-box">
                <li className="menu-list-item">
                  <a className="menu-link active" href="/corporate-login">
                  Login/Register
                  </a>
                  <span className="material-icons">arrow_drop_down</span>
                </li>
                <li className="menu-list-item">
                  
                  <a className="menu-link active" href="#">
                  Help
                  </a>
                </li>
                
               
              </ul>
            </div>
                {/* mobile responsive menu icon */}

                <div className='mobile-menu-box'>
                  <button className='mobile-menu-open-btn' onClick={handleMobileOpen}> <span className="material-icons">menu</span></button>
                </div>

               {/* mobile menu  */}
               <div className={`mobile-main-menu-container ${isMobileOpen ? 'active' : ''}`}>
               <div className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`} onClick={handleMobileClose}></div>
               <div className='mobile-inner-box'>
               <button className='mobile-close-btn' onClick={handleMobileClose}>
                <span className='material-icons'>close</span>
                </button>
               <div className='mobile-logo'>
                <MobileLogo   className='logo-img' />
                </div>
                <ul className='mobile-items-box'>
                  <li className='mobile-menu-item'>
                    <Link to="#" className='mobile-menu-link'> Corporate</Link>
                  </li>
                  <li className='mobile-menu-item'>
                    <Link to="#" className='mobile-menu-link'> College</Link>
                  </li>
                  <li className='mobile-menu-item'>
                    <Link to="#" className='mobile-menu-link'> Candidate</Link>
                  </li>
                  <li className='mobile-menu-item'>
                    <Link to="#" className='mobile-menu-link'> Speaker</Link>
                  </li>
                  <li className='mobile-menu-item'>
                    <Link to="#" className='mobile-menu-link'> Login / Register</Link>
                  </li>
                  <li className='mobile-menu-item'>
                    <Link to="#" className='mobile-menu-link'> Help</Link>
                  </li>
                </ul>
               </div>
                
               </div>             

            </div>
           
          </div>
      </nav>
     
       
    </header>
      
    </>
  )
}

export default Header
