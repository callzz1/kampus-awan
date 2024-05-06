import { Link } from "react-router-dom";

function NoticeBox({ title, description, link, linkTitle }) {
    return (
        <div className="flex flex-col w-auto text-wrap p-4 gap-4 border-2 border-blue-500 rounded-xl">
            { title && <h1 className="font-semibold text-center">{ title }</h1> }
            { description && <h1>{ description }</h1> }
            {
                link && 
                <Link to={ link || "#" } className="w-full h-fit p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white text-center">
                    { linkTitle }
                </Link>
            }
        </div>
    );
}

export default NoticeBox;