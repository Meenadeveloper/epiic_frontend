import DashboardHeader from "../../../components/Dasboard/DashboardHeader";

function CandidateDashboard() {

    const BlueBox = {
        top: "0px",
        left: "-1000.1px",
        width: "1200.45px",  // Fixed spacing issue
        height: "1106.43px",    // Fixed spacing issue
        position: "absolute",
        borderRadius: "79% 21% 63% 37% / 29% 63% 37% 71%",
        background: "rgba(159, 93, 152, 1)",
        filter: "blur(300px)",
        opacity:'0.8',
        transform:"rotate(-95deg)",
      };
      
      const YellowBox = {
        top: "300.74px",
        left: "700.74px",
        transform:"rotate(95.98deg)",
        position: "absolute",
        width: "1026.85px",  
        height: "1083.7px",     
        background: "rgba(244, 149, 70, 1)",
        borderRadius: "79% 21% 63% 37% / 29% 63% 37% 71%",
        filter: "blur(300px)",
        opacity:'1',
      };
      

  return (
    <>
<div class="body-bg" >
<div className="bg-box">
      <div className="color-blue" style={BlueBox}></div>
      <div className="color-yellow" style={YellowBox}></div>
    </div>

  <div className="page-wrapper">
        <aside className="dashboard-asidebar">
           <div className="inner-section-aside">
            
           </div>
        </aside>
        <main className="dashboard-main">
        <DashboardHeader/>
        </main>


  </div>

</div>
    </>
  )
}

export default CandidateDashboard