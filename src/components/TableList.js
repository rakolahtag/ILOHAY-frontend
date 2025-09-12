import { Table } from "react-bootstrap";
import "../styles/colors.css";

export default function TableList({ headers, data }) {
  return (
    <Table striped bordered hover responsive>
      <thead style={{ backgroundColor: "var(--ilohay-green)", color: "var(--ilohay-white)" }}>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, i) => (
            <tr key={i}>
              {headers.map((header, j) => (
                <td key={j}>{row[header]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="text-center">
              Aucun enregistrement trouvé
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
