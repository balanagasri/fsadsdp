import { useState, useEffect } from 'react';

export default function VoterProfile() {
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const storedVoter = sessionStorage.getItem('voter');
    if (storedVoter) {
      setVoter(JSON.parse(storedVoter));
    }
  }, []);

  if (!voter) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '28px', color: '#a12d33', marginBottom: '20px' }}>
        Voter Profile
      </h2>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '25px',
          width: '400px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p><strong>Name:</strong> {voter.name}</p>
        <p><strong>Gender:</strong> {voter.gender}</p>
        <p><strong>Date of Birth:</strong> {voter.dob}</p>
        <p><strong>Email:</strong> {voter.email}</p>
        <p><strong>Username:</strong> {voter.username}</p>
        <p><strong>Mobile No:</strong> {voter.mobileno}</p>
        <p><strong>Voting Area:</strong> {voter.votingArea}</p>
        <p><strong>Voter ID:</strong> {voter.voterID}</p>
        <p><strong>Aadhar ID:</strong> {voter.aadharID}</p>
      </div>
    </div>
  );
}
