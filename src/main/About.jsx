import React from 'react';

export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>About the Online Voting System</h1>
        <p style={styles.description}>
          The Online Voting System is a secure, efficient, and user-friendly platform designed to modernize the way we vote.
          By leveraging modern web technologies and strong authentication methods, it ensures that the voting process is
          transparent and tamper-proof.
        </p>

        <h2 style={styles.subheading}>Our Mission</h2>
        <p style={styles.text}>
          To make voting accessible to everyone, everywhere—safely, reliably, and effortlessly. We aim to promote democratic
          participation through technology while maintaining the highest standards of security and usability.
        </p>

        <h2 style={styles.subheading}>Core Values</h2>
        <ul style={styles.list}>
          <li>🔒 Security and Integrity</li>
          <li>⚖️ Transparency and Fairness</li>
          <li>🌍 Accessibility for All</li>
          <li>🚀 Innovation and Usability</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e3f2fd, #e0f7fa)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '3rem',
    borderRadius: '15px',
    maxWidth: '850px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.4rem',
    color: '#2c3e50',
    marginBottom: '1.2rem',
  },
  description: {
    fontSize: '1.2rem',
    color: '#34495e',
    lineHeight: '1.7',
    marginBottom: '2rem',
  },
  subheading: {
    fontSize: '1.6rem',
    color: '#27ae60',
    marginTop: '1.5rem',
    marginBottom: '0.8rem',
  },
  text: {
    fontSize: '1.1rem',
    color: '#2d3436',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  list: {
    fontSize: '1.1rem',
    color: '#2d3436',
    lineHeight: '2rem',
    paddingLeft: '1.2rem',
  },
};
