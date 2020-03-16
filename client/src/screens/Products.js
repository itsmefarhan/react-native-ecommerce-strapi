import React, { useState } from "react";
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

const Products = ({ route, navigation }) => {
  const [newData, setNewData] = useState();

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
      <TouchableOpacity style={{ marginRight: 18 }} onPress={() => {}}>
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
        renderItem={({ item }) => <ProductItem item={item} />}
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
