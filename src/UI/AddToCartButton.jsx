import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { addItem } from "../redux/cartSlice";
import { toast } from "react-toastify";

export default function AddToCartButton({ product }) {
  //console.log("AddToCartButton rendered with product:", product);

  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const dispatch = useDispatch();
  const handleAddToCart = async (product) => {
    //console.log("Adding to cart:", product);
    
    try {
      if(!isAuthenticated) {
        toast.error("Please login to Add to Cart");
        return;
      }
      await dispatch(
        addItem({
          productId: product.productId,
          name: product.name,
          price: product.finalPrice || product.price,
          quantity: 1,
          thumbnail: product.thumbnail,
          brand: product.brand,
          category: product.category,
          discountPercentage: product.discountPercentage,
        }),
      ).unwrap();

      toast.success("Item added to cart!");
    } catch (err) {
      toast.error("Failed to Add to Cart: " + err);
    }
  };
  return (
    <>
      <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
    </>
  );
}
