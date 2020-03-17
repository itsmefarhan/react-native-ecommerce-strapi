import { AsyncStorage } from "react-native";

export const getToken = async () => {
  if (await AsyncStorage.getItem("jwt")) {
    return await AsyncStorage.getItem("jwt");
  }
  return null;
};

export const clearToken = async () => await AsyncStorage.removeItem("jwt");

export const setCart = async value => {
  if (AsyncStorage) {
    await AsyncStorage.setItem("cart", JSON.stringify(value));
  }
};

export const getCart = async () => {
  if (AsyncStorage && (await AsyncStorage.getItem("cart"))) {
    return await AsyncStorage.getItem("cart");
  }
  return [];
};

export const clearCart = async () => {
  return await AsyncStorage.removeItem("cart");
};

export const calculatePrice = items => {
  return `${items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)}`;
};

export const calculateAmount = items => {
  return Number(
    items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
  );
};

export const API_URL = "http://192.168.0.104:1337";
