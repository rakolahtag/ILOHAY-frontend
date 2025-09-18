import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col,ProgressBar } from "react-bootstrap";
import api from "../../services/api";
import "../../styles/colors.css";
import bgImage from "../../assets/images/loging_bgd.jpg";

export default function Register() {
  const [step, setStep] = useState(1);

  // Champs communs
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cin, setCin] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [paysOrigine, setPaysOrigine] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [genre, setGenre] = useState("Homme");
  const [role, setRole] = useState("stagiaire");

  // Champs spécifiques
  const [entiteOrigine, setEntiteOrigine] = useState(""); // participant
  const [specialite, setSpecialite] = useState(""); // formateur
  const [etablissement, setEtablissement] = useState(""); // stagiaire
  const [niveau, setNiveau] = useState(""); // stagiaire

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
      await api.post("/auth/register", {
        name,
        prenom,
        email,
        password,
        role,
        cin,
        telephone,
        adresse,
        pays_origine: paysOrigine,
        nationalite,
        genre,
        entite_origine: role === "participant" ? entiteOrigine : null,
        specialite: role === "formateur" ? specialite : null,
        etablissement: role === "stagiaire" ? etablissement : null,
        niveau: role === "stagiaire" ? niveau : null,
      });

      setSuccess("Compte créé avec succès ! Redirection...");
      setTimeout(() => navigate("/"), 2000);
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
          width: "500px",
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
          <Alert variant="danger" style={{ backgroundColor: "var(--ilohay-red)", color: "white" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" style={{ backgroundColor: "var(--ilohay-green)", color: "white" }}>
            {success}
          </Alert>
        )}

        {/* Barre de progression */}
        <ProgressBar
          now={(step / 3) * 100}
          label={`Étape ${step} / 3`}
          variant="success"
          className="mb-4"
        />
        
        <Form onSubmit={handleRegister}>
          {/* --- ÉTAPE 1 --- */}
          {step === 1 && (
            <>
              <h5 style={{ color: "var(--ilohay-green)" }}>Étape 1 : Informations générales</h5>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmer</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {/* --- ÉTAPE 2 --- */}
          {step === 2 && (
            <>
              <h5 style={{ color: "var(--ilohay-green)" }}>Étape 2 : Informations personnelles</h5>
              <Form.Group className="mb-3">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pays d'origine</Form.Label>
                <Form.Control
                  type="text"
                  value={paysOrigine}
                  onChange={(e) => setPaysOrigine(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nationalité</Form.Label>
                <Form.Control
                  type="text"
                  value={nationalite}
                  onChange={(e) => setNationalite(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                  <option value="Autre">Autre</option>
                </Form.Select>
              </Form.Group>
            </>
          )}

          {/* --- ÉTAPE 3 --- */}
          {step === 3 && (
            <>
              <h5 style={{ color: "var(--ilohay-green)" }}>Étape 3 : Informations spécifiques</h5>
              <Form.Group className="mb-3">
                <Form.Label>Rôle</Form.Label>
                <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="stagiaire">Stagiaire</option>
                  <option value="participant">Participant</option>
                  <option value="formateur">Formateur</option>
                </Form.Select>
              </Form.Group>

              {role === "participant" && (
                <Form.Group className="mb-3">
                  <Form.Label>Entité d'origine</Form.Label>
                  <Form.Control
                    type="text"
                    value={entiteOrigine}
                    onChange={(e) => setEntiteOrigine(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {role === "formateur" && (
                <Form.Group className="mb-3">
                  <Form.Label>Spécialité</Form.Label>
                  <Form.Control
                    type="text"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {role === "stagiaire" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Établissement</Form.Label>
                    <Form.Control
                      type="text"
                      value={etablissement}
                      onChange={(e) => setEtablissement(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Niveau</Form.Label>
                    <Form.Control
                      type="text"
                      value={niveau}
                      onChange={(e) => setNiveau(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
            </>
          )}

          {/* Boutons navigation */}
          <div className="d-flex justify-content-between mt-3">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Précédent
              </Button>
            )}
            {step < 3 ? (
              <Button variant="success" onClick={() => setStep(step + 1)}>
                Suivant
              </Button>
            ) : (
              <Button type="submit" variant="success">
                S'inscrire
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Container>
  );
}
