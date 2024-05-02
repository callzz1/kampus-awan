import { Link } from "react-router-dom";
import ImageBox from "./UI/ImageBox";

function CourseBox ({ title, author, image_url = "", ...props }) {    
    const style = `
        p-4 flex flex-col h-fit w-fit rounded-xl aspect-square
        bg-gradient-to-br from-gray-100/20 via-gray-200/50 to-gray-100/20
        hover:from-gray-400/20 hover:via-gray-400/20 hover:to-gray-400/20
        border border-black/10 shadow-md shadow-black/10 transition-all ease-linear gap-2
    `;

    return (
        <Link className={style} {...props}>
            <ImageBox url={ image_url } />
            <div className="flex flex-col gap-2 w-full">
                <h5 className="line-clamp-1 text-md font-semibold max-w-48">{title}</h5>
                <h5 className="line-clamp-1 text-sm text-gray-400">@{author}</h5>
            </div>
        </Link>  
    );
}
export default CourseBox;