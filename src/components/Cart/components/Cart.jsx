import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "../../../UI/Button";
import { deleteItem, updateItem } from "../../../redux/cartSlice";
import Loader from "../../Loader";

export default function Cart({ isOpen, toggle, onCheckout }) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.cart);
  const cartState = useSelector((state) => state.cart);
  //console.log("FULL CART STATE:", cartState);

  const items = useSelector((state) => state.cart?.items);
  //console.log("Cart items:", items);
  const totalPrice = useSelector((state) => state.cart?.totalPrice || 0);
  const totalItems = useSelector((state) => state.cart?.totalItems || 0); 

 const handleIncrease = (item) => {
    dispatch(updateItem({ productId: item.productId, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateItem({ productId: item.productId, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(deleteItem(productId));
    toast.success("Item removed");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Your Cart</ModalHeader>
      <ModalBody>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item-card" key={item.productId}>
                <div className="cart-item-left">
                  <div className="cart-item-image">
                    <img src={item.thumbnail} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <h6>{item.name}</h6>
                    <p>
                      {item.brand} • {item.category}
                    </p>
                  </div>
                  <div className="cart-item-price-wrapper">
                    <span className="cart-item-price">₹{item.finalPrice}</span>
                    {item.discountPercentage && (
                      <span className="cart-item-discount">
                        {item.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="cart-item-center">
                  <button
                    className="quantity-btn quantity-decrease"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>

                  <span className="quantity-value">{item.quantity}</span>

                  <button
                    className="quantity-btn quantity-increase"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-right">
                  <h6 className="cart-item-subtotal">
                    ₹{item.finalPrice * item.quantity}
                  </h6>

                  <Button
                    className="cart-item-remove-btn"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        {items.length === 0 ? (
          ""
        ) : (
          <h5 className="cart-total">Total: ₹ {totalPrice}</h5>
        )}
        <div className="cart-btns">
          {items.length === 0 ? (
            ""
          ) : (
            <Button onClick={onCheckout}>Checkout</Button>
          )}{" "}
          <Button onClick={toggle}>Cancel</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
