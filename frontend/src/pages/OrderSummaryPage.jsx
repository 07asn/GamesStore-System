// src/components/OrderSummaryPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';

import OrderStatusSection from '../components/order-summary/OrderStatusSection';
import RatingSection from '../components/order-summary/RatingSection';
import RatingModal from '../components/order-summary/RatingModal';
import ProductsSection from '../components/order-summary/ProductsSection';
import Processing from '../components/order-summary/Processing';

const OrderSummaryPage = () => {
  const location = useLocation();
  const { id } = useParams();
  // Use orderId from router state if available; otherwise fallback to URL parameter "id"
  const orderId = location.state?.orderId || id;

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://localhost:5000/api/orders/${orderId}`, { withCredentials: true })
        .then((res) => {
          console.log('Fetched order data:', res.data);
          const fetchedOrder = res.data.order;
          setOrder(fetchedOrder);
          // Transform order_items to the format expected by ProductsSection.
          if (fetchedOrder && fetchedOrder.order_items) {
            const transformedProducts = fetchedOrder.order_items.map((item) => ({
              id: item.order_item_id,
              // Use the first product image if available; otherwise, fallback image.
              image:
                item.product?.images && item.product.images.length > 0
                  ? item.product.images[0].image_url
                  : 'fallback.jpg',
              title: item.product?.name || 'Unknown Product',
              price: item.price_at_purchase,
              amount: item.quantity,
              total: (item.quantity * item.price_at_purchase).toFixed(2),
              // Use the assigned inventory asset code as the key if available; otherwise, use product keys.
              keys: item.inventory ? [item.inventory.asset_code] : (item.product?.keys || [])
            }));
            setProducts(transformedProducts);
          } else {
            setProducts([]);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch order details:', err);
          setError('Unable to load order details. Please try again.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError('No order ID provided.');
    }
  }, [orderId]);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[65vh]">
        <p className="text-gray-700 text-lg">Loading order details...</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[65vh]">
        <p className="text-red-500 font-semibold mb-2">{error || 'Order not found.'}</p>
        <Link to="/shop" className="text-blue-500 underline hover:text-blue-700">
          Back to shop
        </Link>
      </section>
    );
  }

  const purchaseDate = new Date(order.order_date).toLocaleString();
  const normalizedStatus = order.order_status?.toLowerCase().trim() || 'pending';

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 .5l6 6V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5l6-6z" />
            </svg>
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link to="/orders" className="hover:text-gray-900 transition-colors">
              Purchase Orders
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">Order Summary</li>
        </ol>
      </nav>

      {/* Order Status Section */}
      <OrderStatusSection
        orderNumber={order.order_id}
        purchaseDate={purchaseDate}
        status={order.order_status}
      />

      {/* Conditional Rendering: if status is pending, show Processing; else show Rating & Products */}
      {normalizedStatus === 'pending' ? (
        <Processing />
      ) : (
        <>
          <RatingSection onOpen={() => setRatingModalOpen(true)} />
          <ProductsSection products={products} />
        </>
      )}

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        feedback={feedback}
        setFeedback={setFeedback}
        onSubmit={() => {
          console.log('Submitted Rating:', selectedRating, feedback);
          setRatingModalOpen(false);
        }}
      />
    </section>
  );
};

export default OrderSummaryPage;
