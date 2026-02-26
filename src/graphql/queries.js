import { gql } from "@apollo/client";

///PRODUCTTTTSSSS
export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      productId
      name
      price
      finalPrice
      thumbnail
      images
      stock
      description
      brand
      category
      dimensions {
        depth
        height
        weight
        width
      }
      rating {
        count
        average
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategory {
    getCategory
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    getProductsByCategory(category: $category) {
      productId
      name
      price
      finalPrice
      images
      thumbnail
      stock
      description
      brand
      category
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    getProductById(productId: $productId) {
      productId
      name
      description
      price
      finalPrice
      images
      stock
      category
      brand
      thumbnail
      dimensions {
        depth
        height
        weight
        width
      }
      rating {
        count
        average
      }
    }
  }
`;

///////CARTTTTTTTTTTTTTTTTT

export const GET_CART = gql`
  query GetCart {
    getCart {
      userId
      totalPrice
      totalItems
      items {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
      }
      updatedAt
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart(
    $productId: ID!
    $name: String!
    $thumbnail: String
    $brand: String
    $category: String
    $finalPrice: Float!
    $discountPercentage: Float
    $quantity: Int!
  ) {
    addToCart(
      productId: $productId
      name: $name
      thumbnail: $thumbnail
      brand: $brand
      category: $category
      finalPrice: $finalPrice
      discountPercentage: $discountPercentage
      quantity: $quantity
    ) {
      userId
      totalPrice
      totalItems
      updatedAt
      items {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($productId: ID!, $quantity: Int!) {
    updateCartItem(productId: $productId, quantity: $quantity) {
      userId
      totalPrice
      totalItems
      updatedAt
      items {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($productId: ID!) {
    removeCartItem(productId: $productId) {
      userId
      totalPrice
      totalItems
      updatedAt
      items {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
      }
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart {
      userId
      totalPrice
      totalItems
      updatedAt
      items {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
      }
    }
  }
`;

//////ORDERSSSSSSSSSSSSSSS

export const PLACE_ORDER = gql`
  mutation PlaceOrder(
    $products: [CartItemInput!]!
    $total: Float!
    $totalProducts: Int!
    $address: AddressInput!
  ) {
    placeOrder(
      products: $products
      total: $total
      totalProducts: $totalProducts
      address: $address
    ) {
      orderId
      userId
      total
      totalProducts
      status
      createdAt
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      orderId
      userId
      total
      totalProducts
      status
      products {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
      }
      createdAt
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    getAllOrders {
      orderId
      userId
      total
      totalProducts
      status
      createdAt

      address {
        name
        contact
        street
        city
        state
        country
        zip
      }

      products {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        quantity
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      orderId
      userId
      total
      totalProducts
      status
      createdAt

      address {
        name
        contact
        street
        city
        state
        country
        zip
      }

      products {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        quantity
      }
    }
  }
`;

/////PROFILEEEEEEE

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      userId
      name
      email
      phone
      birthdate
      age
      gender
      bio
      avatar
      height
      weight

      address {
        name
        contact
        street
        city
        state
        country
        zip
      }

      createdAt
      updatedAt
    }
  }
`;

export const SAVE_USER_PROFILE = gql`
  mutation SaveUserProfile($input: UserProfileInput!) {
    saveUserProfile(input: $input) {
      userId
      name
      email
      phone
      birthdate
      age
      gender
      bio
      avatar
      height
      weight

      address { 
        name
        contact
        street
        city
        state
        country
        zip
      }

      createdAt
      updatedAt
    }
  }
`;

export const GET_AVATAR_UPLOAD_URL = gql`
  mutation GetAvatarUploadUrl($fileType: String!) {
    getAvatarUploadUrl(fileType: $fileType) {
      uploadUrl
      fileUrl
    }
  }
`;

