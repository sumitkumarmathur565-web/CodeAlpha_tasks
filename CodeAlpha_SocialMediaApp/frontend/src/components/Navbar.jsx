import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getInitials(username = '') {
    return username.slice(0, 2).toUpperCase();
}

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    if (!user) return null; // hide navbar on login/register/home-for-guests

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
            <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link to="/feed" className="font-bold text-blue-600 text-lg">
                    YourApp
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to={`/profile/${user.id}`}
                        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold"
                        title={user.username}
                    >
                        {getInitials(user.username)}
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;