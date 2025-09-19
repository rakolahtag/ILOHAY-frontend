import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TableList from "../components/TableList";
import Layout from "../components/Layout";
import api from "../services/api";
import "../styles/global.css";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    email: '',
    nom: '',
    prenom: '',
    telephone: '',
    genre: '',
    cin: '',
    nationalite: '',
    adresse: '',
    paysOrigine: '',
  });
  const [editMode, setEditMode] = useState(false); // Mode édition
  const [selectedParticipant, setSelectedParticipant] = useState(null); // Participant à éditer

  // Fetch participants
  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/participants'); // Adapter l'URL de l'API si nécessaire
      setParticipants(response.data);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des participants');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewParticipant({ ...newParticipant, [e.target.name]: e.target.value });
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update existing participant
        await api.put(`/auth/participants/${selectedParticipant.id}`, newParticipant);
      } else {
        // Create new participant
        await api.post('/auth/participants', newParticipant);
      }
      setShowModal(false);
      setNewParticipant({
        email: '',
        nom: '',
        prenom: '',
        telephone: '',
        genre: '',
        cin: '',
        nationalite: '',
        adresse: '',
        paysOrigine: '',
      });
      fetchParticipants(); // Recharger la liste des participants
      setEditMode(false); // Reset edit mode
      setSelectedParticipant(null); // Reset selected participant
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création ou modification du participant');
    }
  };

  // Handle edit action
  const handleEdit = (participant) => {
    setSelectedParticipant(participant);
    setNewParticipant({
      email: participant.email,
      nom: participant.nom,
      prenom: participant.prenom,
      telephone: participant.telephone,
      genre: participant.genre,
      cin: participant.cin,
      nationalite: participant.nationalite,
      adresse: participant.adresse,
      paysOrigine: participant.paysOrigine,
    });
    setEditMode(true);
    setShowModal(true); // Show modal in edit mode
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce participant ?");
    if (confirmDelete) {
      await api.delete(`/auth/participants/${id}`);
      fetchParticipants(); // Recharger la liste après suppression
    }
  };

  return (
    <Layout>
        <h1 style={{ color: "var(--ilohay-green)" }}>Liste des Participants</h1>

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
            Ajouter un participant
          </Button>

          {loading && <p>Chargement des participants...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* ✅ Tableau d’affichage */}
          {!loading && !error && (
            <TableList
              data={participants}
              onEdit={handleEdit}   // Passer la fonction handleEdit
              onDelete={handleDelete} // Passer la fonction handleDelete
            />
          )}

          {/* ✅ Modal Formulaire */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{editMode ? "Modifier un participant" : "Ajouter un participant"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newParticipant.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={newParticipant.nom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    value={newParticipant.prenom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="text"
                    name="telephone"
                    value={newParticipant.telephone}
                    onChange={handleChange}
                    placeholder="+261..."
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Genre</Form.Label>
                  <Form.Select
                    name="genre"
                    value={newParticipant.genre}
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
                    value={newParticipant.cin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nationalité</Form.Label>
                  <Form.Control
                    type="text"
                    name="nationalite"
                    value={newParticipant.nationalite}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    name="adresse"
                    value={newParticipant.adresse}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pays d'origine</Form.Label>
                  <Form.Control
                    type="text"
                    name="paysOrigine"
                    value={newParticipant.paysOrigine}
                    onChange={handleChange}
                    required
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

export default Participants;
