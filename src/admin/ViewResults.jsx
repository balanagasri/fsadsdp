import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewResults() {
  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${config.url}/admin/results`)
      .then(res => {
        const data = res.data;
        setCandidates(data);
        const topCandidate = data.reduce((max, cand) => cand.votes > max.votes ? cand : max, data[0]);
        setWinner(topCandidate);
      })
      .catch(err => {
        console.error('Error fetching results:', err);
        setError('Failed to load results.');
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Election Results</h2>
      {error && <p style={styles.error}>{error}</p>}

      {winner && (
        <div style={styles.winnerCard}>
          <h3>🏆 Winner: {winner.name}</h3>
          <p>Total Votes: {winner.votes}</p>
        </div>
      )}

      <div style={styles.cardWrapper}>
        {candidates.map(c => (
          <div key={c.id} style={styles.card}>
            <h4>{c.name}</h4>
            <p>Votes: {c.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
  },
  error: {
    color: 'red',
  },
  winnerCard: {
    backgroundColor: '#d1e7dd',
    border: '2px solid #0f5132',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  cardWrapper: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    width: '200px',
    backgroundColor: '#fff',
  }
};
