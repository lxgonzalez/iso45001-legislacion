import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI);
const promptRecomendaciones = import.meta.env.VITE_PROMPT_RECOMENDACIONES;
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function useCasoAi() {
  const [recomendaciones, setRecomendaciones] = useState("");
  const [loading, setLoading] = useState(false);

  const generarRecomendaciones = async (casoEstudio, isoName) => {
    if (!casoEstudio.trim()) {
      alert("Por favor ingrese un tema de caso de estudio.");
      return;
    }

    setLoading(true);

    try {
      const result = await model.generateContent(
        "Como experto en ISO " + isoName + promptRecomendaciones + casoEstudio
      );

      if (result.response?.text) {
        const text = result.response.text;
        setRecomendaciones(text);
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
    recomendaciones,
    generarRecomendaciones,
    loading,
  };
}
