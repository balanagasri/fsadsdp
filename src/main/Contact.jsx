import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    email: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true); // Set loading to true before making the request

    try {
      const response = await axios.post(`${config.url}/sendemail`, formData);
      setMessage(response.data);
      setError('');
      
      // Clear form fields after successful submission
      setFormData({
        name: '',
        subject: '',
        message: '',
        email: '',
        location: ''
      });
    } catch (err) {
      setError('Failed to send email. Please try again later.');
      setMessage('');
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state after request is complete
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Contact Us</h3>
      {message && (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bolder' }}>{message}</p>
      )}
      {error && !loading && (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>{error}</p>
      )}
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading} // Disable the button while loading
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {loading ? 'Sending...' : 'Submit'} {/* Button text changes based on loading state */}
        </button>
      </form>
    </div>
  );
}
