import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Vérifie si le token existe (donc utilisateur connecté)
  const token = localStorage.getItem("token");

  if (!token) {
    // pas connecté → redirection vers login
    return <Navigate to="/" replace />;
  }

  // connecté → on affiche la page protégée
  return children;
}
