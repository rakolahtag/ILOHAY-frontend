import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import api from "../services/api"; // ton axios configuré
import "../styles/colors.css";
import bgImage from "../assets/images/loging_bgd.jpg";
import Layout from "../components/Layout";
import CardStat from "../components/CardStat";
import TableList from "../components/TableList";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const tableHeaders = ["Nom", "Email", "Formation"];
  const tableData = [
    { Nom: "Hasina", Email: "hasina@ilohay.mg", Formation: "React" },
    { Nom: "Rivo", Email: "rivo@ilohay.mg", Formation: "Laravel" },
  ];

  // Charger les infos utilisateur au montage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // si pas de token → redirection login
      return;
    }

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  // Déconnexion
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Erreur logout", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };


  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <Container fluid className="p-4" 
        style={{ backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative", }}>
      <Row className="mb-4">
        <Col>
          <h2 style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}>
            Tableau de bord ILOHAY
          </h2>
        </Col>
        <Col className="text-end">
          <Button
            variant="danger"
            style={{
              backgroundColor: "var(--ilohay-red)",
              borderColor: "var(--ilohay-red)",
            }}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 style={{ color: "var(--ilohay-green)" }}>
                Bienvenue, {user?.name}
              </h5>
              <p>Email : {user?.email}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 style={{ color: "var(--ilohay-green)" }}>Statistiques globales</h5>
              <p>Ici tu pourras afficher : nombre de stagiaires, formateurs, formations, etc.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Layout tableau de bord  */}
      <Layout>
      <h2 style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}>
        Tableau de bord
      </h2>

      <Row className="mb-4">
        <Col md={4}>
          <CardStat title="Stagiaires inscrits" value="120" />
        </Col>
        <Col md={4}>
          <CardStat title="Formateurs" value="15" color="var(--ilohay-red)" />
        </Col>
        <Col md={4}>
          <CardStat title="Formations actives" value="8" />
        </Col>
      </Row>

      <h4 style={{ color: "var(--ilohay-green)" }}>Derniers stagiaires</h4>
      <TableList headers={tableHeaders} data={tableData} />
    </Layout>
    </Container>
  );
}
