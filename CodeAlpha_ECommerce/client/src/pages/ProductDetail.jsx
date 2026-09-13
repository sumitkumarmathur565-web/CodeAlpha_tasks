import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  const outOfStock = product.stock === 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline text-sm">&larr; Back to products</Link>

      <div className="bg-white rounded-lg shadow p-6 mt-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {product.category && (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-2">
            {product.category}
          </span>
        )}
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-blue-600 font-bold text-xl mt-4">₹{product.price}</p>
        <p className={`text-sm mt-1 ${outOfStock ? 'text-red-500' : 'text-green-600'}`}>
          {outOfStock ? 'Out of Stock' : `${product.stock} in stock`}
        </p>

        <button
          disabled={outOfStock}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;