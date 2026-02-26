import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

import { placeUserOrder } from "../../../redux/orderSlice";
import { clearCart } from "../../../redux/cartSlice";
import Button from "../../../UI/Button";
import { invoiceDownloadHelper } from "../utils/invoiceDownloadHelper";

export default function Checkout({ isOpen, onSucess, toggle }) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart?.items);
  //console.log("Checkout:", items);
  const totalPrice = useSelector((state) => state.cart?.totalPrice || 0);
  const totalItems = useSelector((state) => state.cart?.totalItems || 0);

  const [step, setStep] = useState("summary");
  const [address, setAddress] = useState({
    name: "",
    contact: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  function handleContinue() {
    setStep("address");
  }

  function handleClose() {
    setStep("summary");
    toggle();
  }

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => e.preventDefault();

  // const navigate = useNavigate();
  function validateAddress() {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!address.name.trim()) return "Enter full name";
    if (!phoneRegex.test(address.contact))
      return "Enter valid 10-digit mobile number";
    if (!address.street.trim()) return "Enter street";
    if (!address.city.trim()) return "Enter city";
    if (!address.state.trim()) return "Enter state";
    if (!address.country.trim()) return "Enter country";
    if (address.zip.length < 5) return "Enter valid ZIP code";

    return null;
  }

  const placeOrderHandler = async () => {
    const errMessage = validateAddress();
    if (errMessage) {
      toast.info(errMessage);
      return;
    }

    const sanitizedProducts = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      thumbnail: item.thumbnail,
      brand: item.brand,
      category: item.category,
      finalPrice: item.finalPrice,
      quantity: item.quantity,
    }));

    const orderData = {
      products: sanitizedProducts,
      total: totalPrice,
      totalProducts: totalItems,
      address,
    };

    await dispatch(placeUserOrder(orderData))
      .unwrap()
      .then(() => {
        toast.success("Order placed successfully!");
        setStep("receipt");
      })
      .catch((err) => {
        //console.error("order err:", err);
        toast.error("Order failed ", err);
      });
  };

  function orderPlacedHandle() {
    // dispatch(clearCart());
    // localStorage.removeItem("cartItems");
    // setStep("summary");
    // navigate("/", { replace: true });
    dispatch(clearCart());

    onSucess();
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const [dowloading, setDownloading] = useState(false);

  const handleDownloadInvoice = async () => {
    try {
      setDownloading(true);
      invoiceDownloadHelper();

      dispatch(clearCart());
      setDownloading(false);

      onSucess();
      //try {
      //       const element = document.getElementById("invoice-content");

      //       if (!element) {
      //         toast.error("Failed to download Invoice");
      //         return;
      //       }

      //       const html = `
      //   <!DOCTYPE html>
      //   <html>
      //     <head>
      //       <meta charset="UTF-8" />

      //       <!-- Bootstrap (Reactstrap dependency) -->
      //       <link rel="stylesheet"
      //         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

      //       <!-- YOUR APP CSS VARIABLES + STYLES -->
      //       <style>

      //         /* ===== ROOT VARIABLES ===== */
      //         :root {
      //           --bg-white: #ffffff;
      //           --bg-light: #f7f8fc;
      //           --text-dark: #1f2937;
      //           --text-muted: #6b7280;
      //           --primary-purple: #6a5cff;
      //           --primary-gradient: linear-gradient(135deg, #6a5cff, #9f7aea);
      //           --radius-lg: 20px;
      //           --radius-md: 14px;
      //           --radius-sm: 8px;
      //           --shadow-soft: 0 10px 25px rgba(0,0,0,0.08);
      //           --border-light: #e5e7eb;
      //         }

      //         body {
      //   font-family: "Inter", "Poppins", system-ui, sans-serif;
      //   background-color: var(--bg-light);
      //   color: var(--text-dark);
      //   line-height: 1.6;
      // }
      //   img {
      //   display: block;
      //   max-width: 100%;
      // }
      //   * {
      //   -webkit-print-color-adjust: exact;
      //   print-color-adjust: exact;
      // }
      //         /* ===== YOUR EXACT INVOICE STYLES ===== */

      //         .invoice-card {
      //           background: var(--bg-white);
      //           border-radius: var(--radius-lg);
      //           padding: 24px 26px;
      //           box-shadow: var(--shadow-soft);
      //         }

      //         .invoice-header {
      //           display: flex;
      //           justify-content: space-between;
      //           align-items: center;
      //           margin-bottom: 12px;
      //         }

      //         .invoice-header h2 {
      //           font-size: 24px;
      //           font-weight: 900;
      //           background: var(--primary-gradient);
      //           -webkit-background-clip: text;
      //           -webkit-text-fill-color: transparent;
      //         }

      //         .invoice-badge {
      //           background: #16a34a;
      //           color: #fff;
      //           font-size: 12px;
      //           font-weight: 700;
      //           padding: 6px 12px;
      //           border-radius: 50px;
      //         }

      //         .invoice-subtext {
      //           font-size: 14px;
      //           color: var(--text-muted);
      //           margin-bottom: 18px;
      //         }

      //         .invoice-user-details {
      //           background: var(--bg-light);
      //           border-radius: var(--radius-md);
      //           padding: 16px 18px;
      //           display: grid;
      //           gap: 12px;
      //         }

      //         .invoice-user-details p {
      //           margin: 0;
      //           font-size: 16px;
      //           display: grid;
      //           grid-template-columns: 160px 1fr;
      //           gap: 8px;
      //         }

      //         .invoice-user-details span {
      //           color: var(--text-muted);
      //         }

      //         .invoice-user-details strong {
      //           color: var(--text-dark);
      //         }

      //         .cart-items {
      //           display: flex;
      //           flex-direction: column;
      //           gap: 18px;
      //         }

      //         .cart-item-card {
      //           background: var(--bg-white);
      //           padding: 18px 20px;
      //           border-radius: var(--radius-lg);
      //           box-shadow: var(--shadow-soft);
      //         }

      //         .cart-item-left {
      //           display: flex;
      //           align-items: center;
      //           gap: 16px;
      //         }

      //         .cart-item-image img {
      //           width: 100px;
      //           height: 100px;
      //           object-fit: contain;
      //           border-radius: var(--radius-md);
      //           background: #f5f5f5;
      //           padding: 6px;
      //         }

      //         .cart-item-info h6 {
      //           margin: 0;
      //           font-weight: 700;
      //         }

      //         .cart-item-info p {
      //           margin: 2px 0 0;
      //           font-size: 12px;
      //           color: var(--text-muted);
      //         }

      //         .cart-item-center {
      //           background: var(--bg-light);
      //           padding: 6px 12px;
      //           border-radius: 30px;
      //           font-weight: 600;
      //         }

      //         .cart-item-right {
      //           margin-left: auto;
      //           font-weight: 800;
      //         }

      //         .cart-item-subtotal {
      //   font-weight: 800;
      //   font-size: 16px;
      // }
      //   .invoice-section .cart-items h5 {
      //     font-size: 18px;
      //     font-weight: 900;
      //     color: var(--primary-purple);
      //     margin-top: 10px;
      // }

      //         hr {
      //           border: none;
      //           border-top: 1px solid var(--border-light);
      //         }

      //         h5 {
      //           font-weight: 900;
      //           color: var(--primary-purple);
      //         }
      //         h4 {
      //         font-weight: 800;
      //     margin-bottom: 18px;
      //     color: var(--text-dark);
      //     margin-top: 12px;
      //         }
      //       </style>
      //     </head>

      //     <body>
      //       ${element.outerHTML}
      //     </body>
      //   </html>
      //   `;

      //       const res = await fetch(
      //         "https://jh1zlm14me.execute-api.ap-south-1.amazonaws.com/generateInvoice/generate-invoice",
      //         {
      //           method: "POST",
      //           headers: { "Content-Type": "application/json" },
      //           body: JSON.stringify({ html }),
      //         },
      //       );

      //       const data = await res.json();

      //       const a = document.createElement("a");
      //       a.href = data.url;
      //       a.download = "invoice.pdf";
      //       a.click();
      //       toast.success("Invoice Downloading");
    } catch (err) {
      setDownloading(false);
      toast.error(err);
      console.error("Dowloading error: ", err);
    } 
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>
          {step === "receipt" ? "Receipt" : "Checkout"}
        </ModalHeader>
        <ModalBody>
          <div className="checkout-steps">
            <div
              className={`step ${step !== "address" || step === "receipt" ? "active" : ""}`}
            >
              <div className="step-circle">1</div>
              <span>Summary</span>
            </div>

            <div
              className={`step ${step === "address" || step === "receipt" ? "active" : ""}`}
            >
              <div className="step-circle">2</div>
              <span>Address</span>
            </div>

            <div className={`step ${step === "receipt" ? "active" : ""}`}>
              <div className="step-circle">3</div>
              <span>Done</span>
            </div>
          </div>

          {step === "summary" && (
            <>
              <h4>Order Summary</h4>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.productId}>
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
                        <div className="cart-item-center">
                          <span className="quantity-value">
                            x{item.quantity}
                          </span>
                        </div>
                        <div className="cart-item-right">
                          <h6 className="cart-item-subtotal">
                            ₹{item.finalPrice * item.quantity}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
                <h5>Total: ₹ {totalPrice}</h5>
              </div>
            </>
          )}
          {step === "address" && (
            <>
              <h4>Shipping Address</h4>
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  required
                  value={address.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                />
                <input
                  name="contact"
                  type="number"
                  required
                  value={address.contact}
                  placeholder="Enter your conatct number"
                  onChange={handleChange}
                />
                <input
                  name="street"
                  type="text"
                  required
                  value={address.street}
                  placeholder="Enter your street name"
                  onChange={handleChange}
                />
                <input
                  name="city"
                  type="text"
                  required
                  value={address.city}
                  placeholder="Enter your city"
                  onChange={handleChange}
                />
                <input
                  name="state"
                  type="text"
                  required
                  value={address.state}
                  placeholder="Enter your state"
                  onChange={handleChange}
                />
                <input
                  name="country"
                  type="text"
                  required
                  value={address.country}
                  placeholder="Enter your country"
                  onChange={handleChange}
                />
                <input
                  name="zip"
                  type="number"
                  required
                  value={address.zip}
                  placeholder="Enter your zip code"
                  onChange={handleChange}
                />
              </form>
            </>
          )}
          {step === "receipt" && (
            <>
              <div className="invoice-card" id="invoice-content">
                <div className="invoice-header">
                  <h2>Your Invoice</h2>
                  <span className="invoice-badge">Paid</span>
                </div>

                <p className="invoice-subtext">
                  Thank you{" "}
                  {/* <strong>
                    {authUser?.firstName} {authUser?.lastName}
                  </strong>{" "} */}
                  for your purchase! Your order has been placed successfully.
                </p>
                <h4 className="invoice-section">User Details</h4>
                <div className="invoice-user-details">
                  <p>
                    <span>Customer :</span> <strong>{address.name}</strong>
                  </p>
                  <p>
                    <span>Shipping Address :</span>
                    <strong>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.country} - {address.zip}
                    </strong>{" "}
                  </p>
                  <p>
                    <span>Contact :</span>
                    <strong>{address.contact}</strong>{" "}
                  </p>
                  <p>
                    <span>Estimated Delivery : </span>
                    <strong>{deliveryDate.toDateString()}</strong>
                  </p>
                </div>
                <div className="invoice-section">
                  <h4>Order Details</h4>

                  <div className="cart-items">
                    {items.map((item) => (
                      <div key={item.productId}>
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
                            <div className="cart-item-center">
                              <span className="quantity-value">
                                x{item.quantity}
                              </span>
                            </div>
                            <div className="cart-item-right">
                              <h6 className="cart-item-subtotal">
                                ₹{item.finalPrice * item.quantity}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <hr />
                    <h5>Total: ₹ {totalPrice}</h5>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="cart-btns">
            {step === "summary" ? (
              <>
                <Button onClick={handleContinue}>Continue</Button>
                <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </>
            ) : step === "address" ? (
              <>
                <Button onClick={placeOrderHandler}>Place Order</Button>
                <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleDownloadInvoice}>
                  {dowloading ? "Downloading..." : "Download Invoice"}
                </Button>
                <Button onClick={orderPlacedHandle}>Continue Shopping</Button>
              </>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
