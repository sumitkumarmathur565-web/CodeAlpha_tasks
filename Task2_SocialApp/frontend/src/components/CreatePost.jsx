import { useState } from 'react';
import api from '../api/axios';

function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');
        try {
            const res = await api.post('/posts/createPost', { content });
            onPostCreated(res.data.post); // pass the new post back up to the parent
            setContent('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-6"
        >
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className="w-full resize-none border-0 focus:ring-0 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
            />
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <div className="flex justify-end pt-2 border-t border-gray-50">
                <button
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
    );
}

export default CreatePost;