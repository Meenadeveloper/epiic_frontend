import { Link } from 'react-router-dom';  // If you're using React Router for navigation
import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as MobileLogo } from '../../assets/images/mobile_logo.svg';
import Profile from '../../assets/images/dashboardprofile.png';
function DashboardHeader() {
  return (
    <>
      <header className="main-header">
        <nav className="desktop-nav blur-bg ">
          <div className="custom-container" style={{height:'100%'}}>
            <div className="inner-nav" style={{height:'100%'}}>
               <button className='dashboard-menu-toggle'>
               <span class="material-icons">menu</span>
               </button>

               <div className="menu-box">
              <ul className="menu-list-box">
                <li className="menu-list-item">
                  <a className="menu-link active  dashboard-menu" href="/corporate-basic-register">
                   <p className='dashboard-menu'>Job Posts</p><i class="material-icons">arrow_drop_down</i> 
                  </a>
                </li>
                <li className="menu-list-item">
                  
                  <a className="menu-link dashboard-menu" href="/college-basic-register">
                  <p className='dashboard-menu'>Events</p><i class="material-icons">arrow_drop_down</i> 
                  </a>
                </li>
                <li className="menu-list-item">
                  
                  <a className="menu-link dashboard-menu" href="/college-basic-register">
                  <p className='dashboard-menu'>Tools</p><i class="material-icons">arrow_drop_down</i> 
                  </a>
                </li>
                
              </ul>
            </div>
           
            <div className="menu-box ">
              <ul className="menu-list-box login-menu-box">
                <li className="menu-list-item">
                  <a className="menu-link active" href="/corporate-login">
                  <i class="material-icons">settings</i>
                  </a>
                  <span className="material-icons">arrow_drop_down</span>
                </li>
                <li className="menu-list-item">
                  
                  <a className="menu-link dashboard-link" href="#">
                        <div className='profile-img-box'>
                        <img src={Profile} alt=''/>
                        </div>
                        <div className='profile-name-container'>
                            <p>Lorem Ipsum</p>
                            <span>Lorem Ipsum</span>
                        </div>
                  </a>
                </li>
                
               
              </ul>
            </div>
           
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default DashboardHeader