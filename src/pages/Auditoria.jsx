import { useEffect, useState } from 'react';
import Title from '../components/Title.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import useRecomendaciones from '../hooks/useRecomendaciones.js';
import useDownloadCase from '../hooks/useDownload.js';
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function Auditoria() {
    const location = useLocation();
    const navigate = useNavigate();
    const { casoEstudio } = location.state || {};
    const { recomendaciones, generarRecomendaciones, loading } = useRecomendaciones();
    const { handleDownloadPDF } = useDownloadCase();

    const [auditoriaPropia, setAuditoriaPropia] = useState("");

    useEffect(() => {
        generarRecomendaciones(casoEstudio);
    }, [casoEstudio]);

    const handleCompare = () => {
        if (auditoriaPropia) {
            navigate("/comparar", {
                state: {
                    auditoriaPropia,
                    casoEstudio
                }
            });
        } else {
            alert("Por favor ingrese su auditoria");
        }

    };

    return (
        <div className="flex flex-col items-center w-full my-7">
            <Title title="Auditoría" />
            <section className="w-full max-w-7xl my-7 bg-golden-uce/20 rounded-2xl overflow-auto">
                <div className="flex items-center justify-between bg-white h-14 px-3 font-semibold">
                    <button
                        className="flex items-center gap-2 border-2 border-golden-uce text-golden-uce hover:bg-golden-uce/10 p-2 rounded-2xl cursor-pointer"
                        onClick={() => handleDownloadPDF("## Recomendaciones "+"\n"+recomendaciones + "## Mi auditoría "+"\n"+ auditoriaPropia)}
                    >
                        Descargar
                        <svg width="28" height="28" fill="white">
                            <use href="icons-sprites.svg#file-download" />
                        </svg>
                    </button>
                    <button
                        className="flex items-center gap-2 text-white bg-golden-uce hover:bg-golden-uce/90 p-3 rounded-2xl cursor-pointer"
                        onClick={handleCompare}
                    >
                        Comparar
                        <svg width="24" height="24" fill='white'>
                            <use href="icons-sprites.svg#compare" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-row gap-4 m-4'>
                    <div className='rounded-2xl flex-1'>
                        <h2 className='text-xl text-blue-uce pl-2'>Recomendaciones</h2>
                        <div className="bg-white p-4 rounded-xl max-h-90 overflow-y-auto">
                            {loading && (
                                <div className="flex justify-center items-center my-10 overflow-auto">
                                    <img src="loading.gif" alt="Loading..." className="h-60 w-60" />
                                </div>
                            )}
                            <p className='markdown'>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{recomendaciones}</ReactMarkdown>
                            </p>
                        </div>
                    </div>
                    <div className='flex-1/3'>
                        <textarea
                            name=""
                            id=""
                            className='bg-white rounded-2xl flex-1/3 w-full h-full p-4'
                            value={auditoriaPropia}
                            onChange={(e) => setAuditoriaPropia(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </section>
        </div>
    );
}
