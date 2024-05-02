/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageBox from "../../components/UI/ImageBox";
import Box from "../../components/UI/Box";
import { Link } from "react-router-dom";
import { RiPlayFill as PlayIcon, RiAddLine as AddIcon, RiNewspaperFill as PaperIcon, RiLockFill as LockIcon } from "react-icons/ri";
import { GlobalContext } from "../../App";

function Course() {    
    const { isLoggedIn, user } = useContext(GlobalContext);

    const { courseId } = useParams();

    const [ course, setCourse ] = useState ({});
    const [ videos, setVideos ] = useState([]);
    const [ listHover, setListHover ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();

    async function getCourse() {
        try {
            const request = await fetch(`/api/courses?id=${ courseId }`);
            const response = await request.json();
    
            setCourse(() => response);
        } catch(err) {
            console.log("Failed to retrieve course!");
            throw err;
        }
    }

    async function getVideo() {
        try {
            const request = await fetch(`/api/videos?courseid=${ courseId }`);
            const response = await request.json();
    
            setVideos(response);
        } catch(err) {
            console.log("Failed to retrieve course!");
            throw err;
        }
    }

    // handle loading ambil semua data dari api
    async function getCourseAndVideo() {
        setLoading(() => true);
        
        await getCourse();
        await getVideo();
        
        setLoading(() => false);
    }

    useEffect(() => {
        getCourseAndVideo();
    }, []);


    // check apakah user telah login dan telah berlangganan, jika terpenuhi maka lanjut, jika ada callback maka akan mereturn fuungsi callback yang diinginkan
    function checkUser(callback) {
        if(!isLoggedIn) {
            return alert("Kamu harus login terlebih dahulu untuk mengakses konten pembelajaran!")
        }
        if(!user.is_subscribed) {
            return alert("Kamu harus berlangganan membership untuk mengakses konten pembelajaran!")
        }

        // check jika ada argumen callback
        if(callback) {
            return callback();
        }
    }
    
    function handleOpenVideo() {
        return checkUser();
    }
    
    function handleEnroll() {
        checkUser(() => {
            if(videos.length === 0) {
                return alert("Tidak ada konten yang bisa diputar!");
            } else {
                return navigate(`/videos/${ courseId }/${ videos[0].id }`)
            }
        });
    }

    function handleAddToLibrary() {
        checkUser(() => {
            return alert("Berhasil menambahkan pembelajaran ke library!");
        });
    }

    if(loading) {
        return (
            <div className="flex h-full w-full justify-center items-center">
                Loading...
            </div>
        )
    }

    // check if object already fetched
    if(Object.keys(course).length > 0) {
        return (
            <div className="flex flex-col gap-8">
                <div className="flex flex-row small:flex-col gap-8">
                    <ImageBox url={ course.image_url } />
                    <div className="flex flex-col justify-between gap-4 h-full w-full">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl font-bold line-clamp-2">{ course.name }</h3>
                            <div className="flex gap-2 text-gray-400">
                                <h5 className="text-md">@{ course.user.name }</h5>
                                <h5>•</h5>
                                <h5 className="text-md">{ course.createdAt.split("-")[0] }</h5>
                            </div>
                            <h3 className="text-md text-gray-400">{ videos.length } video</h3>
                        </div>
                        <div className="flex flex-row gap-4 font-semibold">
                            <button onClick={ handleEnroll } className="flex gap-2 items-center p-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                                Mulai
                                <h3 className={ `flex justify-end items-center col-span-1 ${ user.is_subscribed && 'hidden' }` }>
                                    <LockIcon />
                                </h3>
                            </button>
                            <button onClick={ handleAddToLibrary } className="flex items-center text-gray-600 gap-2 p-2 px-4 bg-gray-400/30 hover:bg-gray-500/30 rounded-md">
                                <AddIcon />
                                Tambah ke library
                            </button>
                            <button onClick={() => { alert("Seritifikat pembelajaran") }} className="flex items-center justify-center w-auto aspect-square h-full rounded-full bg-gray-400/30 hover:bg-gray-500/30 text-gray-600">
                                <PaperIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="text-md text-justify">{ course.description }</h5>
                </div>
                
                
                <Box>
                    {
                        videos.length === 0 ?
                        <div className="flex justify-center text-gray-400">Pembelajaran ini belum memiliki konten video.</div> :

                        <ul className="flex flex-col">
                            <li className="w-full h-auto rounded-md">
                                <div className="p-2 grid grid-cols-12 font-semibold text-gray-400">
                                    <h3 className="col-span-1">#</h3>
                                    <h3 className="col-span-10">Title</h3>
                                </div>
                            </li>
                            {
                                videos?.map((video, index) => {
                                    return (
                                        <li 
                                            key={ index }  
                                            onMouseEnter={() => setListHover(() => index)} 
                                            onMouseLeave={() => setListHover(() => null)} 
                                            onClick={ handleOpenVideo }
                                            className={ `w-full h-auto hover:bg-blue-500 odd:bg-transparent even:bg-gray-400/30 rounded-md ${ user.is_subscribed === false && 'text-gray-600' } hover:text-white` }
                                        >
                                            <Link to={ user.is_subscribed ? `/videos/${ courseId }/${ video.id }` : "#" } className="p-2 grid grid-cols-12">
                                                {
                                                    listHover === index ?
                                                    <PlayIcon className="col-span-1 self-center" /> :
                                                    <h3 className="col-span-1 self-center">{ index + 1 }</h3>
                                                }
                                                <h3 className="col-span-10">{ video.title }</h3>
                                                <h3 className={ `flex justify-end items-center col-span-1 ${ user.is_subscribed && 'hidden' }` }>
                                                    <LockIcon />
                                                </h3>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    }
                </Box>
            </div>
        )
    }
}

export default Course;