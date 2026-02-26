import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, updateOrdStatus } from "../../redux/orderSlice";
import Button from "../../UI/Button";
import Loader from "../../components/Loader/index";
//import { getAllOrders } from "../../amplify-graphql/queries";
import {
  subscribeToOrderPlaced,
  subscribeToOrderUpdateStatus,
} from "../../services/orderService";

export default function Order() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  useEffect(() => {
    const sub = subscribeToOrderPlaced((newOrder) => {
      //console.log("New order received:", newOrder);

      dispatch(getUserOrders());
    });

    return () => sub.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const sub = subscribeToOrderUpdateStatus(() => {
      dispatch(getUserOrders());
    });

    return () => sub.unsubscribe();
  }, [dispatch]);

  const changeStatus = (orderId, newStatus) => {
    dispatch(updateOrdStatus({ orderId, status: newStatus }));
  };

  const ordersRaw = useSelector((state) => state.orders?.orders);

  const orders = Array.isArray(ordersRaw)
    ? ordersRaw
    : ordersRaw
      ? [ordersRaw]
      : []; //console.log("order:", orders);

  const { loading, error } = useSelector((state) => state?.orders) || {};

  // console.log("orders in render:", orders);
  // console.log("isArray:", Array.isArray(orders));

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="order-page">
      <h2> Orders Page</h2>
      <div className="order-cards">
        {orders.length === 0 && (
          <h4 style={{ textAlign: "center" }}>
            No Orders yet! Continue Shopping..
          </h4>
        )}
        {orders?.map((ord) => {
          const products = Array.isArray(ord.products) ? ord.products : [];
          return (
            <div className="order-card" key={ord.orderId}>
              <h3>Order ID: {ord.orderId}</h3>
              <p>
                <span className={`order-status ${ord.status?.toLowerCase()}`}>
                  {ord.status}
                </span>
              </p>
              <div className="ordered-products-row">
                {products.length === 0 ? (
                  <p>No products found</p>
                ) : (
                  products.map((p) => (
                    <div className="ordered-product-card" key={p.productId}>
                      <div className="pro-image">
                        <img src={p.thumbnail} alt={p.name} />
                      </div>
                      <h5>{p.brand}</h5>
                      <h4>{p.name}</h4>
                      <p>x {p.quantity}</p>
                      <div className="price">
                        <span className="new">₹{p?.finalPrice}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="order-summary">
                <p>Total Products: {ord.totalProducts}</p>
                <p>Total Price: ₹{ord.total}</p>
                <p>Status: {ord.status}</p>
                <p>Ordered At: {new Date(ord.createdAt).toLocaleString()}</p>
                {(ord.status === "PLACED" || ord.status === "SHIPPED") && (
                  <Button
                    className="cancel-order-button"
                    onClick={() => changeStatus(ord.orderId, "CANCELLED")}
                  >
                    Cancel Order
                  </Button>
                )}
                {ord.status === "CANCELLED" && (
                  <p className="order-status cancelled">Order Cancelled</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
