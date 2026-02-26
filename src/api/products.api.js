import { useQuery } from "@apollo/client/react";
import {
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "../graphql/queries";

export const getUserProducts = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  //debugger;
  return {
    products: data?.getProducts ?? [],
    loading,
    error,
  };
};

export const getCategories = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  // console.log(data);
  //debugger;
  return {
    category: data?.getCategory || [],
    loading,
  };
};

export const useProductsByCategory = (categoryName) => {
  //console.log("Category Name in API:", categoryName);
  const { loading, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: categoryName },
  });

  //console.log(data);

  return {
    products: data?.getProductsByCategory || [],
    loading,
  };
};

export const useProductById = (productId) => {
  const { loading, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: productId },
  });
  //console.log("API:", data);
  return {
    product: data?.getProductById || [],
    loading,
  };
};
