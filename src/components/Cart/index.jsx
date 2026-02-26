import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import Checkout from "./components/Checkout";

export default function CartController() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutPage, setCheckoutPage] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);

  const items = useSelector((state) => state.cart?.items);
  const cartCount = items?.length;

  return (
    <>
      <div className="nav-cart-btn">
        <button onClick={toggleCart}>
          <div className="cart-count">{cartCount}</div>
          <FaShoppingCart />
        </button>
      </div>
      {cartOpen && (
        <Cart
          isOpen={cartOpen}
          toggle={toggleCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutPage(true);
          }}
        />
      )}
      {checkoutPage && (
        <Checkout
          isOpen={checkoutPage}
          toggle={() => setCheckoutPage(!checkoutPage)}
          onSucess={() => {
            setCheckoutPage(false);
          }}
        />
      )}
    </>
  );
}
