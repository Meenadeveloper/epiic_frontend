import Header from "../components/Header";
import Blue from "../assets/images/blue.png";
import Yellow from "../assets/images/yellow.png";
import Purple from "../assets/images/purple.png";
import CorporateRegistrationBasicForm from "../components/CorporateRegistrationBasicForm";

function CorporateBasicRegistrationPage() {
    const BlueBox = {
        top: "455.2px",
        left: "618.59px",
        position: "absolute",
      };
      const ColorBlue = {
        width: "971.3px",
        height: "745.28px",
        opacity: 0.5,
        transform: "rotate(23.94deg)", // Use transform to handle rotation
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", // Use camelCase for boxShadow
        filter: "blur(100px)",
      };
      const YellowBox = {
        top: "220px",
        left: "133px",
        position: "absolute",
      };
    
      const ColorYellow = {
        width: "626px !important",
        height: "672px !important",
        filter: "blur(350px)",
    
        opacity: 0.9,
        transform: "rotate(16.22 deg)",
      };
      const PurpleBox = {
        top: "-400.09px",
        left: "-500px",
        position: "absolute",
        // background: "rgba(159, 93, 152, 1)",

      };
      const ColorPurple = {
        width: "973.26px",
        height: "609.43px",
        filter: "blur(300px)",
    
        opacity: 1, // No 'px' for opacity
        transform: "rotate(-30.73deg)",
      };
    
  return (
    <>
 <div class="body-bg">
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

        <div className="page-wrapper">
          <Header />
          <CorporateRegistrationBasicForm/>
        </div>
      </div>
      
    </>
  )
}

export default CorporateBasicRegistrationPage
