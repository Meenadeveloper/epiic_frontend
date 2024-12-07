import Header from "../components/Header";
import Banner from "../components/Banner";
import EpiicUsers from "../components/EpiicUsers";
function Home() {
  const BlueBox = {
    top: "-53.2px",
    left: "0.59px",
    width: "576.02px",  // Fixed spacing issue
    height: "600px",    // Fixed spacing issue
    position: "absolute",
    borderRadius: "79% 21% 63% 37% / 29% 63% 37% 71%",
    background: "#5D79EF",
    filter: "blur(200px)",
  };
  
  const YellowBox = {
    top: "0",
    left: "500px",
    position: "absolute",
    width: "659.83px",  
    height: "650px",     
    borderRadius: "50%",
    background: "#F49546",
    filter: "blur(200px)",
    opacity:'1',
  };
  
  const PurpleBox = {
    top: "0.39px",
    left: "209px",
    position: "absolute",
    width: "577.61px",   
    height: "600.82px",  
    borderRadius: "79% 21% 63% 37% / 29% 63% 37% 71%",
    background: "#9F5D98",  
    filter: "blur(100px)",
    opacity: "1",     
  };

  return (
    <>

<div class="body-bg" >
<div className="bg-box">
      <div className="color-blue" style={BlueBox}></div>
      <div className="color-purple" style={PurpleBox}></div>
      <div className="color-yellow" style={YellowBox}></div>
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
