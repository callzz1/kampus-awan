import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <div className="flex flex-col w-full h-full justify-center items-center gap-4">                
                <h1 className="text-9xl text-gray-400">404</h1>
                <h1 className="text-3xl text-gray-400">Halaman tidak ditemukan</h1>
                <Link to="/" className="w-fit p-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Kembali ke menu utama</Link>
            </div>
        </>
    )
}

export default NotFound;