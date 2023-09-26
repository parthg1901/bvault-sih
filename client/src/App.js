import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useAdminContext } from "./hooks/useAdminContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
import Certify from "./pages/Certify";
import Admin from "./pages/Admin";
import Intro from "./pages/Intro";

// import helia from "./utils/helia"
import { useEffect, useState } from "react";
import Modal from "./components/Modal/Modal";

function App() {
  const { user } = useAuthContext();
  const { admin } = useAdminContext();

  const [logoutButton, setLogout] = useState(false);
  const [modal, setModal] = useState("");

  const toggleLogout = () => {
    console.log("here");
    if (logoutButton) {
      console.log(logoutButton);
      setLogout(false);
    } else {
      console.log(logoutButton);
      setLogout(true);
    }
  };
  return (
    <div
      className="App"
      onClick={(e) => {
        setLogout(false);
      }}
    >
      <BrowserRouter>
        <Navbar logoutButton={logoutButton} toggleLogout={toggleLogout} />
        {modal.length !== 0 && (
          <Modal description={modal}/>
        )}
        <div className="pages">
          <Routes>
            <Route path="/" element={<Intro />} />
            
            <Route path="/scan" element={<Home />} />
            {!user && <Route path="/admin" element={<Admin />} />}
            {!admin ? (
              <>
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
              </>
            ) : (
              ""
            )}
            {user && user.verified === "yes" && (
              <Route
                path="/certify"
                element={<Certify setModal={setModal} />}
              />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
