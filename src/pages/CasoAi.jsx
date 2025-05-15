import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from 'react-router-dom';
import useCasoAi from "../hooks/useCasoAI";
import useDownloadCase from "../hooks/useDownload";

export default function CasoAi() {
  const { prompt, casoEstudio, loading, handleInputChange, handleSubmit } = useCasoAi();
  const { handleDownloadPDF } = useDownloadCase();
  const { isoName } = useParams();

  return (
    <div className="flex flex-col items-center w-full">
      <form
        className="w-full max-w-xl mt-7"
        onSubmit={(event) => handleSubmit(event, isoName)}
      >        
      <div className="flex items-center border border-gray-400 px-2 rounded-lg shadow focus-within:ring focus-within:ring-golden-uce focus-within:border-golden-uce">
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Introduce un tema para tu caso de estudio"
            className="flex-grow p-3 border-none focus:outline-none block min-w-0"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-golden-uce/80 text-white font-light rounded-xl hover:bg-golden-uce transition cursor-pointer"
          >
            Generar
            <svg width="28" height="28">
              <use href="/icons-sprites.svg#stars" />
            </svg>
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center my-10 overflow-auto">
          <img src="/loading.gif" alt="Loading..." className="h-96 w-96" />
        </div>
      )}

      {casoEstudio && !loading && (
        <section className="w-full max-w-7xl my-10 bg-golden-uce/20 rounded-2xl overflow-auto">
          <div className="flex items-center justify-between bg-white h-14 px-3 font-semibold">
            <button
              className="flex items-center gap-2 border-2 border-golden-uce text-golden-uce hover:bg-golden-uce/10 p-2 rounded-2xl cursor-pointer"
              onClick={() => handleDownloadPDF(casoEstudio)}
            >
              Descargar
              <svg width="28" height="28" fill="transparent">
                <use href="/icons-sprites.svg#file-download" />
              </svg>
            </button>
            <button className="flex items-center gap-2 text-white bg-golden-uce hover:bg-golden-uce/90 p-2 rounded-2xl cursor-pointer">
              <Link
                to="/auditoria"
                state={{ casoEstudio }}
              >
                Realizar Auditoría
              </Link>
              <svg width="28" height="28">
                <use href="/icons-sprites.svg#audit-report" />
              </svg>
            </button>
          </div>
          <div className="markdown p-5">
            <div className="bg-white rounded-xl p-4 max-h-full overflow-y-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{casoEstudio}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
