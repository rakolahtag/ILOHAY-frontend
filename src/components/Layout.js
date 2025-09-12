import { Container, Row, Col } from "react-bootstrap";
import ILOHAYNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/colors.css";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Barre de navigation */}
      <ILOHAYNavbar />

      <Container fluid style={{ flex: 1 }}>
        <Row>
          {/* Sidebar à gauche */}
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>

          {/* Contenu principal */}
          <Col md={10} className="p-4" style={{ backgroundColor: "var(--ilohay-gray)" }}>
            {children}
          </Col>
        </Row>
      </Container>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}
