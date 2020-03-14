import React, { useReducer, createContext } from "react";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null
};

const getToken = async () => {
  if (await AsyncStorage.getItem("jwt")) {
    const decodedToken = await jwtDecode(AsyncStorage.getItem("jwt"));

    if (decodedToken.exp * 1000 < Date.now()) {
      await AsyncStorage.removeItem("jwt");
    } else {
      initialState.user = decodedToken;
    }
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async userData => {
    await AsyncStorage.setItem("jwt", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = async () => {
    await AsyncStorage.removeItem("jwt");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider