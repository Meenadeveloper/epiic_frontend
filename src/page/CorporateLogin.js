import Header from "../components/Header";
import Blue from "../assets/images/blue.png";
import Yellow from "../assets/images/yellow.png";
import Purple from "../assets/images/purple.png";

function CorporateLogin() {
  const BlueBox = {
    top: "-103.73px",
    left: "723.55px",
    position: "absolute",
  };
  const ColorBlue = {
    width: "574.76px",
    height: "745.28px",

    gap: "0px",
    opacity: 0.8,
    transform: "rotate(23.94deg)", // Use transform to handle rotation
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", // Use camelCase for boxShadow
    filter: "blur(150px)",
  };
  const YellowBox = {
    top: "102.32px",
    left: "415.98px",
    position: "absolute",
  };

  const ColorYellow = {
    width: "658.39px !important",
    height: "657.75px !important",
    filter: "blur(350px)",

    opacity: 0.9,
    transform: "rotate(23.94deg)",
  };
  const PurpleBox = {
    top: "313.72px",
    left: "24px",
    position: "absolute",
  };
  const ColorPurple = {
    width: "576.35px",
    height: "869.43px",
    filter: "blur(150px)",

    opacity: 0.8, // No 'px' for opacity
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
            <img src={Purple} alt="" style={ColorYellow} />
          </div>
          <div class="yellow" style={YellowBox}>
            <img src={Yellow} alt="" style={ColorPurple} />
          </div>
        </div>

        <div className="page-wrapper">
          <Header />
        </div>
      </div>
    </>
  );
}

export default CorporateLogin;