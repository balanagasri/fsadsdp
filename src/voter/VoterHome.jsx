import { useState, useEffect } from 'react';
import './Voter.css';

export default function VoterHome() {
  const [voter, setVoter] = useState("");

  useEffect(() => {
    const storedVoter = sessionStorage.getItem('voter');
    if (storedVoter) {
      setVoter(JSON.parse(storedVoter));
    }
  }, []);

  return (
    <div className="voter-home-container">
      <div className="welcome-card">
        <h2>Welcome, {voter.name}!</h2>
        <p className="welcome-message">
          We're glad to have you here. Use the navigation bar above to explore elections,
          cast your vote, or manage your profile.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Voter"
          className="voter-avatar"
        />
      </div>
    </div>
  );
}
