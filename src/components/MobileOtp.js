import React from 'react'

function MobileOtp() {
  return (
    <>
       <div className='verify-box'>
  <div className='d-flex'>
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
    <input type='tel' maxLength={1} className='otp-input' />
  </div>
  <p className='resent-otp'>Resend OTP</p>
</div>

                        <button type='submit' className='otp-btn'>Submit</button>
    </>
  )
}

export default MobileOtp
