import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/colors.css";

export default function Sidebar({ isOpen }) {
  
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        backgroundColor: "var(--ilohay-green)",
        color: "var(--ilohay-white)",
        padding: "20px",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)", // 👈 Slide
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <h5 className="mb-4">Menu</h5>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" style={{ color: "var(--ilohay-white)" }}>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/stagiaires" style={{ color: "var(--ilohay-white)" }}>
          Stagiaires
        </Nav.Link>
        <Nav.Link as={Link} to="/participants" style={{ color: "var(--ilohay-white)" }}>
          Participants
        </Nav.Link>
        <Nav.Link as={Link} to="/formateurs" style={{ color: "var(--ilohay-white)" }}>
          Formateurs
        </Nav.Link>
        <Nav.Link as={Link} to="/formations" style={{ color: "var(--ilohay-white)" }}>
          Formations
        </Nav.Link>
        <Nav.Link as={Link} to="/presences" style={{ color: "var(--ilohay-white)" }}>
          Présences
        </Nav.Link>
      </Nav>
    </div>
  );
}
