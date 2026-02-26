/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addToCart = /* GraphQL */ `
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
      items {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const updateCartItem = /* GraphQL */ `
  mutation UpdateCartItem($productId: ID!, $quantity: Int!) {
    updateCartItem(productId: $productId, quantity: $quantity) {
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
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const removeCartItem = /* GraphQL */ `
  mutation RemoveCartItem($productId: ID!) {
    removeCartItem(productId: $productId) {
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
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const clearCart = /* GraphQL */ `
  mutation ClearCart {
    clearCart {
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
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const placeOrder = /* GraphQL */ `
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
      products {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
        __typename
      }
      total
      totalProducts
      address {
        name
        contact
        street
        city
        state
        country
        zip
        __typename
      }
      createdAt
      status
      __typename
    }
  }
`;
export const updateOrderStatus = /* GraphQL */ `
  mutation UpdateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      orderId
      userId
      products {
        productId
        name
        thumbnail
        brand
        category
        finalPrice
        discountPercentage
        quantity
        __typename
      }
      total
      totalProducts
      address {
        name
        contact
        street
        city
        state
        country
        zip
        __typename
      }
      createdAt
      status
      __typename
    }
  }
`;
export const saveUserProfile = /* GraphQL */ `
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const getAvatarUploadUrl = /* GraphQL */ `
  mutation GetAvatarUploadUrl($fileType: String!) {
    getAvatarUploadUrl(fileType: $fileType) {
      uploadUrl
      fileUrl
      __typename
    }
  }
`;
export const sendUserMessage = /* GraphQL */ `
  mutation SendUserMessage($message: String!) {
    sendUserMessage(message: $message) {
      userId
      sender
      message
      createdAt
      __typename
    }
  }
`;
export const sendAdminMessage = /* GraphQL */ `
  mutation SendAdminMessage($userId: ID!, $message: String!) {
    sendAdminMessage(userId: $userId, message: $message) {
      userId
      sender
      message
      createdAt
      __typename
    }
  }
`;
