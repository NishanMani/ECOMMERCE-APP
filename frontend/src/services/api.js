import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const getBaseURL = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = hostUri.split(":")[0];
    return `http://${host}:3000/api`;
  }
  
  if (Platform.OS === "android") return "http://10.0.2.2:3000/api";

  return "http://localhost:3000/api";
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
});

export default API;
