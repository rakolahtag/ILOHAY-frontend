import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TableList from "../components/TableList";
import Layout from "../components/Layout";
import api from "../services/api";
import "../styles/global.css";
import bgImage from "../assets/images/loging_bgd.jpg";

const Stagiaires = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newStagiaire, setNewStagiaire] = useState({
    email: "",
    nom: "",
    prenom: "",
    telephone: "",
    genre: "",
    cin: "",
    nationalite: "",
    adresse: "",
    pays_origine: "",
    niveau_en_classe: "",
    photo: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);

  // Fetch stagiaires
  useEffect(() => {
    fetchStagiaires();
  }, []);

  const fetchStagiaires = async () => {
    setLoading(true);
    try {
      const response = await api.get("/auth/stagiaires");
      setStagiaires(response.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des stagiaires");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewStagiaire({ ...newStagiaire, [e.target.name]: e.target.value });
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newStagiaire).forEach((key) => {
      formData.append(key, newStagiaire[key]);
    });

    try {
      if (editMode) {
        await api.post(
          `/auth/stagiaires/${selectedStagiaire.id}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await api.post("/auth/stagiaires", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      setNewStagiaire({
        email: "",
        nom: "",
        prenom: "",
        telephone: "",
        genre: "",
        cin: "",
        nationalite: "",
        adresse: "",
        pays_origine: "",
        niveau_en_classe: "",
        photo: null,
      });
      fetchStagiaires();
      setEditMode(false);
      setSelectedStagiaire(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création ou modification du stagiaire");
    }
  };

  // Handle edit action
  const handleEdit = (stagiaire) => {
    setSelectedStagiaire(stagiaire);
    setNewStagiaire({
      email: stagiaire.email,
      nom: stagiaire.nom,
      prenom: stagiaire.prenom,
      telephone: stagiaire.telephone,
      genre: stagiaire.genre,
      cin: stagiaire.cin,
      nationalite: stagiaire.nationalite,
      adresse: stagiaire.adresse,
      pays_origine: stagiaire.pays_origine,
      niveau_en_classe: stagiaire.niveau_en_classe,
      photo: null, // on ne pré-remplit pas pour l'image
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce stagiaire ?"
    );
    if (confirmDelete) {
      await api.delete(`/auth/stagiaires/${id}`);
      fetchStagiaires();
    }
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Layout>
        <h1 style={{ color: "var(--ilohay-green)" }}>Liste des Stagiaires</h1>

        <div className="content">
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "var(--ilohay-green)",
              borderColor: "var(--ilohay-green)",
              fontWeight: "bold",
            }}
          >
            Ajouter un stagiaire
          </Button>

          {loading && <p>Chargement des stagiaires...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <TableList
              data={stagiaires}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {/* ✅ Modal Formulaire */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editMode ? "Modifier un stagiaire" : "Ajouter un stagiaire"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newStagiaire.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={newStagiaire.nom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    value={newStagiaire.prenom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="text"
                    name="telephone"
                    value={newStagiaire.telephone}
                    onChange={handleChange}
                    placeholder="+261..."
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Genre</Form.Label>
                  <Form.Select
                    name="genre"
                    value={newStagiaire.genre}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="masculin">Masculin</option>
                    <option value="feminin">Féminin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control
                    type="text"
                    name="cin"
                    value={newStagiaire.cin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* ✅ Champs ajoutés */}
                <Form.Group className="mb-3">
                  <Form.Label>Nationalité</Form.Label>
                  <Form.Control
                    type="text"
                    name="nationalite"
                    value={newStagiaire.nationalite}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    name="adresse"
                    value={newStagiaire.adresse}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pays d'origine</Form.Label>
                  <Form.Control
                    type="text"
                    name="pays_origine"
                    value={newStagiaire.pays_origine}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Niveau en classe</Form.Label>
                  <Form.Control
                    type="text"
                    name="niveau_en_classe"
                    value={newStagiaire.niveau_en_classe}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    onChange={(e) =>
                      setNewStagiaire({
                        ...newStagiaire,
                        photo: e.target.files[0],
                      })
                    }
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  {editMode ? "Mettre à jour" : "Enregistrer"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Layout>
    </div>
  );
};

export default Stagiaires;
