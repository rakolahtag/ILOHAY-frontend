import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TableList from "../components/TableList";
import Layout from "../components/Layout";
import api from "../services/api";
import "../styles/global.css";

const Formateurs = () => {
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newFormateur, setNewFormateur] = useState({
    photo: null,
    email: "",
    nom: "",
    prenom: "",
    telephone: "",
    genre: "",
    cin: "",
    nationalite: "",
    adresse: "",
    paysOrigine: "",
    specialite: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedFormateur, setSelectedFormateur] = useState(null);

  // Fetch formateurs
  useEffect(() => {
    fetchFormateurs();
  }, []);

  const fetchFormateurs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/auth/formateurs");
      setFormateurs(response.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des formateurs");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewFormateur({ ...newFormateur, [e.target.name]: e.target.value });
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/auth/formateurs/${selectedFormateur.id}`, newFormateur);
      } else {
        await api.post("/auth/formateurs", newFormateur);
      }
      setShowModal(false);
      setNewFormateur({
        photo: null,
        email: "",
        nom: "",
        prenom: "",
        telephone: "",
        genre: "",
        cin: "",
        nationalite: "",
        adresse: "",
        paysOrigine: "",
        specialite: "",
      });
      fetchFormateurs();
      setEditMode(false);
      setSelectedFormateur(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création ou modification du formateur");
    }
  };

  // Handle edit action
  const handleEdit = (formateur) => {
    setSelectedFormateur(formateur);
    setNewFormateur({
      photo: null,
      email: formateur.email || "",
      nom: formateur.nom || "",
      prenom: formateur.prenom || "",
      telephone: formateur.telephone || "",
      genre: formateur.genre || "",
      cin: formateur.cin || "",
      nationalite: formateur.nationalite || "",
      adresse: formateur.adresse || "",
      paysOrigine: formateur.paysOrigine || "",
      specialite: formateur.specialite || "",
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce formateur ?"
    );
    if (confirmDelete) {
      await api.delete(`/auth/formateurs/${id}`);
      fetchFormateurs();
    }
  };

  return (
    <Layout>
      <h1 style={{ color: "var(--ilohay-green)" }}>Liste des Formateurs</h1>

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
          Ajouter un formateur
        </Button>

        {loading && <p>Chargement des formateurs...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* ✅ Tableau d’affichage */}
        {!loading && !error && (
          <TableList
            data={formateurs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* ✅ Modal Formulaire */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? "Modifier un formateur" : "Ajouter un formateur"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newFormateur.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                  value={newFormateur.nom}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="prenom"
                  value={newFormateur.prenom}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  name="telephone"
                  value={newFormateur.telephone}
                  onChange={handleChange}
                  placeholder="+261..."
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  name="genre"
                  value={newFormateur.genre}
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
                  value={newFormateur.cin}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nationalité</Form.Label>
                <Form.Control
                  type="text"
                  name="nationalite"
                  value={newFormateur.nationalite}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="adresse"
                  value={newFormateur.adresse}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pays d'origine</Form.Label>
                <Form.Control
                  type="text"
                  name="paysOrigine"
                  value={newFormateur.paysOrigine}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Spécialité</Form.Label>
                <Form.Control
                  type="text"
                  name="specialite"
                  value={newFormateur.specialite}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={(e) =>
                    setNewFormateur({
                      ...newFormateur,
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
  );
};

export default Formateurs;
