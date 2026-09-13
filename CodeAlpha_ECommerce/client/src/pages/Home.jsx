import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data.products))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10 text-[#8A8578]">Loading products…</p>;
  if (error) return <p className="text-center mt-10 text-[#C4623A]">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif-display text-3xl text-[#1F2420] mb-8">All products</h1>

      {products.length === 0 ? (
        <p className="text-[#8A8578]">Nothing here yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;