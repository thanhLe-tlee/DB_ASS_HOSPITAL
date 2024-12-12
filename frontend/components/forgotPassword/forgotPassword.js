// document
//   .getElementById("forgotPasswordForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the form from submitting the default way

//     const email = document.getElementById("email").value;

//     // Send the email to the backend to handle the password reset request
//     fetch("/send-password-reset", {
//       // Assume the backend endpoint is /send-password-reset
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: email }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           alert(
//             "Password reset link has been sent to " +
//               email +
//               ". Please check your inbox."
//           );
//           window.location.href = "login.html"; // Redirect to login page after success
//         } else {
//           alert("Error: " + data.message); // Show error if something goes wrong
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert(
//           "An error occurred while sending the reset email. Please try again later."
//         );
//       });
//   });

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here (using EmailJS or your API)
    console.log("Password reset requested for", email);
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-button">
          Reset Password
        </button>
      </form>
      <div className="links">
        <Link to="/login">Remembered your password? Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
