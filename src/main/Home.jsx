import React from 'react';

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heading}>Welcome to the Online Voting System</h1>
        <p style={styles.description}>
          Experience a fast, secure, and convenient way to cast your vote online. Our system is designed to ensure 
          <strong> transparency</strong>, <strong>integrity</strong>, and <strong>ease of use</strong>.
        </p>

        <div style={styles.features}>
          <h2 style={styles.featureTitle}>Key Features</h2>
          <ul style={styles.featureList}>
            <li>✅ Easy voter registration</li>
            <li>🔐 Secure login system</li>
            <li>🗳️ Cast votes with a single click</li>
            <li>📈 Real-time results tracking</li>
            <li>📱 Mobile & desktop responsive</li>
            <li>🌐 Multi-language support</li>
          </ul>
        </div>

        <div style={styles.cta}>
          <h2 style={styles.ctaTitle}>Get Started</h2>
          <div style={styles.buttons}>
            <a href="/voterregistration" style={{ ...styles.button, ...styles.greenBtn }}>Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e0f7fa, #d0f0c0)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  hero: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '3rem 2.5rem',
    borderRadius: '15px',
    maxWidth: '850px',
    width: '100%',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.2rem',
    color: '#34495e',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  features: {
    textAlign: 'left',
    marginBottom: '2rem',
  },
  featureTitle: {
    fontSize: '1.6rem',
    color: '#27ae60',
    marginBottom: '0.5rem',
  },
  featureList: {
    listStyleType: 'none',
    paddingLeft: 0,
    lineHeight: '2rem',
    fontSize: '1.1rem',
    color: '#2d3436',
  },
  cta: {
    marginTop: '2rem',
  },
  ctaTitle: {
    fontSize: '1.5rem',
    color: '#2980b9',
    marginBottom: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  button: {
    textDecoration: 'none',
    padding: '0.75rem 1.75rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease-in-out',
  },
  greenBtn: {
    backgroundColor: '#2ecc71',
    color: '#fff',
  },
  blueBtn: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
};
