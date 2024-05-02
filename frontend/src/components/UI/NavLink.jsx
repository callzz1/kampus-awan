import { Link, useLocation } from "react-router-dom";

function NavLink({ children, to, icon }) {
    const location = useLocation();

    const style = `
        flex flex-row gap-4 items-center p-2 w-full rounded-md hover:bg-gray-400/20 transition-all ease-linear 
        ${ location.pathname === to && 'bg-gray-400/20' }
    `;

    return (
        <Link
            to={ to }
            className={ style }
        >
            { icon }
            { children }
        </Link>
    );
}

export default NavLink;