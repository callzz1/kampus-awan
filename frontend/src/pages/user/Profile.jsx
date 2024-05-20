import Submit from "../../components/form/Submit";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/backendUrl";

function Profile() {
    const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
    const navigate = useNavigate();

    async function handleLogout(event) {
        event.preventDefault();

        const req = await fetch(`${ backendUrl }/api/session`, {
            method: "DELETE"
        });

        const res = await req.json();

        if(!res.err) {
            setIsLoggedIn(() => false);
            alert("Logged out!");
            navigate("/")
        }
    }
    
    if(!isLoggedIn) {
        return (
            <Link to="/user/login">Login</Link>
        )
    }
    return (
        <form onSubmit={ handleLogout }>
            <Submit 
                value="Logout"
                type="button"
                onClick={ handleLogout }
            />
        </form>
    )
}

export default Profile;