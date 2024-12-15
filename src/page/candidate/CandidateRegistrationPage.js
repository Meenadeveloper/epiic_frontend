import Header from "../../components/Header";
import Blue from "../assets/images/college_basic_blue.png";
import Yellow from "../assets/images/college_basic_yellow.png";
import Purple from "../assets/images/college_basic_purple.png";
import CandidateRegisterForm from "../../components/CandidateRegisterForm";
function CandidateRegistrationPage() {
    const BlueBox = {
        top: "600.42px",
        left: "-106.32px",
        position: "absolute",
      };
      const ColorBlue = {
        width: "584.24px",
        height: "690.13px",
        opacity: 0.8,
        transform: "rotate(-158.45deg)", // Use transform to handle rotation
        filter: "blur(200px)",
      };
      const YellowBox = {
        top: "-200.89px",
        left: "-100.5px",
        position: "absolute",
      };
    
      const ColorYellow = {
        width: "669.25px !important",
        height: "400.25px !important",
        filter: "blur(300px)",
    
        opacity: 0.8,
        transform: "rotate(27.04deg)",
      };
      const PurpleBox = {
        top: "-130.92px",
        left: "773px",
        position: "absolute",
        // background: "rgba(159, 93, 152, 1)",

      };
      const ColorPurple = {
        width: "585.86px",
        height: "805.1px",
        filter: "blur(250px)",
    
        opacity: 0.8, // No 'px' for opacity
        transform: "rotate(-158.45deg)",
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
          <CandidateRegisterForm/>
        </div>
      </div>
    </>
  )
}

export default CandidateRegistrationPage
