import React, { Component } from "react";
import "./Contact.css";
import yourImage from "./Images/SellWithUs.png";

export default class Contact extends Component { 
  // State to store form data and validation errors
  state = {
    name: "",
    email: "",
    message: "",
    errors: {},
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

  render() {
    const { errors } = this.state;

    return (
      <div className="entire">
        <div className="image-container">
          <img src={yourImage} alt="Contact" />
          <div className="overlay-text">Contact</div>
        </div>

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
    );
  }
}
