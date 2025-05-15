import { useState } from "react";
import { usePdfReader } from "./../hooks/useCasoPropio";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useDownloadCase from "../hooks/useDownload";
import { Link } from 'react-router-dom';


const CasoPropio = () => {
    const { casoEstudio, error,loading, extractTextFromPdf } = usePdfReader();
    const [pdfFile, setPdfFile] = useState(null);
    const { handleDownloadPDF } = useDownloadCase();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPdfFile(file);
    };

    const handleExtractText = () => {
        if (pdfFile) {
            extractTextFromPdf(pdfFile);
        }
    };

    return (
        <div className="mt-7 flex flex-col items-center">
            <div className="flex justify-between gap-4 w-xl sm:flex-row items-center rounded-2xl">
                <label
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center w-full border border-dashed border-gray-400 rounded-lg p-4 text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                    <input
                        id="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {pdfFile ? (
                        <p className="text-sm text-gray-600">
                            Archivo seleccionado: <span className="font-medium">{pdfFile.name}</span>
                        </p>
                    ) : (
                        <>
                            <span className="text-sm font-medium">Haz clic para cargar un PDF</span>
                            <span className="text-xs text-gray-400">(solo archivos .pdf)</span>
                        </>
                    )}
                </label>

                <button
                    onClick={handleExtractText}
                    className="bg-golden-uce/90 text-white px-6 py-3 w-50 rounded-xl shadow hover:bg-golden-uce hover:shadow-lg transition cursor-pointer"
                >
                    Extraer Texto
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {loading && (
        <div className="flex justify-center items-center my-10 overflow-auto">
          <img src="/loading.gif" alt="Loading..." className="h-96 w-96" />
        </div>
      )}
            {casoEstudio && (
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
};

export default CasoPropio;
