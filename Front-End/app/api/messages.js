import Client from "./client";

const send = (message, listingId) =>
  Client.post("/auth", { message, listingId });

export default {
  send,
};
