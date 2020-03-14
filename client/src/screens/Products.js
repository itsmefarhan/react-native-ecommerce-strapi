import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORY_QUERY } from "../gql/Queries";

const Products = ({ route }) => {
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

  console.log(data);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Products;
