import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"


// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar/Navbar'
import Certify from './pages/Certify'


function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home/>}
            />
            <Route 
              path="/login" 
              element={!user? <Login/> : <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup/> : <Navigate to="/"/>} 
            />
            <Route 
              path="/certify" 
              element={user ? <Certify/> : <Navigate to="/"/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
