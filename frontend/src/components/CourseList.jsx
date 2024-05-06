import { useEffect, useState } from "react";
import CourseBox from "./CourseBox";
import { RiArrowRightUpLine as ArrowIcon } from "react-icons/ri";
import { Link } from "react-router-dom";

function CourseList({ title, query }) {
    const [ courses, setCourses ] = useState([]);
    const [ isHover, setIsHover ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const APIURL = (url, { order, sort, limit }) => {
        let query = url;

        function setQuery(key, value) {
            const queryParam = query.includes("?") ? '&' : '?';
            query += `${ queryParam }${ key }=${ value }`;
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
        const apiURL = APIURL("/api/courses", query);
        
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
    }, []);
    return (
        <>
            <div className="flex w-full h-full flex-col gap-4">
                <Link className="flex flex-row gap-4 items-center w-fit" onMouseEnter={() => setIsHover(() => true)} onMouseLeave={() => setIsHover(() => false)}>
                    <h1 className="text-2xl font-semibold">{ title }</h1>
                    <ArrowIcon className={`h-full w-auto ${ isHover && 'rotate-45' } transition-all ease-linear`}/>
                </Link>
                <div className="flex flex-row gap-4 overflow-x-scroll pb-4">
                    {
                        loading ?
                        <div className="flex w-full items-center justify-center">Loading</div> :
                        courses?.map((course, index) => {
                            return (
                                <CourseBox 
                                    key={ index }
                                    title={ course.name }
                                    author={ course.user.name }
                                    to={`/course/${  course.id }`}
                                    image_url={ course.image_url }
                                />                
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CourseList;