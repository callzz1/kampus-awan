import { Link } from "react-router-dom";

function NoticeBox() {
    return (
        <div className="flex flex-col w-auto text-wrap p-4 gap-4 border-2 border-blue-500 rounded-xl">
            <h1 className="font-semibold text-center">Belum berlangganan membership?</h1>
            <h1>Beli langganan membership Kampus Awan untuk mengakses konten pembelajaran yang ada.</h1>
            <Link to="/berlangganan" className="w-full h-fit p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white text-center">
                Berlangganan
            </Link>
        </div>
    );
}

export default NoticeBox;