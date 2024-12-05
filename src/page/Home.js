import Header from "../components/Header";
import Banner from "../components/Banner";
import EpiicUsers from "../components/EpiicUsers";
function Home() {
  

  return (
    <>

<div class="body-bg" >
  <div class="bg-box">
  <div class="color-blue"></div>
  <div class="color-purple"></div>
  <div class="color-yellow"></div>
  </div>

  <div className="page-wrapper">
        <Header/>
        
        <Banner/>

        <EpiicUsers/>
  </div>

</div>
     
    </>
  );
}

export default Home;
