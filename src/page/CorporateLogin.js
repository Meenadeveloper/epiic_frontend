import Header from "../components/Header";
import Blue from "../assets/images/blue.png";
import Yellow from "../assets/images/yellow.png";
import Purple from "../assets/images/purple.png";
import CorporateLoginForm from "../components/CorporateLoginForm";

function CorporateLogin() {
  const BlueBox = {
    top: "-250.73px",
    left: "580.55px",
    position: "absolute",
  };
  const ColorBlue = {
    width: "574.76px",
    height: "745.28px",

    opacity: 0.9,
    transform: "rotate(130.94deg)", // Use transform to handle rotation
    filter: "blur(100px)",
  };
  const YellowBox = {
    top: "102.32px",
    left: "415.98px",
    position: "absolute",
  };

  const ColorYellow = {
    width: "658.39px !important",
    height: "670.75px !important",
    filter: "blur(200px)",

    opacity: 1,
    transform: "rotate(23.94deg)",
  };
  const PurpleBox = {
    top: "213.72px",
    left: "24px",
    position: "absolute",
  };
  const ColorPurple = {
    width: "576.35px",
    height: "569.43px",
    filter: "blur(200px)",

    opacity: "1", // No 'px' for opacity
    transform: "rotate(23.94deg)",
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
          <CorporateLoginForm/>
        </div>
      </div>
    </>
  );
}

export default CorporateLogin;
