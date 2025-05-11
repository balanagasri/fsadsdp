import { useState, useEffect } from 'react';

export default function CandidateProfile() {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const storedCandidate = sessionStorage.getItem('candidate');
    if (storedCandidate) {
      setCandidate(JSON.parse(storedCandidate));
    }
  }, []);

  if (!candidate) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
        Loading candidate profile...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          .profile-box {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            width: 400px;
            color: #fff;
            font-family: 'Roboto', sans-serif;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border: 1px solid rgba(255, 255, 255, 0.18);
            text-align: left;
          }

          .profile-box h2 {
            text-align: center;
            font-size: 30px;
            margin-bottom: 25px;
            color: #ffffff;
          }

          .profile-box p {
            font-size: 16px;
            margin: 8px 0;
          }

          .profile-box strong {
            color: #ffd700;
          }
        `}
      </style>

      <div className="profile-box">
        <h2>Candidate Profile</h2>
        <p><strong>ID:</strong> {candidate.id}</p>
        <p><strong>Name:</strong> {candidate.name}</p>
        <p><strong>Gender:</strong> {candidate.gender}</p>
        <p><strong>Date of Birth:</strong> {candidate.dob}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Username:</strong> {candidate.username}</p>
        <p><strong>Mobile No:</strong> {candidate.mobileno}</p>
        <p><strong>Party:</strong> {candidate.party}</p>
        <p><strong>Contesting Area:</strong> {candidate.area}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  }
};
