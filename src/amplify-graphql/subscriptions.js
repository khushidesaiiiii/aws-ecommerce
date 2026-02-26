/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCartUpdated = /* GraphQL */ `
  subscription onCartUpdated {
    onCartUpdated {
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
export const onOrderPlaced = /* GraphQL */ `
  subscription onOrderPlaced {
    onOrderStatusUpdated {
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
export const onOrderStatusUpdated = /* GraphQL */ `
  subscription onOrderStatusUpdated {
    onOrderStatusUpdated {
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
export const onUserProfileUpdated = /* GraphQL */ `
  subscription OnUserProfileUpdated {
    OnUserProfileUpdated {
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
export const onMessageReceived = /* GraphQL */ `
  subscription OnMessageReceived {
    onMessageReceived {
      userId
      sender
      message
      createdAt
      __typename
    }
  }
`;
