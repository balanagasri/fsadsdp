import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddCandidate() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/candidate/registration`, formData);
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
          party: '',
          area: ''
        });
      }
    } catch (error) {
      setMessage('');
      setError(error.response?.data || "An unexpected error occurred.");
    }
  };

  const containerStyle = {
    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/VVPAT_logo.svg/1200px-VVPAT_logo.svg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '100%'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={{ textAlign: "center", textDecoration: "underline", marginBottom: "20px" }}>Add Candidate</h3>

        {message && <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>{message}</p>}
        {error && <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>{error}</p>}

        <div>
          <label style={labelStyle}>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} style={inputStyle} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Mobile No</label>
          <input type="text" id="mobileno" value={formData.mobileno} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Party</label>
          <input type="text" id="party" value={formData.party} onChange={handleChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Area</label>
          <input type="text" id="area" value={formData.area} onChange={handleChange} style={inputStyle} required />
        </div>
        <button type="submit" style={buttonStyle}>Add</button>
      </form>
    </div>
  );
}
