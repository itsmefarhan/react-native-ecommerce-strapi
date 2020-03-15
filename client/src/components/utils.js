import { AsyncStorage } from "react-native";

export const getToken = async () => {
  if (await AsyncStorage.getItem("jwt")) {
    return await JSON.parse(AsyncStorage.getItem("jwt"));
  }
  return null;
};

export const clearToken = async () => await AsyncStorage.removeItem("jwt");

export const API_URL = 'http://192.168.0.104:1337'