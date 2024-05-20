import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { Link } from "react-router-dom";
import ImageBox from "../../components/UI/ImageBox";
import { RiAddFill as AddIcon } from "react-icons/ri";
import { backendUrl } from "../../utils/backendUrl";

function MitraPanel() {
    const [ courses, setCourses ] = useState([]);
    const { user } = useContext(GlobalContext);

    useEffect(() => {
        
        async function getCourses() {
            const request = await fetch(`${ backendUrl }/api/courses?mitra=${ user.id }`);
            const result = await request.json();
        
            setCourses(result);
        }

        getCourses();
    }, [ user.id ]);

    useEffect(() => {
        console.log(courses);
    }, [ courses ])

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-semibold bg-gradient-to-br from-blue-500 to-indigo-300 bg-clip-text text-transparent">Buat, atur dan ubah pembelajaran anda disini, instruktor!</h1>
            <Link to="/mitra/upload" className="flex gap-4 items-center w-fit h-auto p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                <AddIcon className="h-full w-auto" />
                <h1 className="font-semibold">Buat pembelajaran baru</h1>
            </Link>
            {
                Object.keys(courses).length > 0 &&
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl">Semua pembelajaran yang anda buat :</h1>
                    {
                        courses?.map((course, index) => {
                            return (
                                <Link to={ `/course/${ course.id }` }
                                    key={ index }
                                    className="flex gap-4 w-full bg-gray-400/10 hover:bg-gray-400/20 rounded-md p-4"
                                >
                                    <div className="w-fit h-fit">
                                        <ImageBox url={ course.image_url } />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-semibold">{ course.name }</h3>
                                        <h5 className="text-gray-400 line-clamp-1">{ course.description }</h5>
                                        <h5 className="text-gray-400">@{ course.user.name }</h5>
                                    </div>    
                                </Link>                
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default MitraPanel;