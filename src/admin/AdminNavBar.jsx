import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AddElection from './AddElection';
import AddCandidate from './AddCandidate';
import ViewVoters from './ViewVoters';
import ViewCandidates from './ViewCandidates';
import ViewResults from './ViewResults';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addelection">Add Election</Link></li>
          {/* <li><Link to="/addcandidate">Approve Candidate</Link></li> */}
          <li><Link to="/viewvoters">View Voters</Link></li>
          <li><Link to="/viewcandidates">View Candidates</Link></li>
          <li><Link to="/viewresults">View Results</Link></li>
          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addelection" element={<AddElection />} />
        <Route path="/addcandidate" element={<AddCandidate />} />
        <Route path="/viewvoters" element={<ViewVoters />} />
        <Route path="/viewcandidates" element={<ViewCandidates />} />
        <Route path="/viewresults" element={<ViewResults />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
