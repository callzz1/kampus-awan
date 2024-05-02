import { useContext } from "react";
import { GlobalContext } from "../../App";
import { Link } from "react-router-dom";
import DefaultProfile from "../../../public/image/Default_Profile.jpg";

function ProfilePhoto({ ...props }) {
    const { user, isLoggedIn } = useContext(GlobalContext);

    return (
        <Link to={ isLoggedIn ? '/user/profile' : '/user/login' } { ...props } >
            {
                <img src={ user.photo_profile_url == "" ? DefaultProfile : user.photo_profile_url } className="h-10 w-10 min-w-10 object-cover aspect-square bg-gray-500 rounded-full" />
            }
        </Link>
    )
}

export default ProfilePhoto;