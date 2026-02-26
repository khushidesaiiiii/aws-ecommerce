import { getCurrentUser } from "aws-amplify/auth";
import { getUserProducts } from "../../api/products.api";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Products() {
  // getCurrentUser()
  //   .then((user) => console.log("Amplify user:", user))
  //   .catch((err) => console.log("Amplify sees NO user"));
  
  const { products, loading, error } = getUserProducts();
  //console.log("Products Length:", products.length);
  //console.log("Products array:", products);

  const token = localStorage.getItem("idToken");
  //console.log(JSON.parse(atob(token.split(".")[1])));

  if (loading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
