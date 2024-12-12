import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    fetch(`/reset-password?token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsername(data.username);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to verify token. Please try again later.");
      });
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Handle password reset logic here
    console.log("Password reset for", username);
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      {error && <p className="error">{error}</p>}
      {username && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default ResetPassword;