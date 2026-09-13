import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, loading } = useCart();

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link to="/" className="text-blue-600 hover:underline">Browse products</Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.items.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">₹{item.product.price} × {item.quantity}</p>
            </div>
            <p className="font-bold text-blue-600">₹{item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-bold text-blue-600">₹{total}</span>
      </div>
    </div>
  );
}

export default Cart;