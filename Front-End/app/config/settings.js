import Constants from "expo-constants";

const settings = {
  dev: {
    baseURL: "http://192.168.18.5:9000/api",
  },
  staging: {
    baseURL: "http://192.168.18.5:9000/api",
  },
  prod: {
    baseURL: "http://192.168.18.5:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest2.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
