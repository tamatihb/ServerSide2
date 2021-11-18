import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Footer.css"



function Footer() {
    return (
  
<div className="sticky-footer" >
        <footer class="mainfooter" role="contentinfo" >
        <div class="footer-middle">
        <div class="container">
          <div class="row">

 {/* Start section 1 */}
            <div class="col-md-3 col-sm-6">
              <div class="footer-pad">
                <h4>Explore</h4>
                <ul class="list-unstyled">
                  
                  <li><a href="/about">About</a></li>
                  <li><a href="/register">Register</a></li>
                  <li><a href="/food">Food</a></li>
             
                </ul>
              </div>
            </div>
 {/* End section 1 */}
 {/* Start section 2 */}
            <div class="col-md-3 col-sm-6">
              <div class="footer-pad">
                <h4>Contact Us</h4>
                <ul class="list-unstyled">
                  <li>Australia</li>
                  <li>44 Melbourne Street,Vic,3000</li>
                  <li>ChefsHat@Gmail.com</li>
            
                </ul>
              </div>
            </div>
{/* End section 2  */}
{/* Start section 3  */}
               <div class="col-md-3 col-sm-6">              
              <div class="footer-pad">
                <h4>Legal</h4>
                <ul class="list-unstyled">
                  <li><a href="/terms">Terms</a></li>
                  <li><a href="/privacy">Privacy</a></li>
                </ul>
              </div>
            </div>
{/* End section 3  */}
{/* start socials */}
              <div class="col-md-3">
                  <h4>Follow Us</h4>
                  <ul class="social-network social-circle">
                   <li><a href="https://www.facebook.com/" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                   <li><a href="https://www.linkedin.com/" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                  </ul>				
              </div>
{/* End socials  */}
          </div>
          <div class="row">
              <div class="col-md-12 copy">
                  <p class="text-center">&copy; Copyright 2021- Chefs Hat.<br></br>  All rights reserved.</p>
              </div>
          </div>
        </div>
        </div>
      </footer>
      </div>
    )
}

export default Footer
