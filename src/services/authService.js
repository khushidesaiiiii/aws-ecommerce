import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { userPool } from "./cognitoConfig";

// import { signOut } from "aws-amplify/auth";
// import { signIn } from "aws-amplify/auth";

export const signup = (email, password) => {
  return new Promise((res, rej) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        //debugger;
        rej(err);
        return;
      }
      res(result);
    });
  });
};

export const signin = (email, password) => {
  return new Promise((res, rej) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        // await signOut();

        // await signIn({
        //   username: email,
        //   password,
        // });
        res({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        rej(err);
      },
    });
  });
};

export const confirmSignup = (email, code) => {
  return new Promise((res, rej) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        rej(err.message);
        return;
      }
      res(result);
    });
  });
};

export const resendConfirmationCode = (email) => {
  return new Promise((res, rej) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.resendConfirmationCode((err, result) => {
      if (err) {
        rej(err.message);
        return;
      }
      res(result);
    });
  });
};

export const refreshSession = (email, refreshToken) => {
  return new Promise((res, rej) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const refreshTokenObj = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    user.refreshSession(refreshTokenObj, (err, session) => {
      if (err) {
        rej(err);
        return;
      }
      res({
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      });
    });
  });
};
