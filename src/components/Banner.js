import React from 'react'

function Banner() {
  return (
    <>
             <div className='custom-container'>
              {/* banner slider */}

              <div className='banner-slider-container'>
                {/* slider item */}
                <div className='banner-slider-item'>
                <div class="row">
                   <div class="col-md-6">
                    <div className='banner-img-box'>
                    <img src="https://via.placeholder.com/500" alt="Image" class="img-fluid" />

                    </div>
           </div>
        
        <div class="col-md-6 d-flex align-items-center">
            <div>
                <h1 class="display-4">Welcome to Our Banner</h1>
                <p class="lead">This is the subtitle or description of the banner. You can add more content here as needed.</p>
            </div>
        </div>
    </div>
                </div>
              </div>
             </div>
    </>
  )
}

export default Banner
