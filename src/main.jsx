import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure({
  ...awsconfig,
  Auth: {
    Cognito: {
      userPoolId: awsconfig.aws_user_pools_id,
      userPoolClientId: awsconfig.aws_user_pools_web_client_id,
      loginWith: {
        username: true,
      },
    },
  },
});


import { Buffer } from "buffer";

window.global = window;
window.Buffer = Buffer;

// import { Amplify } from "aws-amplify";
// import awsconfig from "./services/awsConfig";

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client/link/http";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";



const link = new HttpLink({
  uri: import.meta.env.VITE_APPSYNC_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
  },
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

//Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
