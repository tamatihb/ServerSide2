import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Footer.css"



function Footer() {
    return (
  
<div className="sticky-footer" >
        <footer className="mainfooter" role="contentinfo" >
        <div className="footer-middle">
        <div className="container">
          <div className="row">

 {/* Start section 1 */}
            <div className="col-md-3 col-sm-6">
              <div className="footer-pad">
                <h4>Explore</h4>
                <ul className="list-unstyled">
                  
                  <li><a href="/">Home</a></li>
                  <li><a href="/signup">Sign Up</a></li>
                  <li><a href="/restaurant">Restaurants</a></li>
             
                </ul>
              </div>
            </div>
 {/* End section 1 */}
 {/* Start section 2 */}
            <div className="col-md-3 col-sm-6">
              <div className="footer-pad">
                <h4>Contact Us</h4>
                <ul className="list-unstyled">
                  <li>Australia</li>
                  <li>44 Melbourne Street,Vic,3000</li>
                  <li>ChefsHat@Gmail.com</li>
            
                </ul>
              </div>
            </div>
{/* End section 2  */}
{/* Start section 3  */}
               <div className="col-md-3 col-sm-6">              
              <div className="footer-pad">
                <h4>Legal</h4>
                <ul className="list-unstyled">
                  <li><a href="/terms">Terms</a></li>
                  <li><a href="/privacy">Privacy</a></li>
                </ul>
              </div>
            </div>
{/* End section 3  */}
{/* start socials */}
              <div className="col-md-3">
                  <h4>Follow Us</h4>
                  <ul className="social-network social-circle">
                   <li><a href="https://www.facebook.com/" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                   <li><a href="https://www.linkedin.com/" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                  </ul>				
              </div>
{/* End socials  */}
          </div>
          <div className="row">
              <div className="col-md-12 copy">
                  <p className="text-center">&copy; Copyright 2021- Chefs Hat.<br></br>  All rights reserved.</p>
              </div>
          </div>
        </div>
        </div>
      </footer>
      </div>
    )
}

export default Footer
