import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/colors.css";
import { FiMenu } from "react-icons/fi";

export default function ILOHAYNavbar({ onToggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.post(
          "/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Erreur de déconnexion", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/"); // Redirection vers login
    }
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "var(--ilohay-green)",
        height: "60px",
        zIndex: 1100, // ✅ Toujours au-dessus du sidebar
      }}
      variant="dark"
      fixed="top"
    >
      <Container fluid>
        <Button
          variant="link"
          onClick={onToggleSidebar}
          style={{ color: "white", fontSize: "20px" }}
        >
          <FiMenu />
        </Button>
        {/* Logo / Titre */}
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          style={{
            fontWeight: "bold",
            color: "var(--ilohay-white)",
            fontSize: "20px",
            letterSpacing: "1px",
            marginLeft: "50px",
          }}
        >
          ILOHAY
        </Navbar.Brand>

        {/* Menu responsive */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Lien Dashboard */}
            <Nav.Link
              as={Link}
              to="/dashboard"
              style={{ color: "var(--ilohay-white)", fontWeight: "500" }}
            >
              Dashboard
            </Nav.Link>

            {/* Lien Paramètres (seulement pour admin) */}
            {user?.role === "admin" && (
              <Nav.Link
                as={Link}
                to="/settings"
                style={{ color: "var(--ilohay-white)", fontWeight: "500" }}
              >
                Paramètres
              </Nav.Link>
            )}

            {/* Infos utilisateur */}
            {user && (
              <span
                style={{
                  color: "var(--ilohay-white)",
                  marginLeft: "20px",
                  fontSize: "14px",
                }}
              >
                👤 {user.name} <strong>({user.role})</strong>
              </span>
            )}

            {/* Bouton Déconnexion */}
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              style={{
                marginLeft: "20px",
                backgroundColor: "var(--ilohay-red)",
                border: "none",
              }}
            >
              Déconnexion
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
