import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI);
const promptLarge = import.meta.env.VITE_PROMPT_LARGE;
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function useCasoAi() {
  const [prompt, setPrompt] = useState("");
  const [casoEstudio, setCasoEstudio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event, isoName) => {
    event.preventDefault();

    if (!prompt) {
      alert("Por favor ingrese un tema de caso de estudio.");
      return;
    }

    setLoading(true);
    try {
      const result = await model.generateContent(
        "Genera un caso de estudio detallado sobre la implementación de ISO " +
          isoName + " "+
          promptLarge +
          " Tiene que ser sobre : " +
          prompt
      );
      if (result.response && typeof result.response.text === "function") {
        const text = await result.response.text();

        setCasoEstudio(text);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Hubo un problema al contactar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    prompt,
    casoEstudio,
    loading,
    handleInputChange,
    handleSubmit,
  };
}
