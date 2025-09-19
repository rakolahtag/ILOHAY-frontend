import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import api from "../services/api";
import "../styles/colors.css";
import Layout from "../components/Layout";
import TableList from "../components/TableList";
import useLogger from "../hooks/useLogger";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagiaires, setStagiaires] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logAction } = useLogger();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Charger infos utilisateur
    api
      .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
        logAction("Accès au Dashboard");
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });

    // Charger stagiaires
    api
      .get("/auth/stagiaires", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStagiaires(res.data))
      .catch(() => setError("Impossible de charger les stagiaires"));
  }, [navigate]);

  const handleManageStagiaires = () => {
    logAction("Navigation vers la page Stagiaires");
    navigate("/stagiaires");
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <Layout >
      <Row className="mb-4">
        <Col>
          <h2 style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}>
            Tableau de bord ILOHAY
          </h2>
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
              <h5 style={{ color: "var(--ilohay-green)" }}>
                Statistiques globales
              </h5>
              <p>
                Ici tu pourras afficher : nombre de stagiaires, formateurs,
                formations, etc.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}>
        Liste des Stagiaires
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && <TableList data={stagiaires} showActions={false} />}

      <Button
        variant="primary"
        onClick={handleManageStagiaires}
        style={{
          backgroundColor: "var(--ilohay-green)",
          borderColor: "var(--ilohay-green)",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Gérer les Stagiaires
      </Button>
    </Layout>
  );
}
