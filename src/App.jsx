import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import VoterNavBar from "./voter/VoterNavBar";
import CandidateNavBar from "./candidate/CandidateNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

function AppContent() {
  const { isAdminLoggedIn, isVoterLoggedIn, isCandidateLoggedIn } = useAuth();

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isVoterLoggedIn ? (
          <VoterNavBar />
        ) : isCandidateLoggedIn ? (
          <CandidateNavBar />
        ) : (
          <MainNavBar />
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
