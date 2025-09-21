import React from "react";
import { Button, Table } from "react-bootstrap";
import defaultPhoto from "../assets/images/PasDePhoto.png";

function TableList({ data, onEdit, onDelete, showActions = true }) {
  if (!data || data.length === 0) {
    return <p>Aucune donnée trouvée.</p>;
  }

  // ✅ Détection des colonnes selon le type d'objet
  let columns = [];

  if (data[0].hasOwnProperty("specialite")) {
    // Formateurs
    columns = [
      { key: "photo", label: "Photo" },
      { key: "email", label: "Email" },
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prénom" },
      { key: "telephone", label: "Téléphone" },
      { key: "genre", label: "Genre" },
      { key: "cin", label: "CIN" },
      { key: "nationalite", label: "Nationalité" },
      { key: "adresse", label: "Adresse" },
      { key: "paysOrigine", label: "Pays d'origine" },
      { key: "specialite", label: "Spécialité" },
    ];
  } else if (data[0].hasOwnProperty("entiteOrigine")) {
    // Participants
    columns = [
      { key: "photo", label: "Photo" },
      { key: "email", label: "Email" },
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prénom" },
      { key: "telephone", label: "Téléphone" },
      { key: "genre", label: "Genre" },
      { key: "cin", label: "CIN" },
      { key: "nationalite", label: "Nationalité" },
      { key: "adresse", label: "Adresse" },
      { key: "paysOrigine", label: "Pays d'origine" },
      { key: "entiteOrigine", label: "Entité d'origine" },
    ];
  } else {
    // Stagiaires par défaut
    columns = [
      { key: "photo", label: "Photo" },
      { key: "email", label: "Email" },
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prénom" },
      { key: "telephone", label: "Téléphone" },
      { key: "genre", label: "Genre" },
      { key: "cin", label: "CIN" },
      { key: "nationalite", label: "Nationalité" },
      { key: "adresse", label: "Adresse" },
      { key: "pays_origine", label: "Pays d'origine" },
      { key: "niveau_en_classe", label: "Niveau en classe" },
    ];
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead style={{ backgroundColor: "var(--ilohay-green)", color: "white" }}>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.key === "photo" ? (
                  <img
                    src={
                      item[col.key]
                        ? `http://127.0.0.1:8000/storage/${item[col.key]}`
                        : defaultPhoto
                    }
                    alt="photo"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  item[col.key] || "-"
                )}
              </td>
            ))}
            {showActions && (
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  Éditer
                </Button>{" "}
                <Button
                  style={{ backgroundColor: "var(--ilohay-red)", border: "none" }}
                  size="sm"
                  onClick={() => onDelete(item.id)}
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
