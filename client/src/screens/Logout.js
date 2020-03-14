import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { clearToken, getToken } from "../components/utils";

const Logout = ({ navigation }) => {
  useEffect(() => {
    clearToken();
    navigation.navigate('Login')
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Logout;
