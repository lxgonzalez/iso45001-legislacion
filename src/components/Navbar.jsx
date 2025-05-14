import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation(); 

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false); 
        }
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex justify-between items-center bg-blue-uce text-white p-4">
            <div className='w-28'>
            <Link
                to={'/'}
            >
                <img
                className="aspect-square h-16"
                src='logo_uce.png'
                alt="Logo UCE"
            />
            </Link>
            </div>
            <nav className="relative" ref={menuRef}>
                <div
                    className="cursor-pointer font-semibold p-4 border-b-2 border-transparent hover:border-white transition-all duration-300"
                    onClick={toggleMenu}
                >
                    Generar Caso de Estudio
                </div>
                <ul
                    className={`absolute bg-white text-gray-800 mt-2 w-48 py-4 rounded-lg shadow-lg transition-transform duration-300 ${
                        menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                    }`}
                >
                    <li className="p-2 hover:bg-gray-200 rounded">
                        <Link to="/caso-ai">Inteligencia Artificial</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200 rounded">
                        <Link to="#">Caso Propio</Link>
                    </li>
                </ul>
            </nav>
            <h1 className="font-semibold text-xl w-28">ISO 45001</h1>
        </header>
    );
}
