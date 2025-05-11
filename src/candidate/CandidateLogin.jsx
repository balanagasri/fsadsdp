import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function CandidateLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsCandidateLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/candidate/checkcandidatelogin`, formData);
      if (response.data) {
        setIsCandidateLoggedIn(true);
        sessionStorage.setItem('candidate', JSON.stringify(response.data));
        setFormData({ username: '', password: '' });
        navigate('/candidatehome');
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data || 'An unexpected error occurred.');
      } else {
        setError('Unable to connect to the server.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          .login-box {
            background-color: rgba(255, 255, 255, 0.9);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
            max-width: 400px;
            margin: auto;
            font-family: 'Roboto', sans-serif;
          }

          .login-box h3 {
            margin-bottom: 20px;
            color: #333;
          }

          .login-box label {
            display: block;
            margin: 10px 0 5px;
            color: #444;
          }

          .login-box input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1em;
          }

          .button {
            width: 100%;
            padding: 12px;
            background-color: #1e88e5;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .button:hover {
            background-color: #1565c0;
          }

          .message {
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
          }
        `}
      </style>

      <div className="login-box">
        <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Candidate Login</h3>
        {message ? (
          <p className="message" style={{ color: 'green' }}>{message}</p>
        ) : (
          <p className="message" style={{ color: 'red' }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: `url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1950&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  }
};
