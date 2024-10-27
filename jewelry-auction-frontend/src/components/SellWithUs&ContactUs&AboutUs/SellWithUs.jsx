import React, { Component } from "react";
import "./SellWithUs.css";
import yourImage from "./Images/SellWithUs.png";

export default class SellWithUs extends Component {
  state = {
    itemName: "",
    price: 0,
    message: "",
    filePath: "",
    errors: {},
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (name, value) => {
    let errors = this.state.errors;

    // Example validation logic
    if (name === "itemName" && value.length < 3) {
      errors.itemName = "Item name must be at least 3 characters long.";
    } else {
      errors.itemName = "";
    }

    if (name === "price" && value <= 0) {
      errors.price = "Price must be greater than 0.";
    } else {
      errors.price = "";
    }

    this.setState({ errors });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7137/api/SellWithUs/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: this.state.itemName,
          price: this.state.price,
          message: this.state.message,
          filePath: this.state.filePath,
        }),
      });

      if (response.ok) {
        alert("Item submitted successfully!");
        this.setState({ itemName: "", price: 0, message: "", filePath: "", errors: {} });
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting your item. Please try again.");
    }
  };

  isFormValid = () => {
    const { itemName, price, message, errors } = this.state;
    return (
      itemName &&
      price > 0 &&
      message &&
      !Object.values(errors).some((error) => error !== "")
    );
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