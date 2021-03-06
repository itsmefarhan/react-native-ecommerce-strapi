import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORY_QUERY } from "../gql/Queries";
import ProductItem from "../components/ProductItem";
import Color from "../components/Color";
import { getCart, clearCart, setCart } from "../components/utils";

const Products = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [newData, setNewData] = useState();

  // Get cart on component mount
  useEffect(() => {
    const sub = navigation.addListener("focus", () => {
      getCart()
        .then(data => setCartItems(JSON.parse(data)))
        .catch(e => console.log(e));
    });
    return sub;
  }, [navigation]);

  // Add to cart
  const addToCart = product => {
    const index = cartItems.findIndex(item => item._id == product._id);
    // if item is not already in cart
    if (index === -1) {
      cartItems.push({
        ...product,
        quantity: 1
      });
      const updateCart = [...cartItems];
      setCartItems(updateCart);
      setCart(updateCart);
    } else {
      // if item already in cart
      cartItems[index].quantity += 1;
      const updateCart = [...cartItems];
      setCartItems(updateCart);
      setCart(updateCart);
    }
  };

  const { _id } = route.params;

  const { loading, data } = useQuery(CATEGORY_QUERY, {
    variables: { id: _id }
  });

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  const { products } = data.category;

  navigation.setOptions({
    headerTitle: data.category.name,
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 18 }}
        onPress={() => navigation.navigate("Cart", { cartItems })}
      >
        <FontAwesome name="shopping-cart" size={25} color="white" />
      </TouchableOpacity>
    )
  });

  // Filter products based on search input
  const filteredProducts = text => {
    const data = products.filter(
      product =>
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.description.toLowerCase().includes(text.toLowerCase())
    );
    setNewData(data);
  };

  return (
    <>
      <TextInput
        style={styles.input}
        label="Search"
        mode="outlined"
        theme={{ colors: { primary: Color.primary } }}
        onChangeText={text => filteredProducts(text)}
      />
      <FlatList
        keyExtractor={item => item._id}
        data={newData && newData.length !== 0 ? newData : products}
        renderItem={({ item }) => (
          <ProductItem item={item} addToCart={addToCart} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 20,
    marginHorizontal: 18
  }
});

export default Products;
