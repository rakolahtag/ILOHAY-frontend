import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import api from "../../services/api";
import "../../styles/colors.css";
import "../../styles/global.css";
import bgImage from "../../assets/images/loging_bgd.jpg";
import useLogger from "../../hooks/useLogger"; // ✅ import du hook


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logAction } = useLogger(); // ✅ instancier le hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // stocker le token

      await logAction("Connexion réussie"); // ✅ log succès
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      await logAction("Échec de connexion"); // ✅ log échec
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
      <div
        className="p-4 shadow rounded"
        style={{
          width: "350px",
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
          Connexion ILOHAY
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

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--ilohay-green)" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
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
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Se connecter
          </Button>

          <p className="mt-3 text-center">
            Pas encore de compte ?{" "}
            <a
              href="/register"
              style={{ color: "var(--ilohay-green)", fontWeight: "bold" }}
            >
              Inscrivez-vous
            </a>
          </p>
        </Form>
      </div>
    </Container>
  );
}
