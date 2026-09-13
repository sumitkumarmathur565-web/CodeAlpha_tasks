import { useState } from 'react';
import api from '../api/axios';

function DeletePostButton({ postId, onDeleted }) {
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            await api.delete(`/posts/delete/${postId}`);
            onDeleted(postId); // tell parent to remove it from the list
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setConfirming(false);
        }
    }

    if (confirming) {
        return (
            <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Delete this post?</span>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="text-red-600 font-medium hover:underline disabled:opacity-50"
                >
                    {loading ? 'Deleting...' : 'Yes'}
                </button>
                <button
                    onClick={() => setConfirming(false)}
                    disabled={loading}
                    className="text-gray-500 hover:underline"
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setConfirming(true)}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
            Delete
        </button>
    );
}

export default DeletePostButton;