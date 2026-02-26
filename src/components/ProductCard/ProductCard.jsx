import { Link } from "react-router-dom";
import AddToCartButton from "../../UI/AddToCartButton";

export default function ProductCard({ product }) {
  //console.log("Rendering ProductCard for product:", product);
  return (
    <div className="product-card">
      <Link to={`/product/${product.productId}`}>
        <img src={product.thumbnail} alt={product.name} />

        <span className="new">
          {!product?.brand ? "Brand" : product?.brand}
        </span>
        <h3>{product.name}</h3>

        <span className="new">{product?.category}</span>

        <div className="price">
          <span className="old">₹{product?.price}</span>
          <span className="new">₹{product?.finalPrice}</span>
        </div>
      </Link>
      <AddToCartButton product={product}>Add to Cart</AddToCartButton>
    </div>
  );
}
