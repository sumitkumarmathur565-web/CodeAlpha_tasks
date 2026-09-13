import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-[#E5E1D8] bg-[#FAF8F3] px-6 py-4 flex items-center justify-between">
      <Link to="/" className="font-serif-display text-xl text-[#1F2420]">
        Shopfront
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="text-[#1F2420] hover:text-[#3F5D45]">Home</Link>

        {loading ? null : user ? (
          <>
            <Link to="/products/add" className="text-[#1F2420] hover:text-[#3F5D45]">Sell</Link>
            <Link to="/cart" className="text-[#1F2420] hover:text-[#3F5D45]">Cart</Link>
            <span className="text-[#8A8578]">{user.username}</span>
            <button onClick={handleLogout} className="text-[#C4623A] hover:underline">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#1F2420] hover:text-[#3F5D45]">Log in</Link>
            <Link to="/register" className="bg-[#3F5D45] text-white px-4 py-1.5 rounded-sm hover:bg-[#34503b]">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;