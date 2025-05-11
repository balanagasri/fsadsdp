import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // config.js contains backend base URL

export default function AdminDashboard() {
  const [voterCount, setVoterCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [votersRes, candidatesRes, votesRes] = await Promise.all([
          axios.get(`${config.url}/admin/votercount`),
          axios.get(`${config.url}/admin/candidatecount`),
          axios.get(`${config.url}/admin/totalvotes`)
        ]);

        setVoterCount(votersRes.data);
        setCandidateCount(candidatesRes.data);
        setVoteCount(votesRes.data);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to load dashboard statistics. Please try again later.');
      }
    };

    fetchCounts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Voting Dashboard</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cardWrapper}>
        <DashboardCard title="Total Voters" count={voterCount} color="#1e88e5" />
        <DashboardCard title="Total Candidates" count={candidateCount} color="#43a047" />
        <DashboardCard title="Votes Cast" count={voteCount} color="#e53935" />
      </div>
    </div>
  );
}

function DashboardCard({ title, count, color }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={{ ...styles.count, color }}>{count}</p>
    </div>
  );
}

// Reusable Styles
const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh'
  },
  heading: {
    color: '#333'
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    marginTop: '30px',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '25px',
    width: '220px'
  },
  cardTitle: {
    marginBottom: '10px',
    color: '#444'
  },
  count: {
    fontSize: '30px',
    fontWeight: 'bold'
  }
};
