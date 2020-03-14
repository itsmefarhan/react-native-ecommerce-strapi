import React from "react";
import { View, Text, Button, AsyncStorage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearToken } from "../components/utils";

const HomeScreen = ({ navigation }) => {
  const logout = () => {
    clearToken();
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      <View>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
