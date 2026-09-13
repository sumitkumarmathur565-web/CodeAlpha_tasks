import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import FollowingFeed from './pages/FollowingFeed';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from "./components/Navbar"


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/feed" element={<FollowingFeed />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;