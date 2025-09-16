import React from "react";
import { Button, Table } from "react-bootstrap";

function TableList({ data, onEdit, onDelete, showActions = true }) {
  if (!data || data.length === 0) {
    return <p>Aucun stagiaire trouvé.</p>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead style={{ backgroundColor: "var(--ilohay-green)", color: "white" }}>
        <tr>
          <th>Email</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Téléphone</th>
          <th>Genre</th>
          <th>CIN</th>
          {showActions && <th>Actions</th>} {/* Afficher la colonne Actions seulement si showActions est true */}
        </tr>
      </thead>
      <tbody>
        {data.map((stagiaire) => (
          <tr key={stagiaire.id}>
            <td>{stagiaire.email}</td>
            <td>{stagiaire.nom}</td>
            <td>{stagiaire.prenom}</td>
            <td>{stagiaire.telephone}</td>
            <td>{stagiaire.genre}</td>
            <td>{stagiaire.cin}</td>
            {showActions && (
              <td>
                {/* Boutons Modifier et Supprimer */}
                <Button
                  variant="primary"
                  onClick={() => onEdit(stagiaire)} // Appel de la fonction de modification
                  style={{
                    backgroundColor: "var(--ilohay-green)",
                    borderColor: "var(--ilohay-green)",
                  }}
                >
                  Modifier
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => onDelete(stagiaire.id)} // Appel de la fonction de suppression
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
