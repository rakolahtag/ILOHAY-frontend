import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import api from "../../services/api";
import "../../styles/colors.css";
import bgImage from "../../assets/images/loging_bgd.jpg"; // même image que Login


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess("Compte créé avec succès ! Redirection...");
      setTimeout(() => navigate("/"), 2000); // retour vers login après 2s
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay sombre */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      {/* Carte Register */}
      <div
        className="p-4 shadow rounded"
        style={{
          width: "400px",
          backgroundColor: "var(--ilohay-white)",
          borderTop: "5px solid var(--ilohay-green)",
          opacity: 0.95,
          position: "relative",
          zIndex: 2,
        }}
      >
        <h3
          className="mb-4 text-center"
          style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}
        >
          Inscription ILOHAY
        </h3>

        {error && (
          <Alert
            variant="danger"
            style={{
              backgroundColor: "var(--ilohay-red)",
              color: "var(--ilohay-white)",
              border: "none",
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            variant="success"
            style={{
              backgroundColor: "var(--ilohay-green)",
              color: "var(--ilohay-white)",
              border: "none",
            }}
          >
            {success}
          </Alert>
        )}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--ilohay-green)" }}>
              Nom complet
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ borderColor: "var(--ilohay-green)" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--ilohay-green)" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: "var(--ilohay-green)" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--ilohay-green)" }}>
              Mot de passe
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderColor: "var(--ilohay-green)" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--ilohay-green)" }}>
              Confirmer mot de passe
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ borderColor: "var(--ilohay-green)" }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "var(--ilohay-green)",
              borderColor: "var(--ilohay-green)",
              fontWeight: "bold",
            }}
          >
            S'inscrire
          </Button>
        </Form>
      </div>
    </Container>
  );
}
