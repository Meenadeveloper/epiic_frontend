import Header from "../../components/Header";
import Blue from "../../assets/images/college_basic_blue.png";
import Yellow from "../../assets/images/college_basic_yellow.png";
import Purple from "../../assets/images/college_basic_purple.png";
import CandidateBasicRegisterForm from "../../components/Candidate/CandidateBasicRegisterForm";
function CandidateBasicRegistrationPage() {
    const BlueBox = {
        top: "52.27px",
        left: "840px",
        position: "absolute",
      };
      const ColorBlue = {
        width: "574.76px",
        height: "745.28px",
        opacity: "1",
        transform: "rotate(23.94deg)", // Use transform to handle rotation
        filter: "blur(200px)",
      };
      const YellowBox = {
        top: "562.21px",
        left: "395px",
        position: "absolute",
      };
    
      const ColorYellow = {
        width: "658.39px",
        height: "400.75px",
        filter: "blur(170px)",
    
        opacity: "1",
        transform: "rotate(27.04deg)",
      };
      const PurpleBox = {
        top: "15.91px",
        left: "-45px",
        position: "absolute",
        // background: "rgba(159, 93, 152, 1)",

      };
      const ColorPurple = {
        width: "585.86px",
        height: "569.43px",
        filter: "blur(140px)",
    
        opacity: "1", // No 'px' for opacity
        transform: "rotate(23deg)",
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
          <CandidateBasicRegisterForm/>
        </div>
      </div>
    </>
  )
}

export default CandidateBasicRegistrationPage
