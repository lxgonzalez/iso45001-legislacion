import { Link } from 'react-router-dom';

export default function Navbar() {


 

    return (
        <header className="flex justify-between items-center bg-blue-uce text-white p-4">
            <div className='w-28'>
            <Link
                to={'/'}
            >
                <img
                className="aspect-square h-16"
                src='/logo_uce.png'
                alt="Logo UCE"
            />
            </Link>
            </div>
            
            <div className='w-28'></div>
        </header> 
    );
}
