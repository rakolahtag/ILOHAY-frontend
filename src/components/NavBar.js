import { Navbar, Container, Nav } from "react-bootstrap";

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ILOHAY</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/stagiaires">Stagiaires</Nav.Link>
          <Nav.Link href="/formateurs">Formateurs</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
