import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
 import { Link } from 'react-router-dom';
 import LikeButton from '../components/LikeButton';
 import CreatePost from '../components/CreatePost';



function getInitials(username = '') {
    return username.slice(0, 2).toUpperCase();
}

function timeAgo(dateString) {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    const intervals = [
        { label: 'y', secs: 31536000 },
        { label: 'mo', secs: 2592000 },
        { label: 'd', secs: 86400 },
        { label: 'h', secs: 3600 },
        { label: 'm', secs: 60 },
    ];
    for (const { label, secs } of intervals) {
        const count = Math.floor(seconds / secs);
        if (count >= 1) return `${count}${label} ago`;
    }
    return 'just now';
}

function FollowingFeed() {
    const { user, loading: authLoading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
   

    useEffect(() => {
        async function fetchFeed() {
            try {
                const res = await api.get('/posts/feed');
                console.log(res.data.posts)
                setPosts(res.data.posts);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load feed');
            } finally {
                setLoading(false);
            }
        }
        if (!authLoading) fetchFeed();
    }, [authLoading]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;

    }

    function handleNewPost(newPost) {
    setPosts([newPost, ...posts]); // prepend so it shows immediately
}

    return (
        <div className="max-w-xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Your Feed
            </h2>

            <CreatePost onPostCreated={handleNewPost} />

            {posts.length === 0 ? (
                <div className="text-center py-16 border border-dashed rounded-xl text-gray-400">
                    <p className="text-lg">No posts yet</p>
                    <p className="text-sm mt-1">Follow someone to see their posts here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                    {getInitials(post.user?.username)}
                                </div>
                                <div className="flex flex-col leading-tight">
                                   <Link to={`/profile/${post.user?._id}`} className="font-semibold text-gray-900 text-sm hover:underline">
                                                  {post.user?.username}
                                  </Link>
                                    <span className="text-xs text-gray-400">
                                        {timeAgo(post.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </p>

                            <div className="mt-3 flex items-center gap-4">
                            <LikeButton postId={post._id} initialLikes={post.likes} />
                                </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FollowingFeed;