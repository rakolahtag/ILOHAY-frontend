import { Card } from "react-bootstrap";
import "../styles/colors.css";

export default function CardStat({ title, value, color }) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h6 style={{ color: color || "var(--ilohay-green)" }}>{title}</h6>
        <h3 style={{ fontWeight: "bold" }}>{value}</h3>
      </Card.Body>
    </Card>
  );
}
