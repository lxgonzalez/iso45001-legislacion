import { useState, useCallback } from "react";
import * as pdfjs from "pdfjs-dist";
import { GoogleGenerativeAI } from "@google/generative-ai";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const usePdfReader = () => {
  const [casoEstudio, setCasoEstudio] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar el loading

  const extractTextFromPdf = useCallback(async (file) => {
    setLoading(true); // Activar loading al inicio
    try {
      setError(null);
      if (!file || !(file instanceof File)) {
        throw new Error("El archivo proporcionado no es válido.");
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;

      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      try {
        const result = await model.generateContent(
          "Quiero que le des un formato markdown a este texto, para que se vea como un caso de estudio, no cambies nada del contenido " +
            extractedText
        );
        if (result.response && typeof result.response.text === "function") {
          const casoEstudio = await result.response.text();
          setCasoEstudio(casoEstudio);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        alert("Hubo un problema al contactar con el servidor.");
      }
    } catch (err) {
      setError(err.message || "Error al leer el PDF.");
    } finally {
      setLoading(false); 
    }
  }, []);

  return { casoEstudio, error, loading, extractTextFromPdf };
};
