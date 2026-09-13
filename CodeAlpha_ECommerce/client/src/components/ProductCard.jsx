import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const outOfStock = product.stock === 0;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product._id);
  };

  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="border border-[#E5E1D8] rounded-md p-5 bg-white flex flex-col justify-between h-full transition-colors group-hover:border-[#3F5D45]">
        <div>
          {product.category && (
            <p className="text-[11px] tracking-wide text-[#8A8578] mb-2">{product.category}</p>
          )}
          <h3 className="font-serif-display text-lg text-[#1F2420] leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-[#8A8578] mt-2 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif-display text-lg text-[#C4623A]">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="text-sm px-3 py-1.5 rounded-sm border border-[#3F5D45] text-[#3F5D45] hover:bg-[#3F5D45] hover:text-white transition-colors disabled:border-[#E5E1D8] disabled:text-[#8A8578] disabled:hover:bg-transparent disabled:cursor-not-allowed"
          >
            {outOfStock ? 'Sold out' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;