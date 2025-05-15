import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import GenerarCaso from "./pages/GenerarCaso.jsx";
import Auditoria from "./pages/Auditoria.jsx";
import Comparar from "./pages/Comparar.jsx";
import CasoAi from "./pages/CasoAi.jsx"; // Agrega el componente CasoAi

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col h-dvh">
        <Navbar className="h-16" />
        <main className="flex-grow bg-gray-100 rounded-t-4xl">
          <Routes>
            <Route index element={<App />} />
            <Route path="caso/:isoName" element={<GenerarCaso />} />
            <Route path="caso-ai" element={<CasoAi />} />
            <Route path="auditoria" element={<Auditoria />} />
            <Route path="comparar" element={<Comparar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>
);
