import { useCallback } from "react";
import axios from "axios";

export default function useLogger() {
  const logAction = useCallback(async (action) => {
    try {
      await axios.post(
        "/api/log-action",
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sanctum ou JWT
          },
        }
      );
      console.log(`✅ Action loggée: ${action}`);
    } catch (error) {
      console.error("❌ Erreur log:", error);
    }
  }, []);

  return { logAction };
}
