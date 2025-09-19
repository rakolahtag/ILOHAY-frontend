import { useState } from "react";
import ILOHAYNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/colors.css";
import bgImage from "../assets/images/loging_bgd.jpg";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar fixe */}
      <ILOHAYNavbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Contenu principal */}
        <div
          style={{
            flex: 1,
            marginLeft: isSidebarOpen ? "20px" : "0",
            transition: "margin-left 0.3s ease-in-out",
            padding: "20px",
            paddingTop: "80px", // ✅ Décale automatiquement sous la navbar
            minHeight: "100vh",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
