import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Stagiaires from "./pages/Stagiaires";
import './styles/colors.css';
import Participants from "./pages/Participants";
import Formateurs from "./pages/Formateurs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion (accessible à /) */}
        <Route path="/" element={<Login />} />

        {/* Page d'inscription */}
        <Route path="/register" element={<Register />} />

        {/* Page Stagiaires après connexion */}
        <Route path="/stagiaires" element={<Stagiaires />} />

        {/* Page Participants après connexion */}
        <Route path="/participants" element={<Participants />} />

        {/* Page Formateurs après connexion */}
        <Route path="/formateurs" element={<Formateurs />} />

        {/* Dashboard protégé */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
