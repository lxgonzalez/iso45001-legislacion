import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI);
const promptAuditoria = import.meta.env.VITE_PROMPT_AUDITORIA;
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function useCasoAi() {
  const [auditoriaAI, setAuditoriaAI] = useState("");
  const [loading, setLoading] = useState(false);

  const generarAuditoriaAI = async (casoEstudio) => {
    if (!casoEstudio.trim()) {
      alert("Por favor ingrese un tema de caso de estudio.");
      return;
    }

    setLoading(true);

    try {
      const result = await model.generateContent(
        promptAuditoria + casoEstudio
      );

      if (result.response?.text) {
        const text = result.response.text;
        setAuditoriaAI(text);
      } else {
        alert("No se obtuvo una respuesta válida del modelo.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Hubo un problema al contactar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    auditoriaAI,
    generarAuditoriaAI,
    loading,
  };
}
