import { Routes, Route, Link } from 'react-router-dom';
import './candidate.css';
import CandidateHome from './CandidateHome';
import ViewElections from './ViewElectionDetails';
import UpdateCandidateProfile from './UpdateCandidateProfile';
import CandidateLogin from './CandidateLogin';
import CandidateProfile from './CandidateProfile';
import { useAuth } from '../contextapi/AuthContext';

export default function CandidateNavBar() {
  const { setIsCandidateLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsCandidateLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Candidate</div>
        <ul className="nav-links">
          <li><Link to="/candidatehome">Home</Link></li>
          <li><Link to="/viewelections">View Elections</Link></li>
          <li><Link to="/candidateprofile">Profile</Link></li>
          <li><Link to="/updatecandidateprofile">Update Profile</Link></li>
          <li><Link to="/candidatelogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/candidatehome" element={<CandidateHome />} />
        <Route path="/viewelections" element={<ViewElections />} />
        <Route path="/candidateprofile" element={<CandidateProfile />} />
        <Route path="/updatecandidateprofile" element={<UpdateCandidateProfile />} />
        <Route path="/candidatelogin" element={<CandidateLogin />} />
      </Routes>
    </div>
  );
}
