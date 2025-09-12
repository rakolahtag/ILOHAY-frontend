import "../styles/colors.css";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--ilohay-green)",
        color: "var(--ilohay-white)",
        textAlign: "center",
        padding: "10px",
        marginTop: "auto",
      }}
    >
      <p className="mb-0">&copy; {new Date().getFullYear()} ILOHAY. Tous droits réservés.</p>
    </footer>
  );
}
