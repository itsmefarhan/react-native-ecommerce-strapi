import React from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../gql/Queries";
import CategoryItem from "../components/CategoryItem";
import Header from "../components/Header";

const HomeScreen = () => {
  const { loading, data } = useQuery(CATEGORIES_QUERY);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  const { categories } = data;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Shopping Arena" />
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={item => item._id}
        numColumns={2}
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
