// import React from 'react';
// import './Footer.css';
// import Link from 'next/link';



// function Footer() {
//   return (
//     <footer className='bg-[#111]'>
//       <div className="FooterContainer">
//         <div className="socialIcons">
//           <div href="#"><i className="fa-brands fa-facebook"></i></div>
//           <div href="#"><i className="fa-brands fa-instagram"></i></div>
//           <div href="#"><i className="fa-brands fa-twitter"></i></div>
//           <div href="#"><i className="fa-brands fa-google-plus"></i></div>
//           <div href="#"><i className="fa-brands fa-youtube"></i></div>
//         </div>
//         <div className="container mx-auto px-4 text-center">
//           {/* <div className="mb-6">
//             <h2 className="text-2xl font-bold">BroBid</h2>
//             <p className="text-sm">Empowering every transaction with a touch of innovation</p>
//           </div> */}
//            <div className="mb-6">
//                     <h2 className="text-2xl text-white font-bold">BroBid</h2>
//                     <p className="text-sm text-white">Empowering every transaction with a touch of innovation</p>
//                 </div>
//           <div className="flex justify-center space-x-6 mb-6">
//             <Link href="/customer/aboutus" className="text-white hover:text-gray-300">About Us</Link>
//             <Link href="" className="text-white hover:text-gray-300">Contact</Link>
//             <Link href="/customer/dashboard1" className="text-white hover:text-gray-300">Privacy Policy</Link>
//             <Link href="" className="text-white hover:text-gray-300">Terms of Service</Link>
//           </div>
//           <p className="text-sm text-white">© {new Date().getFullYear()} BroBid. All rights reserved.</p>
//         </div>
//       </div>
//       <div className="FooterBottom flex justify-center text-purple-50">
//         <p>Copyright &copy;2024; Designed by <span className="designer">BROO</span></p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import React from 'react';
import './Footer.css';
import Link from 'next/link';
import Image from 'next/image';





function Footer() {
  return (
 <div>
    <footer class="py-5">
      <div class="container-fluid">
        <div class="row">

          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="footer-menu">
            <Image
                src="/images/logo.png"
                alt="Profile Photo"
                width={80}
                height={80}
              />
              <div className=' fw-bold fs-3'>BroBid</div>
           
            </div>
          </div>

          <div class="col-md-2 col-sm-6">
            <div class="footer-menu">
              <h5 class="fw-bold">Ultras</h5>
              <ul class="menu-list list-unstyled">
                <li class="menu-item">
                  <a href="#" class="nav-link">About us</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Conditions </a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Our Journals</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Careers</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Affiliate Programme</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Ultras Press</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 col-sm-6">
            <div class="footer-menu">
              <h5 class="fw-bold">Customer Service</h5>
              <ul class="menu-list list-unstyled">
                <li class="menu-item">
                  <a href="#" class="nav-link">FAQ</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Contact</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Privacy Policy</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Returns & Refunds</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Cookie Guidelines</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Delivery Information</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 col-sm-6">
            <div class="footer-menu">
              <h5 class="fw-bold">Customer Service</h5>
              <ul class="menu-list list-unstyled">
                <li class="menu-item">
                  <a href="#" class="nav-link">FAQ</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Contact</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Privacy Policy</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Returns & Refunds</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Cookie Guidelines</a>
                </li>
                <li class="menu-item">
                  <a href="#" class="nav-link">Delivery Information</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="footer-menu">
              <h5 class="fw-bold">Subscribe Us</h5>
              <p>Subscribe to our newsletter to get updates about our grand offers.</p>
              <form class="d-flex mt-3 gap-0" role="newsletter">
                <input class="form-control rounded-start rounded-0 bg-light" type="email" placeholder="Email Address" aria-label="Email Address"/>
                <button class="btn  btn-primary rounded-end rounded-0" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
    <div id="footer-bottom">
      <div class="container-fluid">
        <div class=" text-center">
            <p>© 2024 BroBid. All rights reserved.</p>
        </div>
      </div>
    </div>
 </div>
  );
}

export default Footer;

