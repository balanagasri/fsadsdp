import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import About from './../main/About';
export default function CandidateHome() {
  const [candidate, setCandidate] = useState({});

  useEffect(() => {
    const storedCandidate = sessionStorage.getItem('candidate');
    if (storedCandidate) setCandidate(JSON.parse(storedCandidate));
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-df8b10651799?...")',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const headerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '28px',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const navigationStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#00d4ff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  };

  const cardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '900px',
    width: '100%',
    margin: '20px auto',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  };

  const sectionHeadingStyle = {
    fontSize: '24px',
    color: '#00d4ff',
    marginBottom: '15px',
    borderBottom: '2px solid #00d4ff',
    paddingBottom: '8px',
    width: '100%',
    textAlign: 'left',
  };

  const sectionStyle = {
    marginTop: '20px',
    lineHeight: '1.7',
    fontSize: '16px',
    textAlign: 'left',
    width: '100%',
  };

  const footerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto',
  };

  const footerLinksStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '10px',
  };

  const footerLinkStyle = {
    color: '#ddd',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const footerLinkHoverStyle = {
    color: '#fff',
  };

  const votingLogosStyle = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const logoStyle = {
    height: '40px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2 style={headingStyle}>Candidate Dashboard</h2>
        <p>Welcome, {candidate.name}! Manage your campaign and engage with the online voting process.</p>
      </header>

      <div style={cardStyle}>
        <h3 style={sectionHeadingStyle}>Candidate Tools</h3>
        <ul style={sectionStyle}>
          <li>✅ Update your <Link to="/profile" style={{ color: '#00d4ff' }}>personal and contact information</Link></li>
          <li>✅ Upload or edit your <Link to="/campaign/manifesto" style={{ color: '#00d4ff' }}>election manifesto</Link></li>
          <li>✅ Track election milestones and status updates</li>
          <li>✅ Follow <Link to="/guidelines" style={{ color: '#00d4ff' }}>election commission guidelines</Link></li>
        </ul>
      </div>

      <div style={cardStyle}>
        <h3 style={sectionHeadingStyle}>How Online Voting Works</h3>
        <p style={sectionStyle}>Online voting provides a secure and transparent platform for voters to cast their ballots digitally. Our system ensures the integrity and confidentiality of each vote through advanced encryption and verification processes.</p>
        <ul style={sectionStyle}>
          <li>🔐 Secure authentication using valid credentials (e.g., Aadhar/Voter ID).</li>
          <li>🗳 Each registered voter can cast only one vote.</li>
          <li>📊 Real-time tracking of the election progress and secure result tabulation.</li>
        </ul>
      </div>

      <div style={cardStyle}>
        <h3 style={sectionHeadingStyle}>Best Practices for Candidates</h3>
        <ul style={sectionStyle}>
          <li>📣 Clearly articulate your vision and policies to the electorate.</li>
          <li>🕒 Adhere strictly to campaign deadlines and document submission protocols.</li>
          <li>📄 Uphold ethical campaigning standards and refrain from disseminating misleading information.</li>
          <li>🤝 Engage respectfully with fellow candidates and maintain a positive campaign environment.</li>
        </ul>
      </div>

      <footer style={footerStyle}>
        <div style={footerLinksStyle}>
          <Link to="/terms" style={footerLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, footerLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, footerLinkStyle)}>
            Terms & Conditions
          </Link>
          <Link to="/privacy"  style={footerLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, footerLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, footerLinkStyle)}>
            Privacy Policy
          </Link>
          <Link to="/about" style={footerLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, footerLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, footerLinkStyle)}>
            About
          </Link>
          <Link to="/contact" style={footerLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, footerLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, footerLinkStyle)}>
            Contact Us
          </Link>
        </div>
        <div style={votingLogosStyle}>
          <span>Proudly Supporting:</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/ECI-Logo.svg/1200px-ECI-Logo.svg.png"
            alt="Election Commission of India"
            style={logoStyle}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/VVPAT_logo.svg/1200px-VVPAT_logo.svg.png"
            alt="VVPAT Logo"
            style={logoStyle}
          />
          {/* Add more voting-related logos as needed */}
        </div>
        <p>&copy; {new Date().getFullYear()} Online Voting Platform</p>
      </footer>
    </div>
  );
}