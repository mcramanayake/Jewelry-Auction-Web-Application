import React, { useState } from 'react';
import "./AboutUs.css";
import { Helmet } from "react-helmet"; // Import Helmet
import "../Profile/Navbar.css";
import { FaBars, FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Chinthaka from "./Images/Chinthaka.jpg";
import Lakmi from "./Images/Lakmi.jpg";
import Isira from "./Images/Isira.jpg";
import Senuki from "./Images/Senuki.jpg";
import Shehan from "./Images/Shehan.jpg";
import Sandun from "./Images/Sandun.jpg";

export default function AboutUs() {

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
};

  

  return (
    <div>
      {/*Navbar*/}
      <div className="navbar">
                <div className="nav-logo">
                    <p>
                        <Link to="/HomePage" className="logo-home">
                            The Auction Room
                        </Link>
                    </p>
                </div>
                <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
                    <li>Auctions</li>
                    <li>
                        <Link to="/sell-with-us" className="user-nav">
                            Sell with us
                        </Link>
                    </li>
                    <li>
                        <Link to="/aboutus" className="user-nav">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact-us" className="user-nav">
                            Contact
                        </Link>
                    </li>
                </ul>
                <div className="nav-login-user">
                    <Link to="/MyAccount" className="user-nav">
                        <FaCircleUser size={25} />
                    </Link>

                    <div className="nav-icon" onClick={toggleMenu}>
                        <FaBars size={25} />
                    </div>
                </div>
            </div>

        <div className="about-section-hero">
                <h1>About Us</h1>
        </div>

      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/styles.css" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://kit.fontawesome.com/0a73ff5289.js"
          crossOrigin="anonymous"
        ></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      </Helmet>

      

      <div class="container pt-7">
        <div className="about-row">
          <div className="about-col">
            <h1 className="aboutH1">Our Mission</h1>
            <p className="aboutP">
              At Jewellery Auction, we’re more than just an auction site; we’re
              a trusted destination for jewellery lovers and collectors.
              Specializing in fine, unique, and luxury pieces, we’re dedicated
              to connecting you with timeless elegance and captivating design.
            </p>
            <p>
              From vintage treasures to contemporary masterpieces, we carefully
              curate each item to meet the highest standards of quality and
              craftsmanship. Our commitment to transparency and integrity
              ensures that your auction experience is as secure and enjoyable as
              it is exciting.
            </p>
          </div>
        </div>

        <div className="about-row">
          <div className="about-coll">
            <h1>Why Choose Jewellery Auction</h1>
            <p>
              Experience the excitement of bidding on exceptional jewellery
              pieces, all from the comfort of your home. At Jewellery Auction,
              we are committed to offering a diverse selection of authentic,
              high-quality jewellery, making it easy for collectors and
              enthusiasts to find unique and valuable pieces.
            </p>
            <p>
              Our platform is designed for a seamless and secure auction
              experience. Each item is meticulously vetted for quality and
              authenticity, giving you confidence with every bid. Whether you're
              a seasoned collector or a new enthusiast, our support team is here
              to guide you every step of the way.
            </p>
          </div>
        </div>

        {/* developers */}
        <div className="w-100 d-flex flex-column min-vh-100 justify-content-between overflow-x-hidden mt-2">
          <div className="text-center mt-5">
            <h1 className="section-title">Meet Our Developers</h1>
            <div className="development-section mt-5">
              <div className="row">
                {/* Card Start */}
                <div className="col-12 col-xl-4 col-lg-4 col-md-6 card-item mb-3">
                  <div className="card border border-warning shadow p-3 mb-5 bg-white rounded">
                    <div className="profile-img pt-4">
                      <img
                        className="card-img-top rounded-circle w-50"
                        src={Chinthaka}
                        alt="Chinthaka Ramanayake"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="name fs-5 text-center bg-warning-subtle">
                      Chinthaka Ramanayake
                      </h3>
                    </div>
                    <div className="skill-badges mb-3 fs-6">
                      <span className="badge rounded-pill text-bg-secondary">
                        cramanayake009@gmail.com
                      </span>
                    </div>
                    <div className="media-button fs-3 mb-3">
                      <a
                        href="https://github.com/mcramanayake"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="GitHub"
                      >
                        <i className="fa-brands fa-github text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/chinthaka-ramanayake/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.facebook.com/share/fPDBRCcH7Tug7HdD/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-brand-color"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Card Start */}
                <div className="col-12 col-xl-4 col-lg-4 col-md-6 card-item mb-3">
                  <div className="card border border-warning shadow p-3 mb-5 bg-white rounded">
                    <div className="profile-img pt-4">
                      <img
                        className="card-img-top rounded-circle w-50"
                        src={Lakmi}
                        alt="Lakmi Kodithuwakku"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="name fs-5 text-center bg-warning-subtle">
                      Lakmi Kodithuwakku
                      </h3>
                    </div>
                    <div className="skill-badges mb-3 fs-6">
                      <span className="badge rounded-pill text-bg-secondary">
                      pabodinilakmi@gmail.com
                      </span>
                    </div>
                    <div className="media-button fs-3 mb-3">
                      <a
                        href="https://github.com/mlpkodithuwakku"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="GitHub"
                      >
                        <i className="fa-brands fa-github text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/lakmi-pabodini-510489255/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-brand-color"></i>
                      </a>
                      <a
                        href="https://web.facebook.com/people/Lakmi-Pabodini/100088190014626/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/lakmipabodini/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-brand-color"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Card Start */}
                <div className="col-12 col-xl-4 col-lg-4 col-md-6 card-item mb-3">
                  <div className="card border border-warning shadow p-3 mb-5 bg-white rounded">
                    <div className="profile-img pt-4">
                      <img
                        className="card-img-top rounded-circle w-50"
                        src={Isira}
                        alt="Isira Wickramasinghe"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="name fs-5 text-center bg-warning-subtle">
                      Isira Wickramasinghe
                      </h3>
                    </div>
                    <div className="skill-badges mb-3 fs-6">
                      <span className="badge rounded-pill text-bg-secondary">
                      wickramasingheisira@gmail.com
                      </span>
                    </div>
                    <div className="media-button fs-3 mb-3">
                      <a
                        href="https://github.com/isirawick"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="GitHub"
                      >
                        <i className="fa-brands fa-github text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/isirawickramasinghe/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.facebook.com/share/MGXCYpFThnpMVW5f/?mibextid=LQQJ4d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/__isiya__?igsh=MWptajBta2VjYWNibg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-brand-color"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Card Start */}
                <div className="col-12 col-xl-4 col-lg-4 col-md-6 card-item mb-3">
                  <div className="card border border-warning shadow p-3 mb-5 bg-white rounded">
                    <div className="profile-img pt-4">
                      <img
                        className="card-img-top rounded-circle w-50"
                        src={Senuki}
                        alt="Senuki Perera"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="name fs-5 text-center bg-warning-subtle">
                      Senuki Perera
                      </h3>
                    </div>
                    <div className="skill-badges mb-3 fs-6">
                      <span className="badge rounded-pill text-bg-secondary">
                      senukimanthini2001@gmail.com
                      </span>
                    </div>
                    <div className="media-button fs-3 mb-3">
                      <a
                        href="https://github.com/SenukiPerera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="GitHub"
                      >
                        <i className="fa-brands fa-github text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/senukiperera/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.facebook.com/senuki.perera.378?mibextid=LQQJ4d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/senuki_perera_?igsh=NnZvdzMyaHNsMW9m&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-brand-color"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Card Start */}
                <div className="col-12 col-xl-4 col-lg-4 col-md-6 card-item mb-3">
                  <div className="card border border-warning shadow p-3 mb-5 bg-white rounded">
                    <div className="profile-img pt-4">
                      <img
                        className="card-img-top rounded-circle w-50"
                        src={Shehan}
                        alt="Sandun Sandeepa"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="name fs-5 text-center bg-warning-subtle">
                        Sandun Sandeepa
                      </h3>
                    </div>
                    <div className="skill-badges mb-3 fs-6">
                      <span className="badge rounded-pill text-bg-secondary">
                        Sandun@gmail.com
                      </span>
                    </div>
                    <div className="media-button fs-3 mb-3">
                      <a
                        href="https://github.com/Sandun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="GitHub"
                      >
                        <i className="fa-brands fa-github text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-brand-color"></i>
                      </a>
                      <a
                        href="https://facebook.com/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-brand-color"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Card Start */}
                <div className="col-12 col-xl-4 col-lg-4 col-md-6 card-item mb-3">
                  <div className="card border border-warning shadow p-3 mb-5 bg-white rounded">
                    <div className="profile-img pt-4">
                      <img
                        className="card-img-top rounded-circle w-50"
                        src={Sandun}
                        alt="Sandun Sandeepa"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="name fs-5 text-center bg-warning-subtle">
                        Sandun Sandeepa
                      </h3>
                    </div>
                    <div className="skill-badges mb-3 fs-6">
                      <span className="badge rounded-pill text-bg-secondary">
                        sandunsandeepa567@gmail.com
                      </span>
                    </div>
                    <div className="media-button fs-3 mb-3">
                      <a
                        href="https://github.com/Sandun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="GitHub"
                      >
                        <i className="fa-brands fa-github text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-brand-color"></i>
                      </a>
                      <a
                        href="https://facebook.com/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-brand-color"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/Sandun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github link text-decoration-none"
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-brand-color"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Repeat this block for each developer */}
                {/* Make sure to change the image path, name, and other details for each developer */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="footer">
                <div className="first">
                    <h1>The Auction Room</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className="second">
                    <ul>
                        <li>Auctions</li>
                        <li>Past Auctions</li>
                        <li>Profile</li>
                        <li>Sell with us</li>
                    </ul>
                </div>
                <div className="third">
                    <ul>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
    </div>
  );
}