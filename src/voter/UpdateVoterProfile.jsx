import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function UpdateVoterProfile() {
  const [formData, setFormData] = useState({
    id: '',
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

  useEffect(() => {
    const storedVoter = sessionStorage.getItem('voter');
    if (storedVoter) {
      setFormData(JSON.parse(storedVoter));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/voter/updatevoterprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('voter', JSON.stringify(formData)); // update session storage
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
    <div style={{
      maxWidth: '400px', // reduced width
      margin: '30px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      backgroundColor: '#fff'
    }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '20px' }}>Update Voter Profile</h3>

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
            <label htmlFor={id} style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{label}</label>
            {
              type === 'select' ? (
                <select
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  disabled={['gender', 'voterID', 'aadharID'].includes(id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
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
                  disabled={['username', 'voterID', 'aadharID'].includes(id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
              )
            }
          </div>
        ))}
        
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Update Profile
        </button>
      </form>
    </div>
  );
}
