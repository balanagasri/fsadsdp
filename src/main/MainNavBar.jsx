import { Routes, Route, Link } from 'react-router-dom';
import './style.css';

import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';

import VoterLogin from './../voter/VoterLogin';
import VoterRegistration from './../voter/VoterRegistration';
import AdminLogin from './../admin/AdminLogin';
import CandidateLogin from './../candidate/CandidateLogin';
import CandidateRegister from './../candidate/CandidateRegister';

export default function MainNavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Online Voting System</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li className="dropdown">
            <span>Register ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/voterregistration">Voter</Link></li> {/* Updated path here */}
              <li><Link to="/candidateregistration">Candidate</Link></li> {/* Updated path here */}
            </ul>
          </li>
          <li className="dropdown">
            <span>Login ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/voterlogin">Voter</Link></li>
              <li><Link to="/candidatelogin">Candidate</Link></li>
              <li><Link to="/adminlogin">Admin</Link></li>
            </ul>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/voterregistration" element={<VoterRegistration />} exact />
        <Route path="/candidateregistration" element={<CandidateRegister />} exact /> {/* Updated path here */}
        <Route path="/voterlogin" element={<VoterLogin />} exact />
        <Route path="/candidatelogin" element={<CandidateLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}
