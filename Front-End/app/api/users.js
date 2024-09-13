import Client from "./client";

const register = (userInfo) => Client.post("/users", userInfo);

const login = (email, password) => Client.post("/auth", { email, password });

export default {
  login,
  register,
};
