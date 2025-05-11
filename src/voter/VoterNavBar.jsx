import { Routes, Route, Link } from 'react-router-dom';
import './Voter.css';
import VoterHome from './VoterHome';
import VoteNow from './VoteNow';
import ViewElections from './ViewElections';
import UpdateVoterProfile from './UpdateVoterProfile';
import VoterLogin from './VoterLogin';
import VoterProfile from './VoterProfile'; // ✅ Import added
import { useAuth } from '../contextapi/AuthContext';

export default function VoterNavBar() {
  const { setIsVoterLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsVoterLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Voter</div>
        <ul className="nav-links">
          <li><Link to="/voterhome">Home</Link></li>
          <li><Link to="/viewelections">View Elections</Link></li>
          <li><Link to="/votenow">Vote Now</Link></li>
          <li><Link to="/voterprofile">Profile</Link></li> {/* ✅ New link */}
          <li><Link to="/updatevoterprofile">Update Profile</Link></li>
          <li><Link to="/voterlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/voterhome" element={<VoterHome />} />
        <Route path="/viewelections" element={<ViewElections />} />
        <Route path="/votenow" element={<VoteNow />} />
        <Route path="/voterprofile" element={<VoterProfile />} /> {/* ✅ New route */}
        <Route path="/updatevoterprofile" element={<UpdateVoterProfile />} />
        <Route path="/voterlogin" element={<VoterLogin />} />
      </Routes>
    </div>
  );
}
