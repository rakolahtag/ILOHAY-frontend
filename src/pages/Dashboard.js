import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import api from "../services/api"; // Ton axios configuré
import "../styles/colors.css";
import bgImage from "../assets/images/loging_bgd.jpg";
import Layout from "../components/Layout";
import TableList from "../components/TableList"; // Importer TableList pour afficher les stagiaires

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagiaires, setStagiaires] = useState([]); // Nouveau state pour les stagiaires
  const [error, setError] = useState(""); // Pour gérer les erreurs d'API
  const navigate = useNavigate();

  // Charger les infos utilisateur et les stagiaires au montage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // si pas de token → redirection login
      return;
    }

    // Charger les informations utilisateur
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

    // Charger les stagiaires
    api
      .get("/auth/stagiaires", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStagiaires(res.data);
      })
      .catch((err) => {
        setError("Impossible de charger les stagiaires");
        console.error(err.response?.data || err.message);
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

  // Redirection vers la page Stagiaires pour gérer les actions CRUD
  const handleManageStagiaires = () => {
    navigate("/stagiaires"); // Assure-toi que tu as la route /stagiaires
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <Container
      fluid
      className="p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
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
              <p>
                Ici tu pourras afficher : nombre de stagiaires, formateurs,
                formations, etc.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Layout tableau de bord */}
      <Layout>
        <h2 style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}>
          Liste des Stagiaires
        </h2>

        {/* Affichage conditionnel pour le chargement, erreur et tableau */}
        {loading && <p>Chargement des stagiaires...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Afficher les stagiaires dans TableList sans les actions CRUD */}
        {!loading && !error && <TableList data={stagiaires} showActions={false} />}

        {/* Bouton pour naviguer vers la page Stagiaires */}
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
    </Container>
  );
}
