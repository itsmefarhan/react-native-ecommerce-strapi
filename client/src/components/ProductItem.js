import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Color from "../components/Color";
import { API_URL } from "../components/utils";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  const { _id, name, image, description, price } = item;
  return (
    <View style={styles.container}>
      <Image source={{ uri: `${API_URL}${image.url}` }} style={styles.image} />
      <Text style={[styles.shared, { fontSize: 18 }]}>{name}</Text>
      <Text style={[styles.shared, { paddingBottom: 10 }]}>{description}</Text>
      <View style={styles.cart}>
        <Text style={[styles.shared, { color: "red", fontWeight: "bold" }]}>
          ${price}
        </Text>
        <Button icon="cart" theme={{ colors: { primary: Color.primary } }}>
          Add To Cart
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
    backgroundColor: "white"
  },
  image: {
    width: "100%",
    height: 200,
    alignSelf: "center"
  },
  shared: {
    alignSelf: "center",
    margin: 5,
    fontSize: 16
  },
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  }
});

export default ProductItem;
