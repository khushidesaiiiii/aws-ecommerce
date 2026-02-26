/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProducts = /* GraphQL */ `
  query GetProducts {
    getProducts {
      productId
      name
      description
      price
      finalPrice
      discountPercentage
      stock
      category
      sku
      thumbnail
      brand
      images
      rating {
        average
        count
        __typename
      }
      dimensions {
        width
        height
        depth
        weight
        __typename
      }
      __typename
    }
  }
`;
export const getProductsByCategory = /* GraphQL */ `
  query GetProductsByCategory($category: String!) {
    getProductsByCategory(category: $category) {
      productId
      name
      description
      price
      finalPrice
      discountPercentage
      stock
      category
      sku
      thumbnail
      brand
      images
      rating {
        average
        count
        __typename
      }
      dimensions {
        width
        height
        depth
        weight
        __typename
      }
      __typename
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory {
    getCategory
  }
`;
export const getProductById = /* GraphQL */ `
  query GetProductById($productId: ID!) {
    getProductById(productId: $productId) {
      productId
      name
      description
      price
      finalPrice
      discountPercentage
      stock
      category
      sku
      thumbnail
      brand
      images
      rating {
        average
        count
        __typename
      }
      dimensions {
        width
        height
        depth
        weight
        __typename
      }
      __typename
    }
  }
`;
export const getCart = /* GraphQL */ `
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
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const getOrders = /* GraphQL */ `
  query GetOrders {
    getOrders {
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
export const getAllOrders = /* GraphQL */ `
  query GetAllOrders {
    getAllOrders {
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
export const getUserProfile = /* GraphQL */ `
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat ($userId: ID!) {
    getChat(userId: $userId) {
      userId
      sender
      message
      name
      email
      avatar
      createdAt
      __typename
    }
  }
`;

export const getAllChats = /* GraphQL */ `
  query GetAllChats {
    getAllChats {
      userId
      sender
      message
      name
      email
      avatar
      createdAt
      __typename
    }
  }
`;
