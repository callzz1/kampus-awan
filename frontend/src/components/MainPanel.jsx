import { SearchBar } from ".";
import { RiArrowLeftSLine  as Arrow } from "react-icons/ri";
import ProfilePhoto from "./UI/ProfilePhoto";
import Panel from "./UI/Panel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../App";

function MainPanel({ children }) {
    const { isLoggedIn, user } = useContext(GlobalContext);
    
    return (
        <Panel width="w-full" overflow="overflow-y-scroll overflow-x-hidden">
            <div className="flex flex-col gap-4 sticky top-0 z-50">
                {/* <Link to="/" className="font-nyghtserif text-3xl p-0 m-0 text-nowrap">Kampus Awan</Link> */}

                <div className="flex gap-4 items-center">
                    <button className={ `flex h-full items-center rounded-full p-1 hover:bg-gray-400/20 aspect-square` } onClick={() => history.back()}>
                        <Arrow className="h-full w-auto text-gray-500" />
                    </button>

                    <SearchBar placeholder="Cari pembelajaran" />
                    
                    { (isLoggedIn && !user.is_subscribed) ? <Link to="/berlangganan" className="xlarge:hidden large:hidden flex justify-center items-center w-auto h-full text-blue-500  border border-blue-500 px-2 rounded-md">Berlangganan</Link> : null }
                    { !isLoggedIn && <Link to="/user/login" className="xlarge:hidden large:hidden flex justify-center items-center w-auto h-full text-white bg-blue-500 hover:bg-blue-600 px-2 rounded-md">Login</Link> }
                    { isLoggedIn && <ProfilePhoto className="xlarge:hidden large:hidden" /> }
                </div>
            </div>
            {
                children
            }
        </Panel>
    )
}

export default MainPanel;