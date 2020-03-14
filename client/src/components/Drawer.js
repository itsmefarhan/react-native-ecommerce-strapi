import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const Drawer = () => {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="md-menu"
      size={25}
      style={{ marginLeft: 18, color: "white" }}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

export default Drawer;
