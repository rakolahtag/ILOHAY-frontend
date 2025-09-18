import React from "react";
import { Button, Table } from "react-bootstrap";
import defaultPhoto from "../assets/images/PasDePhoto.png";

function TableList({ data, onEdit, onDelete, showActions = true }) {
  if (!data || data.length === 0) {
    return <p>Aucun stagiaire trouvé.</p>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead style={{ backgroundColor: "var(--ilohay-green)", color: "white" }}>
        <tr>
          <th>Photo</th>
          <th>Email</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Téléphone</th>
          <th>Genre</th>
          <th>CIN</th>
          <th>Nationalité</th>
          <th>Adresse</th>
          <th>Pays d'origine</th>
          <th>Niveau en classe</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((stagiaire) => (
          <tr key={stagiaire.id}>
            <td>
                <img
                  src={
                    stagiaire.photo
                    ? `http://localhost:8000/storage/${stagiaire.photo}`
                    : defaultPhoto
                  }
                  alt="stagiaire"
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />
            </td>
            <td>{stagiaire.email}</td>
            <td>{stagiaire.nom}</td>
            <td>{stagiaire.prenom}</td>
            <td>{stagiaire.telephone}</td>
            <td>{stagiaire.genre}</td>
            <td>{stagiaire.cin}</td>
            <td>{stagiaire.nationalite}</td>
            <td>{stagiaire.adresse}</td>
            <td>{stagiaire.pays_origine}</td>
            <td>{stagiaire.niveau_en_classe}</td>
            {showActions && (
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(stagiaire)}
                  style={{
                    backgroundColor: "var(--ilohay-green)",
                    borderColor: "var(--ilohay-green)",
                  }}
                >
                  Modifier
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(stagiaire.id)}
                >
                  Supprimer
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableList;
