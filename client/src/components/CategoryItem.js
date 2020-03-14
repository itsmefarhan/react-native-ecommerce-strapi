import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ item }) => {
  const navigation = useNavigation();

  const { _id, name, image } = item;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Products", { _id })}
    >
      <Image
        source={{ uri: `http://192.168.0.103:1337${image.url}` }}
        style={styles.image}
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  image: {
    width: 180,
    height: 200
  },
  text: {
    fontSize: 18,
    alignSelf: "center"
  }
});

export default CategoryItem;
