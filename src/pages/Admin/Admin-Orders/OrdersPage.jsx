import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, updateOrdStatus } from "../../../redux/orderSlice";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

import Button from "../../../UI/Button";
import {
  subscribeToOrderPlaced,
  subscribeToOrderUpdateStatus,
} from "../../../services/orderService";
import Loader from "../../../components/Loader";
import { pdfDownloadHelper } from "../../../utils/pdfDownloadHelper";

export default function AdminOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  useEffect(() => {
    const sub = subscribeToOrderPlaced((newOrder) => {
      //console.log("New order:", newOrder);

      dispatch(getAllOrder());
    });

    return () => sub.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const sub = subscribeToOrderUpdateStatus(() => {
      dispatch(getAllOrder());
    });

    return () => sub.unsubscribe();
  }, [dispatch]);

  const STATUS_OPTIONS = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

  const changeStatus = (orderId, newStatus) => {
    dispatch(updateOrdStatus({ orderId, status: newStatus }));
  };

  const { orders, loading, error } = useSelector((state) => state.orders);
  //console.log("ADMIN:", orders);
  //debugger;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsOpen(false);
  };

  const handleDownload = (elementId) => {
    try {
      pdfDownloadHelper(elementId,"orders");

      closeModal();
    } catch (err) {
      toast.error(err);
      console.error("Dowloading error: ", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-orders-page">
      <h2>All Orders</h2>
      <div className="order-grid-header">
        <span>Order ID</span>
        <span>User ID</span>
        <span>Total Products</span>
        <span>Status</span>
        <span>Total Amount</span>
      </div>
      <div className="orders-grid">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="order-row"
            onClick={() => openModal(order)}
            style={{ cursor: "pointer" }}
          >
            <span className="order-id">#{order.orderId}</span>
            <span className="order-user-id">{order.userId}</span>
            <span className="order-totalproducts">{order.totalProducts}</span>
            <select
              className={`status-select ${order.status?.toLowerCase()}`}
              value={order.status}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => changeStatus(order.orderId, e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <span className="order-total-bill">₹{order.total}</span>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} toggle={closeModal} size="lg" id="AdminOrders">
        <ModalHeader toggle={closeModal}>Order Details</ModalHeader>
        <ModalBody>
          {selectedOrder && (
            <>
              <div className="order-info">
                <h4>order #{selectedOrder?.orderId}</h4>
                <h5>
                  User : <strong>{selectedOrder?.userId}</strong>
                </h5>
                <h6>
                  <span
                    className={`order-status ${selectedOrder.status?.toLowerCase()}`}
                  >
                    {selectedOrder?.status}
                  </span>
                </h6>
                <p>
                  <span>Total :</span> <strong>₹ {selectedOrder?.total}</strong>
                </p>
                <p>
                  <span>Total Products :</span>{" "}
                  <strong>{selectedOrder?.totalProducts}</strong>
                </p>
                <p>
                  <span>Ordered At :</span>{" "}
                  <strong>
                    {new Date(selectedOrder?.createdAt).toLocaleString()}
                  </strong>
                </p>
              </div>
              <div className="order-user-detials">
                <p>
                  <span>Customer :</span>{" "}
                  <strong>{selectedOrder?.address?.name}</strong>
                </p>
                <p>
                  <span>Shipping Address :</span>
                  <strong>
                    {selectedOrder?.address?.street},{" "}
                    {selectedOrder?.address?.city},{" "}
                    {selectedOrder?.address?.state},{" "}
                    {selectedOrder?.address?.country} -{" "}
                    {selectedOrder?.address?.zip}
                  </strong>{" "}
                </p>
                <p>
                  <span>Contact :</span>
                  <strong>{selectedOrder?.address?.contact}</strong>{" "}
                </p>
              </div>
              <div className="order-invoice-items">
                {selectedOrder.products.map((p) => {
                  return (
                    <div key={p.id} className="order-product">
                      <Card className="order-product-card">
                        <img src={p.thumbnail} alt={p.name} />
                        <CardBody>
                          <CardTitle tag="h5">{p.name}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            x{p.quantity}
                          </CardSubtitle>
                          <CardText>
                            <strong>₹ {p.finalPrice}</strong>
                          </CardText>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedOrder?.status === "PLACED" && (
            <Button
              color="primary"
              onClick={() => changeStatus(selectedOrder.orderId, "DELIVERED")}
            >
              Mark as Delivered
            </Button>
          )}
          <Button onClick={() => handleDownload("AdminOrders")}>Download PDF</Button>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
