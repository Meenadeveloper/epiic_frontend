import Header from "../components/Header";
import Blue from "../assets/images/reg_blue.png";
import Yellow from "../assets/images/reg_yellow.png";
import Purple from "../assets/images/reg_purple.png";
import CorporateRegister from "../components/CorporateRegister";

function CorporateRegistrationPage() {
    const BlueBox = {
        top: "510.64px",
        left: "462px",
        position: "absolute",
      };
      const ColorBlue = {
        width: "870.25px",
        height: "1665.64px",
        opacity: 0.8,
        transform: "rotate(27.04deg)", // Use transform to handle rotation
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", // Use camelCase for boxShadow
        filter: "blur(200px)",
      };
      const YellowBox = {
        top: "-567.79px",
        left: "-314px",
        position: "absolute",
      };
    
      const ColorYellow = {
        width: "996.87px !important",
        height: "975.02px !important",
        filter: "blur(200px)",
    
        opacity: 0.8,
        transform: "rotate(27.04deg)",
      };
      const PurpleBox = {
        top: "160.92px",
        left: "-173px",
        position: "absolute",
        // background: "rgba(159, 93, 152, 1)",

      };
      const ColorPurple = {
        width: "872.66px",
        height: "1465.6px",
        filter: "blur(150px)",
    
        opacity: 0.8, // No 'px' for opacity
        transform: "rotate(27.04deg)",
      };
    

  return (
    <>
     <div class="body-bg" style={{overflowY:'scroll'}}>
        <div class="bg-box">
          <div class="blue" style={BlueBox}>
            <img src={Blue} alt="" style={ColorBlue} />
          </div>
          <div class="purple" style={PurpleBox}>
            <img src={Purple} alt="" style={ColorPurple} />
          </div>
          <div class="yellow" style={YellowBox}>
            <img src={Yellow} alt="" style={ColorYellow} />
          </div>
        </div>

        <div className="page-wrapper" style={{overflowY:'unset'}}>
          <Header />
          <CorporateRegister/>
        </div>
      </div>
      
    </>
  )
}

export default CorporateRegistrationPage
