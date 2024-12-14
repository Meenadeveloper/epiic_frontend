import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional for toast notifications
import 'react-toastify/dist/ReactToastify.css';

function CorporateLoginForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(''); // To display server-side errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setServerError(''); // Clear server error on input change
  };

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({}); // Clear previous errors
    setServerError(''); // Clear server error

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Perform API call
      const response = await fetch(process.env.REACT_APP_LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Login successful!');
        localStorage.setItem('access_token', data.token);
        // Redirect to dashboard or desired route
        window.location.href = '/corporate-dashboard';
      } else {
        const errorData = await response.json();

        // Handle specific errors from the server
        if (errorData.message) {
          setServerError(errorData.message);
        } else {
          setServerError('Login failed. Please try again.');
        }
      }
    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="custom-container">
          <div className="login-box">
            <div className="back-btn-box">
              <button
                className="back-btn"
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = '/'; // Replace '/' with your fallback URL
                  }
                }}
              >
                Back
              </button>
            </div>
            <div className="login-grid-box">
              <div className="login-grid-item login-tittle-box">
                <h2 className="login-head">
                  Login Form Page
                  <p className="login-text">Lorem Ipsum</p>
                </h2>
              </div>
              <div className="login-grid-item">
                <div className="login-form-box">
                  <h2 className="login-form-heading">CORPORATE LOGIN</h2>
                  <form className="login-form" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="form-control login-input">
                      <label htmlFor="email" className="input-label">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="input-text"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && <p className="error">{formErrors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                      <label htmlFor="password" className="input-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Must be at least 8 characters"
                        className="input-text"
                        value={formValues.password}
                        onChange={handleInputChange}
                      />
                      {formErrors.password && <p className="error">{formErrors.password}</p>}
                      <div className="form-link-box">
                        <Link to="#" className="forgot-link">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    {/* Display Server-Side Error */}
                    {serverError && <p className="error">{serverError}</p>}

                    {/* Submit Button */}
                    <div className="form-control">
                      <button type="submit" className="login-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </form>

                  {/* Additional Links */}
                  <div className="form-control" style={{ marginBottom: '10px' }}>
                    <Link to="/corporate-basic-register" className="sign-link">
                      Sign Up/Not Registered Yet?
                    </Link>
                  </div>

                  <div className="form-multi-link">
                    <Link to="/corporate-basic-register" className="form-link">
                      Corporate /
                    </Link>
                    <Link to="/college-basic-register" className="form-link">
                      College /
                    </Link>
                    <Link to="/candidate-basic-register" className="form-link">
                      Candidate /
                    </Link>
                    <Link to="#" className="form-link">
                      Speaker
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporateLoginForm;
