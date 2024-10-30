import React, { Component } from "react";
import "./Contact.css";
import "../Profile/Navbar.css";
import { FaBars, FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default class Contact extends Component {
  // State to store form data, validation errors, and menu state
  state = {
    name: "",
    email: "",
    message: "",
    errors: {},
    isOpen: false, // Manage menu open/close state
  };

  // Handle input change and validate fields
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  // Validation logic for each field
  validateField = (name, value) => {
    let errors = this.state.errors;

    // Name validation (required and min length of 3)
    if (name === "name") {
      errors.name =
        value.length < 3 ? "Name must be at least 3 characters long." : "";
    }

    // Email validation (basic email format)
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = !emailRegex.test(value)
        ? "Please enter a valid email address."
        : "";
    }

    // Message validation (required)
    if (name === "message") {
      errors.message = value === "" ? "Message cannot be empty." : "";
    }

    this.setState({ errors });
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7137/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          message: this.state.message,
        }),
      });

      if (response.ok) {
        alert("Message submitted successfully!");
        this.setState({ name: "", email: "", message: "", errors: {} });
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || "Unknown error."}`);
      }
    } catch (error) {
      alert("There was an error submitting your message. Please try again.");
    }
  };

  // Check if the form is valid
  isFormValid = () => {
    const { name, email, message, errors } = this.state;
    return (
      name &&
      email &&
      message &&
      !Object.values(errors).some((error) => error !== "")
    );
  };

  // Toggle menu function
  toggleMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { errors, isOpen } = this.state; // Destructure state

    return (
      <div>
        {/* Navbar */}
        <div className="navbar">
          <div className="nav-logo">
            <p>
              <Link to="/HomePage" className="logo-home">
                The Auction Room
              </Link>
            </p>
          </div>
          <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
            <li>
                        <Link to="/Auctions" className="user-nav">
                            Auctions
                        </Link>
                    </li>
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

            <div className="nav-icon" onClick={this.toggleMenu}>
              <FaBars size={25} />
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h1>Contact Us</h1>
        </div>

        <div className="entire">
          <div className="responsive-paragraph">
            <span>Contact us in any way convenient for you and</span>{" "}
            <span>we will answer all your questions.</span>
          </div>

          <div className="container">
            <div className="left-section">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="material-icons">email</span>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>info@jewellery.auction</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="material-icons">phone</span>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>+94 76 321 8000</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="material-icons">location_on</span>
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>128, Dampe Road</p>
                    <p>Pitipana North,</p>
                    <p>Homagama</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-section">
              <form onSubmit={this.handleSubmit} className="ContactForm">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                  />
                  {errors.message && (
                    <span className="error">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="buttons"
                  disabled={!this.isFormValid()}
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="map-responsive">
            <iframe
              title="NSBM Green University Location" // Add a descriptive title here
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.57579631529!2d80.038997973652!3d6.82133441963342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2523b05555555%3A0x546c34cd99f6f488!2sNSBM%20Green%20University!5e0!3m2!1sen!2slk!4v1729831621346!5m2!1sen!2slk"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
}
