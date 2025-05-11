import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function VoterRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    votingArea: '',
    voterID: '',
    aadharID: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.id]: '' });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar);
  const isValidVoterID = (voterID) => /^\d{10}$/.test(voterID);
  const isValidPassword = (password) => password.length >= 8;
  const isAdult = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  const validateForm = () => {
    const errors = {};

    if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!isValidMobile(formData.mobileno)) {
      errors.mobileno = 'Mobile number must be 10 digits and start with 6-9.';
    }

    if (!isValidAadhar(formData.aadharID)) {
      errors.aadharID = 'Aadhar ID must be exactly 12 digits.';
    }

    if (!isValidVoterID(formData.voterID)) {
      errors.voterID = 'Voter ID must be exactly 10 digits.';
    }

    if (!isValidPassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!isAdult(formData.dob)) {
      errors.dob = 'You must be at least 18 years old to register.';
    }

    if (formData.gender === '') {
      errors.gender = 'Please select a gender.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(`${config.url}/voter/registration`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          gender: '',
          dob: '',
          email: '',
          username: '',
          password: '',
          mobileno: '',
          votingArea: '',
          voterID: '',
          aadharID: ''
        });
        setValidationErrors({});
      }
    } catch (err) {
      setMessage('');
      setError(err.response ? err.response.data : 'An unexpected error occurred.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff3e0, #e8f5e9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px 10px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '550px',
        backgroundColor: '#fff',
        padding: '35px 30px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontSize: '1.8rem',
          color: '#2c3e50'
        }}>
          Voter Registration
        </h2>

        {message && <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {[
            ['name', 'Full Name', 'text'],
            ['gender', 'Gender', 'select'],
            ['dob', 'Date of Birth', 'date'],
            ['email', 'Email', 'email'],
            ['username', 'Username', 'text'],
            ['password', 'Password', 'password'],
            ['mobileno', 'Mobile No', 'tel'],
            ['votingArea', 'Voting Area', 'text'],
            ['voterID', 'Voter ID', 'text'],
            ['aadharID', 'Aadhar ID', 'text']
          ].map(([id, label, type]) => (
            <div key={id} style={{ marginBottom: '15px' }}>
              <label htmlFor={id} style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#2c3e50' }}>
                {label}
              </label>
              {type === 'select' ? (
                <select
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <input
                  type={type === 'password' && !passwordVisible ? 'password' : type}
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                />
              )}
              {validationErrors[id] && (
                <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>{validationErrors[id]}</p>
              )}
            </div>
          ))}

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
