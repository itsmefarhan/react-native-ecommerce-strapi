import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Title, Button } from "react-native-paper";
import { calculatePrice, setCart } from "../components/utils";
import Color from "../components/Color";

const CartScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [data, setData] = useState(cartItems);

  const handleDelete = id => {
    let items = data.filter(item => item._id !== id);
    setData(items);
    setCart(items);
  };
  return (
    <View>
      <Title style={styles.title}>Your Cart Details</Title>
      <FlatList
        keyExtractor={item => item._id}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <Text style={styles.text}>
              {item.name} * {item.quantity}
            </Text>
            <View style={styles.grid}>
              <Text style={styles.text}>
                ${(item.quantity * item.price).toFixed(2)}
              </Text>
              <Feather
                name="delete"
                style={styles.delete}
                onPress={() => handleDelete(item._id)}
              />
            </View>
          </View>
        )}
      />
      {calculatePrice(data) === "0.00" ? (
        <Text style={styles.nullText}>Please add items to your cart</Text>
      ) : (
        <>
          <View style={styles.view}>
            <Text style={styles.total}>Total: </Text>
            <Text style={[styles.total, { marginRight: 40 }]}>
              ${calculatePrice(data)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout", { data })}
          >
            <Button theme={{ colors: { primary: Color.primary } }}>
              Checkout
            </Button>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    marginVertical: 20,
    color: Color.accent
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 18
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 18,
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    lineHeight: 30
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: Color.accent
  },
  delete: {
    fontSize: 20,
    color: "red",
    marginLeft: 10
  },
  nullText: {
    alignSelf: "center",
    fontSize: 18,
    color: "red"
  }
});

export default CartScreen;
