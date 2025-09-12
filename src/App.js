import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import './styles/colors.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion (accessible à /) */}
        <Route path="/" element={<Login />} />

        {/* Page d'inscription */}
        <Route path="/register" element={<Register />} />

        {/* Page Dashboard après connexion */}
        <Route path="/dashboard" element={<Dashboard />} />

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
