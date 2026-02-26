import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../api/products.api";
import { useEffect, useState } from "react";
import AddToCartButton from "../../UI/AddToCartButton";
import Button from "../../UI/Button";

export default function ProductsDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { product, loading } = useProductById(productId);
  //console.log(product);

  const [activeImage, setActiveImage] = useState();

  useEffect(() => {
    if (product?.images?.length) {
      setActiveImage(product?.images[0]);
      //console.log(product?.images[0]);
    }
  }, [product]);

  return (
    <div className="product-details-page">
      <Button
        onClick={() => {
          navigate("/product");
        }}
      >{`<- Back To Products`}</Button>
      <div className="products-detail-grid-column">
        <div className="grid-one-product-image">
          <img
            src={activeImage}
            alt={product?.name || "Product Image"}
            className="main-image"
          />
          <div className="image-thumbnail">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                className={activeImage === img ? "active" : ""}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="grid-two-product-details">
          <div className="product-header">
            <span className="product-details-brand">
              {product?.brand || "Brand"}
            </span>

            <h1 className="product-details-product-title">{product?.name}</h1>

            <p className="product-details-category">{product?.category}</p>
          </div>

          <div className="product-details-price-section">
            <span className="old">₹{product?.price}</span>
            <span className="new">₹{product?.finalPrice}</span>
          </div>

          <div className="product-details-description-section">
            <h3>Description</h3>
            <p>{product?.description}</p>
          </div>

          <div className="product-details-meta-grid">
            <div className="product-details-dimensions">
              <h3>Dimensions</h3>
              <div className="product-details-dimension-row">
                <span>Depth</span>
                <span>{product?.dimensions?.depth} </span>
              </div>
              <div className="product-details-dimension-row">
                <span>Height</span>
                <span>{product?.dimensions?.height} </span>
              </div>
              <div className="product-details-dimension-row">
                <span>Width</span>
                <span>{product?.dimensions?.width} </span>
              </div>
              <div className="product-details-dimension-row">
                <span>Weight</span>
                <span>{product?.dimensions?.weight} </span>
              </div>
            </div>

            <div className="product-details-ratings">
              <h3>Ratings</h3>
              <div className="product-details-rating-value">
                {product?.rating?.average} ⭐
              </div>
              <p className="product-details-rating-count">
                {product?.rating?.count} Reviews
              </p>
            </div>
          </div>
          <div className="action-buttons">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
