import { useLocation } from "react-router-dom";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import useAuditoriaAI from '../hooks/useAuditoriaAI.js';
import useComparacion from '../hooks/useComparacion.js';
import useDownloadCase from '../hooks/useDownload.js';
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function Comparar() {
    const location = useLocation();
    const { auditoriaPropia, casoEstudio } = location.state || {};
    const { auditoriaAI, generarAuditoriaAI, loading } = useAuditoriaAI();
    const { comparacion, generarComparacion } = useComparacion();
    const { handleDownloadPDF } = useDownloadCase();
    const [loadingComparacion, setLoadingComparacion] = useState(false);

    useEffect(() => {
        generarAuditoriaAI(casoEstudio)
    }, [])

    useEffect(() => {
        if (auditoriaAI && !loading) {
            setLoadingComparacion(true);
            generarComparacion(casoEstudio, auditoriaAI, auditoriaPropia)
                .finally(() => setLoadingComparacion(false));
        }
    }, [auditoriaAI, loading, casoEstudio, auditoriaPropia]);

    return (
        <div className="flex flex-col justify-center items-center gap-4 mb-14">
            <section className="flex justify-center gap-4 w-full max-w-7xl mt-14 rounded-2xl overflow-auto">
                <div className="bg-golden-uce/20 flex-1/2 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <Title title='Auditoría de la Inteligencia Artificial' />
                        <button
                            className="flex items-center text-golden-uce hover:bg-golden-uce/10 p-2 rounded-2xl cursor-pointer"
                            onClick={() => handleDownloadPDF(auditoriaAI)}
                        >
                            <svg width="28" height="28" fill="transparent">
                                <use href="icons-sprites.svg#file-download" />
                            </svg>
                        </button>
                    </div>
                    <div className="bg-white rounded-xl p-4 max-h-90 overflow-y-auto">
                        {loading && (
                            <div className="flex justify-center items-center my-10 overflow-auto">
                                <img src="loading.gif" alt="Loading..." className="h-60 w-60" />
                            </div>
                        )}
                        <p className='markdown'>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{auditoriaAI}</ReactMarkdown>
                        </p>
                    </div>
                </div>
                <div className="bg-golden-uce/20 flex-1/2 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <Title title='Mi Auditoría' />
                        <button
                            className="flex items-center text-golden-uce hover:bg-golden-uce/10 p-2 rounded-2xl cursor-pointer"
                            onClick={() => handleDownloadPDF(auditoriaPropia)}
                        >
                            <svg width="28" height="28" fill="transparent">
                                <use href="icons-sprites.svg#file-download" />
                            </svg>
                        </button>
                    </div>
                    <p className="bg-white rounded-xl p-4 max-h-80 overflow-y-auto">
                        {auditoriaPropia}
                    </p>
                </div>
            </section>
            <section className="w-full max-w-7xl my- bg-golden-uce/20 rounded-2xl overflow-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <Title title='Comparación' />
                    <button
                        className="flex items-center text-golden-uce hover:bg-golden-uce/10 p-2 rounded-2xl cursor-pointer"
                        onClick={() => handleDownloadPDF(comparacion)}
                    >
                        <svg width="28" height="28" fill="transparent">
                            <use href="icons-sprites.svg#file-download" />
                        </svg>
                    </button>
                </div>                {loadingComparacion ? (
                    <div className="flex justify-center items-center my-10 overflow-auto bg-white rounded-xl">
                        <img src="loading.gif" alt="Loading..." className="h-60 w-60" />
                    </div>
                ) : (
                    comparacion && (
                        <p className="bg-white rounded-xl p-4 markdown">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{comparacion}</ReactMarkdown>
                        </p>
                    )
                )}
            </section>
        </div>
    );
}

