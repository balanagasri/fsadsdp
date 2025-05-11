import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/login`, formData); // ✅ Fixed
      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        navigate("/adminhome");
      } else {
        setMessage(response.data);
        setError("");
      }
    } catch (error) {
      setMessage("");
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333'
    },
    form: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px'
    },
    formGroup: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    button: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '12px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%'
    },
    successMessage: {
      color: 'green',
      marginBottom: '15px',
      fontWeight: '600'
    },
    errorMessage: {
      color: 'red',
      marginBottom: '15px',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Voting System Admin Login</h2>

      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}
