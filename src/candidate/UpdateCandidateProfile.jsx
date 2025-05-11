import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function UpdateCandidateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    party: '',
    area: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCandidate = sessionStorage.getItem('candidate');
    if (storedCandidate) {
      setFormData(JSON.parse(storedCandidate));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/candidate/updatecandidateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('candidate', JSON.stringify(formData));
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={styles.background}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        `}
      </style>

      <div style={styles.formContainer}>
        <h3 style={styles.heading}>Update Candidate Profile</h3>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {[
            ['name', 'Full Name', 'text'],
            ['gender', 'Gender', 'select'],
            ['dob', 'Date of Birth', 'date'],
            ['email', 'Email', 'email'],
            ['username', 'Username', 'text'],
            ['password', 'Password', 'password'],
            ['mobileno', 'Mobile No', 'tel'],
            ['party', 'Party Name', 'text'],
            ['area', 'Constituency/Area', 'text']
          ].map(([id, label, type]) => (
            <div key={id} style={{ marginBottom: '15px' }}>
              <label htmlFor={id} style={styles.label}>{label}</label>
              {
                type === 'select' ? (
                  <select
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    disabled={id === 'gender'}
                    style={styles.input}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    disabled={id === 'username'}
                    style={styles.input}
                  />
                )
              }
            </div>
          ))}

          <button type="submit" style={styles.button}>Update Profile</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    padding: '20px',
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    maxWidth: '450px',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  heading: {
    textAlign: 'center',
    textDecoration: 'underline',
    marginBottom: '20px',
    color: '#ffd700',
    fontSize: '24px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#fff'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  success: {
    color: '#28a745',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px'
  }
};
