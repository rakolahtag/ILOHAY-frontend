import { Table } from "react-bootstrap";
import "../styles/colors.css";

export default function TableList({ data }) {
  if (!data || data.length === 0) {
    return <p>Aucun stagiaire trouvé.</p>;
  }

  return (
    <Table striped bordered hover responsive className="table-list mt-3">
      <thead style={{ backgroundColor: "var(--ilohay-green)", color: "white" }}>
        <tr>
          <th>Email</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Téléphone</th>
          <th>Genre</th>
          <th>CIN</th>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
