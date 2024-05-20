import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { MainPanel, SidePanel } from "./components";
import Ball from "./components/UI/Ball";
import UploadCourse from "./pages/mitra/UploadCourse";
import Course from "./pages/course/Course";
import NotFound from "./NotFound";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";
import Video from "./pages/course/Video";
import Search from "./pages/home/Search";
import MitraPanel from "./pages/mitra/MitraPanel";
import Subscribe from "./pages/promotion/Subscribe";
import { backendUrl } from "./utils/backendUrl";

export const GlobalContext = createContext();

function App() {
  const [ user, setUser ] = useState({});
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ cursor, setCursor ] = useState({
    x: 0,
    y: 0
  });
  
  async function getStatus() {
    const request = await fetch(`${ backendUrl }/api/session/status`);
    const response = await request.json();

    setIsLoggedIn(() => response.status);
  }

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    async function getUser() {
      const request = await fetch(`${ backendUrl }/api/session/user`);
      const response = await request.json();

      setUser(() => {
        return {
          id: response.id,
          name: response.name,
          perk: response.perk,
          photo_profile_url: response.photo_profile_url,
          is_mitra: response.is_mitra,
          is_admin: response.is_admin,
          is_subscribed: response.is_subscribed,
        }
      });
    }

    if(!isLoggedIn) {
      setUser(() => {
        return {
          id: 1000000,
          name: "Guest",
          perk: "",
          photo_profile_url: "",
          is_mitra: false,
          is_admin: false,
          is_subscribed: false,
        }
      });
    } else {
      getUser();
    }
  }, [ isLoggedIn ]);

  // Center custom cursor position initial state
  useEffect(() => {
    const pageWidth   = window.innerWidth;
    const pageHeight  = window.innerHeight;

    setCursor(() => {
      return {
        x: pageWidth / 2,
        y: pageHeight / 2
      }
    });
  }, []);

  // Track cursor onmousemove event
  function trackCursor(event) {
    setCursor({
      x: event.clientX,
      y: event.clientY
    });
  }

  isLoggedIn && (
    redirect("/")
  )

  return (
    <div className="min-h-svh w-full" onMouseMove={ (event) => trackCursor(event) }>
      <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, cursor }}>
        <Ball />
        <div className="h-svh flex small:flex-col medium:flex-col flex-row w-full gap-4 p-4 bg-gradient-to-br from-blue-200/80 via-[#ECECE4]/80 to-blue-200/80 backdrop-blur-3xl backdrop-brightness-75 overflow-hidden">
          <Router>
            <SidePanel />
            <MainPanel >
                <Routes>
                  <Route path="/" element={ <Home /> }></Route>
                  <Route path="*" element={ <NotFound /> } />
                  <Route path="/course/:courseId" element={ <Course /> } />
                  <Route path="/videos/:courseId/:videoId" element={<Video />} />
                  <Route path="/user/profile/" element={ <Profile /> }></Route>
                  <Route path="/search/:searchValue" element={ <Search /> }></Route>
                  <Route path="/berlangganan" element={ <Subscribe />} />
                  { !isLoggedIn && <Route path="/user/register" element={ <Register /> } /> }
                  { !isLoggedIn && <Route path="/user/login" element={ <Login /> } />}
                  { user.is_mitra && <Route path="/mitra/upload" element={ <UploadCourse /> } /> }
                  { user.is_mitra && <Route path="/mitra/panel" element={ <MitraPanel /> } /> }
                </Routes>
            </MainPanel>
          </Router>
        </div>
      </GlobalContext.Provider>
    </div>
  )
}

export default App