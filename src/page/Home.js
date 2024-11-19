import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
function Home() {
  

  return (
    <>

<div class="body-bg">
  <div class="bg-box">
  <div class="color-blue"></div>
  <div class="color-purple"></div>
  <div class="color-yellow"></div>
  </div>

  <div className="page-wrapper">
        <Header/>
        
        <Banner/>
  </div>

</div>
     
    </>
  );
}

export default Home;
