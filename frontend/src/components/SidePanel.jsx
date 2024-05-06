import { Link } from "react-router-dom";
import NavLink from "./UI/NavLink";
import Panel from "./UI/Panel";
import Profile from "./Profile";
// import { RiArrowRightLine as Arrow } from "react-icons/ri";
import { useContext } from "react";
import { GlobalContext } from "../App";
import NoticeBox from "./UI/NoticeBox";
import { RiHome2Fill as HomeIcon, RiBook2Fill as BookIcon, RiSquareFill as SquareIcon } from "react-icons/ri";

function SidePanel() {
    const {  user } = useContext(GlobalContext);

    return (
        <Panel width="w-min small:hidden medium:hidden">
            <div className="flex flex-col gap-4 w-fit">
                <Link to="/" className="font-nyghtserif text-3xl text-nowrap">Kampus Awan</Link>
                <Profile />                
                {
                    !user.is_subscribed &&
                    <NoticeBox 
                        title="Belum berlangganan membership?"
                        description="Beli langganan membership Kampus Awan untuk mengakses konten pembelajaran yang ada."
                        link="/berlangganan"
                        linkTitle="Berlangganan"
                    />
                }

                {/* navbar */}
                <nav className="flex flex-col gap-2">
                    <NavLink to="/" icon={ <HomeIcon /> }>Beranda</NavLink>
                    <NavLink to="/library" icon={ <BookIcon /> }>Library</NavLink>
                    { user.is_mitra && <NavLink to="/mitra/panel" icon={ <SquareIcon /> }>Panel Mitra</NavLink>}
                </nav>

                {/* <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Library</h1>
                    <Link to="/user/library" className="flex h-full w-auto items-center rounded-full">
                        <Arrow className="h-full w-auto" />
                    </Link>
                </div> */}
            </div>
        </Panel>
    )
}

export default SidePanel;