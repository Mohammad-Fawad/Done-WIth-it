import { create } from "apisauce";
import cache from "../utility/cache";
import storage from "../auth/storage";
import settings from "../config/settings";

const Client = create({
  baseURL: settings.baseURL,
});

Client.addAsyncRequestTransform(async (request) => {
  const authToken = await storage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = Client.get;
Client.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default Client;
