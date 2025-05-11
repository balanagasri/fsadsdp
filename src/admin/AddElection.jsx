import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddElection() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    electionType: '',
    city: '',
    station: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for valid dates
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('End date must be after the start date.');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/admin/addelection`, formData);

      // Only reset form if the election was added successfully
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          electionType: '',
          city: '',
          station: ''
        });
      } else {
        setMessage('');
        setError('Failed to add election.');
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data || 'An error occurred while adding the election.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Add New Election</h3>
      {message ? (
        <p style={{ ...styles.message, color: 'green' }}>{message}</p>
      ) : (
        <p style={{ ...styles.message, color: 'red' }}>{error}</p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Election Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={styles.formGroup}>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div style={styles.formGroup}>
          <label>Start Date</label>
          <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div style={styles.formGroup}>
          <label>End Date</label>
          <input type="date" id="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
        <div style={styles.formGroup}>
          <label>Election Type</label>
          <select id="electionType" value={formData.electionType} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="presidential">Presidential</option>
            <option value="parliamentary">Parliamentary</option>
            <option value="local">Local</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>City</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div style={styles.formGroup}>
          <label>Station</label>
          <input type="text" id="station" value={formData.station} onChange={handleChange} required />
        </div>
        <button type="submit" style={styles.button}>Add Election</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '40px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9'
  },
  title: {
    textAlign: "center",
    textDecoration: "underline",
    marginBottom: "20px"
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "15px"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  button: {
    padding: '10px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};
