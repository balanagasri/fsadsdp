import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Voter.css';
import config from '../config'; // make sure this has your backend URL

export default function VoteNow() {
  const [candidates, setCandidates] = useState([]);  // Store candidates as a flat list
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [voterId, setVoterId] = useState(1); // Set this dynamically (maybe from a logged-in user context)

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${config.url}/voter/allcandidates`);
        setCandidates(res.data);  // Assuming the response is a flat list of candidates
        setLoading(false);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setLoading(false);
        setMessage("Failed to load candidates. Please try again.");
      }
    };

    fetchCandidates();
  }, []);

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      setMessage("Please select a candidate before submitting your vote.");
      return;
    }

    try {
      const voteData = {
        voterId: voterId, // Use dynamic voterId (could be fetched from auth state)
        candidateId: selectedCandidate,
      };
      const response = await axios.post(`${config.url}/voter/submitvote`, voteData);
      setMessage(response.data || "Vote submitted successfully!");
    } catch (err) {
      console.error('Error submitting vote:', err);
      setMessage("Vote submission failed. Please try again.");
    }
  };

  return (
    <div className="voter-home-container">
      <div className="elections-card">
        <h2>Vote Now</h2>
        {loading ? (
          <p>Loading candidates...</p>
        ) : candidates.length === 0 ? (
          <p>No candidates available.</p>
        ) : (
          <div className="election-item">
            <p>Select your candidate:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {candidates.map((candidate) => (
                <li key={candidate.id} style={{ marginBottom: '10px' }}>
                  <label>
                    <input
                      type="radio"
                      name="vote"
                      onChange={() => handleSelectCandidate(candidate.id)}
                    />
                    {candidate.name}
                  </label>
                </li>
              ))}
            </ul>
            <button className="vote-btn" onClick={handleSubmitVote}>
              Submit Vote
            </button>
          </div>
        )}
        {message && <p className="vote-message">{message}</p>}
      </div>
    </div>
  );
}
