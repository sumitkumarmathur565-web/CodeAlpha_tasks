import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function LikeButton({ postId, initialLikes }) {
    const { user } = useAuth();
    const [likes, setLikes] = useState(initialLikes || []);
    const [loading, setLoading] = useState(false);

    const isLiked = user && likes.includes(user.id);

    async function handleLike() {
        if (loading) return;
        setLoading(true);

        // optimistic update — flip the UI immediately, revert if the request fails
        const prevLikes = likes;
        if (isLiked) {
            setLikes(likes.filter(id => id !== user.id));
        } else {
            setLikes([...likes, user.id]);
        }

        try {
            await api.post(`/posts/like/${postId}`);
        } catch (err) {
            setLikes(prevLikes); // revert on failure
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isLiked ? '#ef4444' : 'none'}
                stroke={isLiked ? '#ef4444' : 'currentColor'}
                strokeWidth="2"
                className="w-5 h-5 transition-transform active:scale-90"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
            <span className={isLiked ? 'text-red-500 font-medium' : ''}>
                {likes.length}
            </span>
        </button>
    );
}

export default LikeButton;