import React from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import ReactDOM from "react-dom";
import App from "../App";
import axios from "axios";
import loader from "../assets/images/Preloader_2.gif";
import { GetUserAccessToken } from "../links";

let accessToken: string;
let idToken: string;

export const getIdToken = () => idToken;
export const getAccessToken = () => accessToken;

export const authenticate = () => {
  getAccess();
  return <img className="loader" alt="Loader" src={loader}></img>;
};

const getAccess = async () => {
  await microsoftTeams.initialize(async () => {
    await getClientSideToken()
      .then((clientSideToken: any) => {
        getServerSideToken(clientSideToken)
          .then()
          .catch((error) => {
            // Display in-line button so user can consent
            ReactDOM.render(
              <button id="login" onClick={homeLogin}>
                Sign In
              </button>,
              document.getElementById("root")
            );
          });
      })

      .catch((error) => {
        if (error === "invalid_grant") {
          // Display in-line button so user can consent
          ReactDOM.render(
            <button id="login" onClick={homeLogin}>
              Sign In
            </button>,
            document.getElementById("root")
          );
        } else {
          // Something else went wrong
        }
      });
  });
};

const getClientSideToken = () => {
  return new Promise((resolve, reject) => {
    microsoftTeams.authentication.getAuthToken({
      successCallback: (result) => {
        idToken = result;
        resolve(result);
      },
      failureCallback: function (error) {
        reject("Error getting token: " + error);
      },
    });
  });
};

const getServerSideToken = (clientSideToken: string) => {
  //const store = createStore(rootReducer, applyMiddleware(thunk));
  return new Promise((resolve, reject) => {
    microsoftTeams.getContext(async (context) =>
      axios
        .get(`${GetUserAccessToken}`, {
          headers: {
            "Content-Type": "application/text",
            Authorization: "Bearer " + clientSideToken,
          },
        })
        .then((response: any) => {
          if (response.status === 200) {
            return response.data;
          } else {
            reject(response.error);
          }
        })
        .then((responseJson) => {
          if (IsValidJSONString(responseJson)) {
            if (JSON.parse(responseJson).error)
              reject(JSON.parse(responseJson).error);
          } else if (responseJson) {
            accessToken = responseJson;
            ReactDOM.render(<App />, document.getElementById("root"));
          }
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
};

const IsValidJSONString = (str: any) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const homeLogin = async () => {
  return await getToken().then((data: any) => {
    accessToken = data.accessToken;
    idToken = data.idToken;
    ReactDOM.render(<App />, document.getElementById("root"));
  });
};

const getToken = () => {
  return new Promise((resolve, reject) => {
    microsoftTeams.initialize(async () => {
      await microsoftTeams.authentication.authenticate({
        url: window.location.origin + "/start.html",
        width: 600,
        height: 535,
        successCallback: (result) => {
          resolve(result);
        },
        failureCallback: (reason) => {
          reject(reason);
        },
      });
    });
  });
};
