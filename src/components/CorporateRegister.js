import AboutField from "./AboutField";
import AdditionalInformation from "./AdditionalInformation";
import AddressField from "./AddressField";
import CorporateBasicDetail from "./CorporateBasicDetail";
import LogoInput from "./LogoInput";

function CorporateRegister() {
  return (
    <>
      <div className='register-container'>
        <div className='custom-container'>
          <div className='register-box'>
            <div className='back-btn-box'>
              <button
                className='back-btn'
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = '/'; // Replace '/' with your fallback URL
                  }
                }}
              >
                Back
              </button>
            </div>
            <div className='register-form-container '>
              <div className='register-form-box corporate-box'>
                <div className='register-heading'>
                  <h2>CORPORATE REGISTRATION</h2>
                </div>

                  <form className="corporate-register">
                    <CorporateBasicDetail/>
                    <AddressField/>
                    <AboutField/>
                    <AdditionalInformation/>
                    <LogoInput/>
                    <div className="d-center">
                    <button type="submit" className="save-btn">Submit</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CorporateRegister
