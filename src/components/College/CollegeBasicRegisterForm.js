import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import StateInput from './CollegeRegInputs/StateInput';
import DistrictInput from './CollegeRegInputs/DistrictInput';
import InstituteTypeInput from './CollegeRegInputs/InstituteTypeInput';
import InstituteNameInput from './CollegeRegInputs/InstituteNameInput';
import FirstNameInput from './CollegeRegInputs/FirstNameInput';
import LastNameInput from './CollegeRegInputs/LastNameInput';
import LogoInput from '../LogoInput';
import EmailInput from './CollegeRegInputs/EmailInput';
import PhoneInput from './CollegeRegInputs/PhoneInput';
import PasswordInput from './CollegeRegInputs/PasswordInput';
import DesignationInput from './CollegeRegInputs/DesignationInput';

function CollegeBasicRegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    college_id: '',
    name: '',
    last_name: '',
    email_id: '',
    mobile: '',
    designation: '',
    password: '',
    college_logo: null,
    state_name: '',
    districtName:'',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!formData.college_id) {
      errors.college_id = 'College ID is required';
    }

    if (!formData.name) {
      errors.name = 'First name is required';
    }
    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email_id) {
      errors.email_id = 'Email is required';
    } else if (!emailRegex.test(formData.email_id)) {
      errors.email_id = 'Invalid email format';
    }

    const phoneRegex = /^\+91\d{10}$/;
    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(formData.mobile)) {
      errors.mobile = 'Mobile number must be in the format "+91XXXXXXXXXX"';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.designation) {
      errors.designation = 'Designation is required';
    }

    if (!formData.state_name) {
      errors.state_name = 'State name is required';
    }

    if (!formData.college_logo) {
      errors.college_logo = 'College logo is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          name: `${formData.name} ${formData.last_name}`,
          organization_name: formData.name,
          email: formData.email_id,
          password: formData.password,
          mobile: formData.mobile,
          designation: formData.designation,
        };
        const url = process.env.REACT_APP_EPIIC_CORPORATE_BASIC_REGISTER_URL;
        const params = new URLSearchParams(payload).toString();
        const fullUrl = `${url}?${params}`;

        const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('form_data', JSON.stringify(formData));
          // Reset form fields using document.querySelector
        document.querySelector('form').reset();
          toast.success(data.message || 'Form submitted successfully!', {
            position: 'top-right',
            className: 'toast-success',
          });
        } else {
          const errorData = await response.json();
        // Reset form fields using document.querySelector
        document.querySelector('form').reset();
          toast.error(errorData.message || 'Failed to submit form. Please try again.', {
            position: 'top-right',
            className: 'toast-error',
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('An error occurred while submitting the form. Please try again later.', {
          position: 'top-right',
          className: 'toast-error',
        });
      }
    } else {
      toast.error('Please fix the form errors before submitting.', {
        position: 'top-right',
        className: 'toast-error',
      });
    }
  };

  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');

  const handleStateSelect = (stateId, stateName) => {
    setSelectedStateId(stateId);
    setSelectedStateName(stateName);
  };

  return (
    <div className="register-container">
      <div className="custom-container">
        <div className="register-box">
          <div className="back-btn-box">
            <button
              className="back-btn"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
            >
              Back
            </button>
          </div>

          <div className="register-form-container">
            <div className="register-form-box college-register">
              <div className="reg-form-content-box">
                <div className="register-heading">
                  <h2>COLLEGE REGISTRATION</h2>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                  {/* <input type="hidden" name="college_id" value={formData.college_id} /> */}

                  <div className="register-row">
                    <div className="register-col">
                      <StateInput
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                        onStateSelect={handleStateSelect}
                        selectedStateName={selectedStateName}
                        selectedStateId={selectedStateId}
                        name="state_name"
                      />
                    </div>

                    <div className="register-col">
                      <DistrictInput
                        name="districtName"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="register-row">
                    <div className="register-col">
                      <InstituteTypeInput
                        name="instituteType"
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="register-col">
                      <InstituteNameInput />
                    </div>
                  </div>

                  <div className="borderless-form-box">
                    <h2 className="form-sub-head">Personal Details</h2>

                    <div className="register-row">
                      <div className="register-col">
                        <FirstNameInput
                          name="name"
                          formData={formData}
                          formErrors={formErrors}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="register-col">
                        <LastNameInput
                          name="last_name"
                          formData={formData}
                          formErrors={formErrors}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="register-row">
                      <div className="register-col">
                        <EmailInput
                          name="email_id"
                          formData={formData}
                          formErrors={formErrors}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="register-row">
                      <div className="register-col">
                        <PhoneInput
                          name="mobile"
                          formData={formData}
                          formErrors={formErrors}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="register-row">
                      <div className="register-col">
                        <PasswordInput
                          name="password"
                          formData={formData}
                          formErrors={formErrors}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="register-col">
                        <DesignationInput
                          name="designation"
                          formData={formData}
                          formErrors={formErrors}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>

                    <LogoInput
                      name="college_logo"
                      formData={formData}
                      formErrors={formErrors}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="d-center">
                    <button type="submit" className="save-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeBasicRegisterForm;
