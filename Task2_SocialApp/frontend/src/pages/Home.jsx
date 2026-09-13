import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // already logged in — skip straight to the feed
    if (user) {
        return <Navigate to="/feed" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
            <div className="text-center max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Welcome to YourApp
                </h1>
                <p className="text-gray-500 mb-8">
                    Connect, share, and follow the people you care about.
                </p>

                <div className="flex gap-3 justify-center">
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 border border-blue-200 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;