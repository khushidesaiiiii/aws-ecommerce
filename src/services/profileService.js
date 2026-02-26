import { GET_USER_PROFILE, SAVE_USER_PROFILE } from "../graphql/queries";
import { GET_AVATAR_UPLOAD_URL } from "../graphql/queries";

import { setContext } from "@apollo/client/link/context";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APPSYNC_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("idToken");

  //console.log("Auth Link - Token:", token);

  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const getUserProfile = async () => {
  try {
    const res = await client.query({
      query: GET_USER_PROFILE,
      fetchPolicy: "network-only",
    });
    return res.data?.getUserProfile;
  } catch (error) {
    console.error("getUserProfile Error: ", error);
    throw error;
  }
};

export const saveUserProfile = async (profile) => {
  try {
    //console.log("Profile input:", profile);
    const cleanProfile = {
      ...profile,
      address: profile.address
        ? {
            name: profile.address.name,
            contact: profile.address.contact,
            street: profile.address.street,
            city: profile.address.city,
            state: profile.address.state,
            country: profile.address.country,
            zip: profile.address.zip,
          }
        : null,
    };
    //console.log(cleanProfile);
    const res = await client.mutate({
      mutation: SAVE_USER_PROFILE,
      variables: { input: cleanProfile },
    });
    //console.log(res);
    return res.data?.saveUserProfile;
  } catch (err) {
    console.error("saveUserProfile Error: ", err);
    throw err;
  }
};

export const uploadAvatar = async (file) => {
  const res = await client.mutate({
    mutation: GET_AVATAR_UPLOAD_URL,
    variables: {
      fileType: file.type,
    },
  });

  const { uploadUrl, fileUrl } = res.data.getAvatarUploadUrl;

  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return fileUrl;
};
