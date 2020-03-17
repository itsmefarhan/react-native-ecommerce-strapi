import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../components/Color";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      {title ? (
        <Text style={{ alignSelf: "center", fontSize: 19, color: "white" }}>
          {title}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primary,
    height: 60,
    justifyContent: "center"
  }
});

export default Header;
