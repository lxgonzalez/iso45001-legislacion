import { useParams } from "react-router-dom";
import Title from "../components/Title";
import CasoAi from "./CasoAi";
import CasoPropio from "./CasoPropio"; 
import { useState } from "react";

export default function GenerarCaso() {
  const { isoName } = useParams();
  const [selectedCase, setSelectedCase] = useState("ai"); 

  return (
    <section className="flex flex-col items-center mt-14">
      <Title title={`Caso de Estudio IA ${isoName}`} />

      <ul className="flex gap-16 mt-8">
        <li>
          <button
            onClick={() => setSelectedCase("ai")} 
            className={`px-6 py-3 transition duration-200 ${
              selectedCase === "ai" 
                ? "text-blue-uce border-b-2 border-gray-600 hover:text-blue-uce border-b-blue-uce cursor-pointer"
                : "text-gray-600  hover:text-blue-uce border-b-blue-uce cursor-pointer"
            }`}
          >
            Inteligencia Artificial
          </button>
        </li>
        <li>
          <button
            onClick={() => setSelectedCase("propio")} 
            className={`px-6 py-3 transition duration-200 ${
              selectedCase === "propio" 
                ? "text-blue-uce border-b-2 border-gray-600 hover:text-blue-uce border-b-blue-uce cursor-pointer"
                : "text-gray-600  hover:text-blue-uce border-b-blue-uce cursor-pointer"
            }`}
          >
            Caso Propio
          </button>
        </li>
      </ul>

      <div className="mt-3 w-full">
        {selectedCase === "ai" && <CasoAi />} 
        {selectedCase === "propio" && <CasoPropio />} 
      </div>
    </section>
  );
}
