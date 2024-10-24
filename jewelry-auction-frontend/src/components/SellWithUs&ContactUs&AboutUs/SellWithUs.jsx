import React, { Component } from "react";
import "./SellWithUs.css";
import yourImage from "./SellWithUs.png";

export default class SellWithUs extends Component {
  state = {
    itemName: "",
    price: "",
    message: "",
    file: null, // For file upload
    errors: {},
  };

  // Validate form fields in real-time
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and PDF files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should not exceed 2MB.");
        return;
      }
      this.setState({ file });
    }
  };

  validateField = (name, value) => {
    let errors = this.state.errors;

    // Item Name validation
    if (name === "itemName") {
      errors.itemName =
        value.length < 3 ? "Item name must be at least 3 characters long." : "";
    }

    // Price validation (must be a positive number)
    if (name === "price") {
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      errors.price = !priceRegex.test(value) ? "Enter a valid price." : "";
    }

    // Message validation (required field)
    if (name === "message") {
      errors.message = value === "" ? "Message cannot be empty." : "";
    }

    this.setState({ errors });
  };

  isFormValid = () => {
    const { itemName, price, message, errors } = this.state;
    return (
      itemName &&
      price &&
      message &&
      !Object.values(errors).some((error) => error !== "")
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { itemName, price, message, file } = this.state;

    if (!this.isFormValid()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("price", price);
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }

    try {
        const response = await fetch("https://localhost:7137/api/SellWithUs/sell-item", {
            method: "POST",
            body: formData,
          });
          

      if (response.ok) {
        alert("The data has been passed to the API!");
        this.setState({
          itemName: "",
          price: "",
          message: "",
          file: null,
          errors: {},
        });
      } else {
        alert("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="sell-with-us-section">
          <div className="image-container">
          <img src={yourImage} alt="Sell With Us" />
            <div className="overlay-text">Sell With Us</div>
          </div>
        </div>

        <div className="responsive-paragraph">
          <span className="xyz">
            Do you have an item you would like to sell? Leave your details and we will contact you shortly.
          </span>
        </div>

        <section className="contact">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group-row">
              <div className="input-box">
                <label>Item Name</label>
                <input
                  type="text"
                  className="field"
                  name="itemName"
                  value={this.state.itemName}
                  onChange={this.handleInputChange}
                  required
                />
                {errors.itemName && <span className="error">{errors.itemName}</span>}
              </div>

              <div className="input-box">
                <label>Price ($)</label>
                <input
                  type="text"
                  className="field"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  required
                />
                {errors.price && <span className="error">{errors.price}</span>}
              </div>
            </div>

            <div className="input-box">
              <label>Message</label>
              <textarea
                name="message"
                className="field"
                value={this.state.message}
                onChange={this.handleInputChange}
                required
              />
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <div className="input-box">
              <label>Upload File</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={this.handleFileChange}
              />
            </div>

            <div>
              <button type="submit" className="sellWithUs-button">
                Send
              </button>
            </div>
          </form>
        </section>
        <br />
      </div>
    );
  }
}
