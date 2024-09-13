import Client from "./client";

const register = (pushToken) =>
  Client.post("/expoPushTokens", { token: pushToken });

export default {
  register,
};
