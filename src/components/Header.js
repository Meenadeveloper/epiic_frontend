import { Link } from 'react-router-dom';  // If you're using React Router for navigation
import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

function Header() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
   
    <>
    <header className='main-header'>
     
      <nav className="desktop-nav blur-bg ">
         
            <div className='custom-container'>
            <div className="inner-nav">
            <a className="navbar-brand" href="#">
            <Logo   className='logo-img' />
            </a>
            
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
                  <a className="menu-link active" href="#">
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
                  <button className='mobile-menu-open-btn'> <span className="material-icons">menu</span></button>
                </div>

            </div>
           
          </div>
      </nav>
     
       
    </header>
      
    </>
  )
}

export default Header
