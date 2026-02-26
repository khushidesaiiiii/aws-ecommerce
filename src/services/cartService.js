import { generateClient } from "aws-amplify/api";
import { getCart } from "../amplify-graphql/queries";
import {
  addToCart,
  clearCart,
  removeCartItem,
  updateCartItem,
} from "../amplify-graphql/mutations";

import { onCartUpdated } from "../amplify-graphql/subscriptions";

const getClient = () => generateClient();

export const getCartData = async () => {
  const res = await getClient().graphql({ query: getCart });
  //console.log("Cart data response:", res);
  return res.data?.getCart ?? null;
};

export const AddToCart = async (product) => {
  const res = await getClient().graphql({
    query: addToCart,
    variables: {
      productId: product.productId,
      name: product.name,
      thumbnail: product.thumbnail,
      brand: product.brand,
      category: product.category,
      finalPrice: product.finalPrice || product.price,
      discountPercentage: product.discountPercentage,
      quantity: 1,
    },
  });
  //console.log("Add to cart response:", res);
  return res.data?.addToCart ?? null;
};

export const UpdateCart = async (productId, quantity) => {
  const res = await getClient().graphql({
    query: updateCartItem,
    variables: { productId, quantity },
  });
  return res.data?.updateCartItem ?? null;
};

export const deleteCartItem = async (productId) => {
  const res = await getClient().graphql({
    query: removeCartItem,
    variables: { productId },
  });
  return res.data?.removeCartItem ?? null;
};

export const ClearCart = async () => {
  const res = await getClient().graphql({ query: clearCart });
  return res.data?.clearCart ?? null;
};

export const subscribeToCart = (callback) => {
  const client = getClient();

  const subscription = client
    .graphql({
      query: onCartUpdated
    })
    .subscribe({
      next: ({ data }) => callback(data.onCartUpdated),
      error: (err) => console.error("Subscription error:", err),
    });

  return subscription;
};


/////////////////////////////////Apollo Client Setup and Cart Service Functions/////////////////////////////////
// import {
//   ADD_TO_CART,
//   CLEAR_CART,
//   GET_CART,
//   REMOVE_CART_ITEM,
//   UPDATE_CART_ITEM,
// } from "../graphql/queries";
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// const httpLink = new HttpLink({
//   uri: import.meta.env.VITE_APPSYNC_URL,
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("idToken");

//   //console.log("Auth Link - Token:", token);

//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? token : "",
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export const getCart = async () => {
//   const res = await client.query({
//     query: GET_CART,
//     fetchPolicy: "network-only",
//   });
//   return res.data?.getCart ?? null;
// };

// export const addToCart = async (product) => {
//   // console.log("Sending mutation", {
//   //   productId: product.productId,
//   //   name: product.name,
//   //   thumbnail: product.thumbnail,
//   //   brand: product.brand,
//   //   category: product.category,
//   //   finalPrice: product.finalPrice || product.price,
//   //   discountPercentage: product.discountPercentage,
//   //   quantity: 1,
//   // })
//   const res = await client.mutate({
//     mutation: ADD_TO_CART,
//     variables: {
//       productId: product.productId,
//       name: product.name,
//       thumbnail: product.thumbnail,
//       brand: product.brand,
//       category: product.category,
//       finalPrice: product.finalPrice || product.price,
//       discountPercentage: product.discountPercentage,
//       quantity: 1,
//     },
//   });
//   //console.log("Add to cart response:", res);
//   return res.data?.addToCart;
// };

// export const updateCartItem = async (productId, quantity) => {
//   const res = await client.mutate({
//     mutation: UPDATE_CART_ITEM,
//     variables: {
//       productId,
//       quantity,
//     },
//   });
//   return res.data?.updateCartItem;
// };

// export const removeCartItem = async (productId) => {
//   const res = await client.mutate({
//     mutation: REMOVE_CART_ITEM,
//     variables: {
//       productId,
//     },
//   });
//   return res.data?.removeCartItem;
// };

// export const clearCart = async () => {
//   const res = await client.mutate({
//     mutation: CLEAR_CART,
//   });
//   return res.data?.clearCart;
// };
