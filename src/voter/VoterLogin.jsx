import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

export default function VoterLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const navigate = useNavigate();
  const { setIsVoterLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/voter/checkvoterlogin`, formData);
      if (response.status === 200) {
        setIsVoterLoggedIn(true);
        sessionStorage.setItem('voter', JSON.stringify(response.data));
        navigate('/voterhome');
      } else {
        setMessage(response.data);
        setError('');
      }
    } catch (err) {
      setMessage('');
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    },
    formWrapper: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '25px',
      color: '#333'
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
    recaptcha: {
      margin: '15px 0 20px',
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    message: {
      textAlign: 'center',
      fontWeight: '600',
      marginBottom: '15px'
    },
    success: {
      color: 'green'
    },
    error: {
      color: 'red'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h3 style={styles.title}>Voter Login</h3>

        {message && <p style={{ ...styles.message, ...styles.success }}>{message}</p>}
        {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <div style={styles.recaptcha}>
            <ReCAPTCHA
              sitekey="6Lda6DQrAAAAANDwzhEB0C0-xmu4chERVdVTkGfH"
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
