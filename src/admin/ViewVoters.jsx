import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // Adjust the path to where config.js is located

// Inline styles for the component
const styles = {
  container: {
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tableResponsive: {
    maxWidth: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  },
  thTd: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  th: {
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
  },
  trEven: {
    backgroundColor: '#f9f9f9',
  },
  trHover: {
    backgroundColor: '#f1f1f1',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default function ViewVoters() {
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallvoters`);
      setVoters(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch voters. ' + (err.response?.data || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>All Registered Voters</h3>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.tableResponsive}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>DOB</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Mobile No</th>
              <th style={styles.th}>Voting Area</th>
              <th style={styles.th}>Voter ID</th>
              <th style={styles.th}>Aadhar ID</th>
            </tr>
          </thead>
          <tbody>
            {voters.length > 0 ? (
              voters.map((voter, index) => (
                <tr
                  key={voter.id || index}
                  style={index % 2 === 0 ? styles.trEven : {}}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={styles.thTd}>{voter.id}</td>
                  <td style={styles.thTd}>{voter.name}</td>
                  <td style={styles.thTd}>{voter.gender}</td>
                  <td style={styles.thTd}>{voter.dob}</td>
                  <td style={styles.thTd}>{voter.email}</td>
                  <td style={styles.thTd}>{voter.username}</td>
                  <td style={styles.thTd}>{voter.mobileno}</td>
                  <td style={styles.thTd}>{voter.votingArea}</td>
                  <td style={styles.thTd}>{voter.voterID}</td>
                  <td style={styles.thTd}>{voter.aadharID}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={styles.thTd}>
                  No voters found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
