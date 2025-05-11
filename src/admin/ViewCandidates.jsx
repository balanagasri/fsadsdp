import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

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

export default function ViewCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallcandidates`);
      setCandidates(response.data);
      setError('');
    } catch (err) {
      console.error(err); // Log to console for dev
      let errorMsg = 'Failed to fetch candidates. ';
      if (err.response && typeof err.response.data === 'string') {
        errorMsg += err.response.data;
      } else if (err.message) {
        errorMsg += err.message;
      } else {
        errorMsg += 'Unknown error';
      }
      setError(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>All Registered Candidates</h3>

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
              <th style={styles.th}>Party</th>
              <th style={styles.th}>Area</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr
                  key={candidate.id || index}
                  style={index % 2 === 0 ? styles.trEven : {}}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={styles.thTd}>{candidate.id}</td>
                  <td style={styles.thTd}>{candidate.name}</td>
                  <td style={styles.thTd}>{candidate.gender}</td>
                  <td style={styles.thTd}>{candidate.dob}</td>
                  <td style={styles.thTd}>{candidate.email}</td>
                  <td style={styles.thTd}>{candidate.username}</td>
                  <td style={styles.thTd}>{candidate.mobileno}</td>
                  <td style={styles.thTd}>{candidate.party}</td>
                  <td style={styles.thTd}>{candidate.area}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={styles.thTd}>
                  No candidates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
