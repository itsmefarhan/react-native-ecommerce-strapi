import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORY_QUERY } from "../gql/Queries";
import ProductItem from "../components/ProductItem";

const Products = ({ route, navigation }) => {
  const { _id } = route.params;
  console.log(_id);

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

  return (
    <FlatList
      keyExtractor={item => item._id}
      data={products}
      renderItem={({ item }) => <ProductItem item={item} />}
    />
  );
};

export default Products;
