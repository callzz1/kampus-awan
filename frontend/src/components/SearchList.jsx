import { useEffect, useState } from "react";
import ImageBox from "./UI/ImageBox";
import { Link, useLocation, useParams } from "react-router-dom";
import { backendUrl } from "../utils/backendUrl";

function SearchList({ query }) {
    const [ courses, setCourses ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    const { searchValue } = useParams();

    const location = useLocation();

    const APIURL = (url, { name, order, sort, limit }) => {
        let query = url;

        function setQuery(key, value) {
            const queryParam = query.includes("?") ? '&' : '?';
            query += `${ queryParam }${ key }=${ value }`;
        }

        if(name) {
            setQuery("name", name)
        }
        if(order) {
            setQuery("order", order)
        }
        if(sort) {
            setQuery("sort", sort); 
        }
        if(limit) {
            setQuery("limit", limit)
        }

        return query;
    }

    async function getCourses() {
        query = { name: searchValue };
        
        const apiURL = APIURL(`${ backendUrl }/api/courses`, query);

        setLoading(() => true);
        
        try {            
            const request = await fetch(apiURL);
            const courses = await request.json();
        
            setCourses(courses);            
        } catch(e) {
            console.log("Failed to fetch courses!");
            throw "Failed to fetch courses!";
        }

        setLoading(() => false);
    }

    useEffect(() => {
        getCourses();
    }, [ location.key ]);

    if(loading) {
        return (
            <div className="flex h-full w-full justify-center items-center">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h1 className="text-xl">Hasil pencarian dari : { searchValue }</h1>
            {
                courses.length === 0 ? 
                <div className="flex w-full h-full justify-center items-center">
                    Pembelajaran yang dicari tidak ditemukan 😥 
                </div> :
                <div className="flex flex-col gap-2">
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
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-xl font-semibold">{ course.name }</h3>
                                    <h5 className="text-gray-400 line-clamp-2">{ course.description }</h5>
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

export default SearchList;