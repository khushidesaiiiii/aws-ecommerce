import { useNavigate, useParams } from "react-router-dom";
import { useProductsByCategory } from "../../api/products.api";
import ProductCard from "../../components/ProductCard/index";
import { getBackgroundImage } from "../../assets/images/category/CategoryImages";
import Button from "../../UI/Button";

export default function ProductsByCategory() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useProductsByCategory(categoryName);
  //console.log(products);

  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="products-page">
      <div className="banner-card">
        <img
          className="background-img"
          src={getBackgroundImage(categoryName)}
          alt={`${categoryName}`}
        />
        <h2>{categoryName ? formatCategoryName(categoryName) : "ok"}</h2>
      </div>
      <Button
        onClick={() => {
          navigate("/category");
        }}
      >{`<- Back To Categories`}</Button>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </div>
    </div>
  );
}
