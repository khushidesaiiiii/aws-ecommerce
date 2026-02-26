import { generateClient } from "aws-amplify/api";
import {
  sendAdminMessage,
  sendUserMessage,
} from "../amplify-graphql/mutations";
import { getAllChats, getChat } from "../amplify-graphql/queries";
import { onMessageReceived } from "../amplify-graphql/subscriptions";
import { GetUserProfile } from "../redux/profileSlice";

const getClient = () => generateClient();

export const SendUserMessage = async (message) => {
  try {
    const client = getClient();
    const res = await client.graphql({
      query: sendUserMessage,
      variables: { message },
    });
    return res.data?.sendUserMessage;
  } catch (err) {
    console.error(err);
  }
};

export const SendAdminMessage = async (userId, message) => {
  try {
    const client = getClient();
    const res = await client.graphql({
      query: sendAdminMessage,
      variables: { userId, message },
    });
    return res.data?.sendAdminMessage;
  } catch (err) {
    console.error(err);
  }
};

export const fetchChat = async (userId) => {
  try {
    const client = getClient();
    //console.log(userId);
    const res = await client.graphql({
      query: getChat,
      variables: { userId },
    });
    //console.log(res);
    return res.data?.getChat;
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllChats = async () => {
  const client = getClient();
  const res = await client.graphql({
    query: getAllChats,
  });
  //console.log(res);
  return res.data?.getAllChats;
};

export const subscribeChat = (callback) => {
  const client = getClient();
  const sub = client
    .graphql({
      query: onMessageReceived,
    })
    .subscribe({
      next: ({ data }) => callback(data.onMessageReceived),
      error: (errr) => console.error("Chat Subscribe Error: ", errr),
    });
  return sub;
};
