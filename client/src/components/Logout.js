import React from "react";
import { View, Text } from "react-native";
import { clearToken } from "./utils";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const navigation = useNavigation();
  clearToken();
  navigation.replace("Login");
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Logout;
