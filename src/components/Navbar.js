import { Navbar, Container, Nav } from "react-bootstrap";
import "../styles/colors.css";

export default function ILOHAYNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "var(--ilohay-green)" }} variant="dark">
      <Container>
        <Navbar.Brand href="/dashboard" style={{ fontWeight: "bold", color: "var(--ilohay-white)" }}>
          ILOHAY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/dashboard" style={{ color: "var(--ilohay-white)" }}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="/settings" style={{ color: "var(--ilohay-white)" }}>
              Paramètres
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
