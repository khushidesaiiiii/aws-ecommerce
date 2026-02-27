import { generateClient } from "aws-amplify/api";
import { placeOrder, updateOrderStatus } from "../amplify-graphql/mutations";
import { getAllOrders, getOrders } from "../amplify-graphql/queries";
import {
  onOrderPlaced,
  onOrderStatusUpdated,
} from "../amplify-graphql/subscriptions";

const getClient = () => generateClient();

export const PlaceOrder = async (orderData) => {
  const client = getClient();
  const res = await client.graphql({
    query: placeOrder,
    variables: orderData,
  });
  return res.data?.placeOrder;
};

export const GetOrders = async () => {
  const client = getClient();

  const res = await client.graphql({
    query: getOrders,
  });

  return res.data?.getOrders ?? [];
};

export const GetAllOrders = async () => {
  const client = getClient();

  const res = await client.graphql({
    query: getAllOrders,
  });

  return res.data?.getAllOrders ?? [];
};

export const UpdateOrderStatus = async (orderId, status) => {
  const client = getClient();

  const res = await client.graphql({
    query: updateOrderStatus,
    variables: { orderId, status },
  });
  //console.log("update status res:", res);
  return res.data?.updateOrderStatus ?? null;
};

export const subscribeToOrderPlaced = (callback) => {
  const client = getClient();

  const sub = client.graphql({ query: onOrderPlaced }).subscribe({
    next: ({ data }) => callback(data.onOrderPlaced),
    error: (err) => console.error("Order Subscription Error:", err),
  });

  return sub;
};

export const subscribeToOrderUpdateStatus = (callback) => {
  const client = getClient();

  const sub = client.graphql({ query: onOrderStatusUpdated }).subscribe({
    next: ({ data }) => callback(data.onOrderStatusUpdated),
    error: (err) => console.error("Order Status Subscription Error:", err),
  });

  return sub;
};

// import {
//   GET_ALL_ORDERS,
//   GET_ORDERS,
//   PLACE_ORDER,
//   UPDATE_ORDER_STATUS,
// } from "../graphql/queries";

// import { setContext } from "@apollo/client/link/context";
// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import {
//   onOrderPlaced,
//   onOrderStatusUpdated,
// } from "../amplify-graphql/subscriptions";

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

// export const placeOrder = async (orderData) => {
//   const res = await client.mutate({
//     mutation: PLACE_ORDER,
//     variables: orderData,
//   });
//   return res.data?.placeOrder;
// };

// export const getOrders = async () => {
//   try {
//     const res = await client.query({
//       query: GET_ORDERS,
//       fetchPolicy: "network-only",
//     });
//     return res?.data?.getOrders || [];
//   } catch (error) {
//     console.error("getOrders error:", error);
//     throw error;
//   }
// };

// export const getAllOrders = async () => {
//   try {
//     const res = await client.query({
//       query: GET_ALL_ORDERS,
//       fetchPolicy: "network-only",
//     });
//     //console.log("ADMIN:", res);

//     return res?.data?.getAllOrders || [];
//   } catch (error) {
//     console.error("getAllOrders error:", error);
//     throw error;
//   }
// };

// export const updateOrderStatus = async (orderId, status) => {
//   //debugger;
//   try {
//     const res = await client.mutate({
//       mutation: UPDATE_ORDER_STATUS,
//       variables: { orderId, status },
//     });
//     console.log("status res:", res);
//     //debugger;
//     return res.data?.updateOrderStatus;
//   } catch (error) {
//     console.error("updateStatus error:", error);
//     throw error;
//   }
// };
