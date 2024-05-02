import { Link } from "react-router-dom";
import { GlobalContext } from "../App";
import { useContext } from "react";
import ProfilePhoto from "./UI/ProfilePhoto";
import { RiVipCrown2Fill as CrownIcon, RiStarFill as StarIcon, RiVerifiedBadgeFill as VerifiedIcon } from "react-icons/ri";

function Profile() {
    const { isLoggedIn, user } = useContext(GlobalContext);

    return (
        <Link 
            to={ isLoggedIn ? '/user/profile' : '/user/login' } 
            className="items-center flex gap-4 h-full w-full hover:bg-gray-400/20 py-4 rounded-md transition-all ease-linear"
        >
            <ProfilePhoto />
            <div className="flex flex-col w-full items-start">
                <div className="flex w-full justify-between items-center">
                    <p>{ user.name }</p>
                    <div className="flex gap-2 text-blue-500">
                        { user.is_admin && <CrownIcon /> }
                        { user.is_mitra && <VerifiedIcon /> }
                        { user.is_subscribed && <StarIcon /> }
                    </div>
                </div>
                <p>{ user.perk }</p>
                {
                    !isLoggedIn && (
                        <Link 
                            to="/user/login" 
                            className="text-blue-400 bg-blue-300/30 hover:bg-blue-300/50 px-2 rounded-md"
                            >
                                Login
                        </Link>
                    )
                }
            </div>
        </Link>
    );
}

export default Profile;