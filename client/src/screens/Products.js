import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
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

  navigation.setOptions({
    headerTitle: data.category.name
  });

  const { products } = data.category;

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
