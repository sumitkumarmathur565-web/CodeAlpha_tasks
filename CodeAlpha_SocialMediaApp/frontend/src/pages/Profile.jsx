import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import DeletePostButton from '../components/DeletePostButton';
import CreatePost from '../components/CreatePost'


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

function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [followLoading, setFollowLoading] = useState(false);

    async function fetchProfile() {
        try {
            const res = await api.get(`/users/${id}`);
            setProfile(res.data.profile);
            setPosts(res.data.posts);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchProfile();
    },[id]);


    function handlePostDeleted(deletedId) {
    setPosts(posts.filter(p => p._id !== deletedId));
}


function handleNewPost(newPost) {
    setPosts([newPost, ...posts]);
}

    async function handleFollowToggle() {
        setFollowLoading(true);
        try {
            if (profile.isFollowing) {
                await api.post(`/users/${id}/unfollow`);
            } else {
                await api.post(`/users/${id}/follow`);
            }
            await fetchProfile();
        } catch (err) {
            setError(err.response?.data?.message || 'Action failed');
        } finally {
            setFollowLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-xl mx-auto mt-6 px-4 pb-10">
            {/* Cover + profile card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 border border-gray-100">
                <div className="h-24 bg-linear-to-r from-blue-500 to-indigo-500" />
                <div className="px-5 pb-5">
                    <div className="flex items-end justify-between -mt-8">
                        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">
                            {getInitials(profile.username)}
                        </div>

                        {!profile.isOwnProfile && (
                            <button
                                onClick={handleFollowToggle}
                                disabled={followLoading}
                                className={`mb-1 px-5 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                    profile.isFollowing
                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                }`}
                            >
                                {followLoading ? (
                                    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : profile.isFollowing ? (
                                    'Following'
                                ) : (
                                    'Follow'
                                )}
                            </button>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mt-3">
                        {profile.username}
                        {profile.isOwnProfile && (
                            <span className="ml-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full align-middle">
                                You
                            </span>
                        )}
                    </h2>

                    <div className="flex gap-5 mt-3 text-sm">
                        <span className="text-gray-600">
                            <strong className="text-gray-900">{profile.followersCount}</strong> followers
                        </span>
                        <span className="text-gray-600">
                            <strong className="text-gray-900">{profile.followingCount}</strong> following
                        </span>
                        <span className="text-gray-600">
                            <strong className="text-gray-900">{posts.length}</strong> posts
                        </span>
                    </div>
                </div>
            </div>

             {/* Create post — only on your own profile */}
            {profile.isOwnProfile && (
                <CreatePost onPostCreated={handleNewPost} />
            )}

            {/* Posts */}
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                Posts
            </h3>

            {posts.length === 0 ? (
                <div className="text-center py-14 border border-dashed border-gray-200 rounded-2xl text-gray-400 bg-white/50">
                    <p className="font-medium">No posts yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                {timeAgo(post.createdAt)}
                            </p>
                            {profile.isOwnProfile && (
                            <div className="mt-2 flex justify-end">
                            <DeletePostButton postId={post._id} onDeleted={handlePostDeleted} />
                            </div>
)}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 text-center">
                <Link to="/feed" className="text-sm text-blue-600 hover:underline">
                    ← Back to feed
                </Link>
            </div>
        </div>
    );
}

export default Profile;