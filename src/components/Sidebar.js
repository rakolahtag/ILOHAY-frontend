import { Nav } from "react-bootstrap";
import "../styles/colors.css";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        backgroundColor: "var(--ilohay-green)",
        color: "var(--ilohay-white)",
        padding: "20px",
      }}
    >
      <h5 className="mb-4">Menu</h5>
      <Nav className="flex-column">
        <Nav.Link href="/dashboard" style={{ color: "var(--ilohay-white)" }}>
          Dashboard
        </Nav.Link>
        <Nav.Link href="/stagiaires" style={{ color: "var(--ilohay-white)" }}>
          Stagiaires
        </Nav.Link>
        <Nav.Link href="/participants" style={{ color: "var(--ilohay-white)" }}>
          Participants
        </Nav.Link>
        <Nav.Link href="/formateurs" style={{ color: "var(--ilohay-white)" }}>
          Formateurs
        </Nav.Link>
        <Nav.Link href="/formations" style={{ color: "var(--ilohay-white)" }}>
          Formations
        </Nav.Link>
        <Nav.Link href="/presences" style={{ color: "var(--ilohay-white)" }}>
          Présences
        </Nav.Link>
      </Nav>
    </div>
  );
}
