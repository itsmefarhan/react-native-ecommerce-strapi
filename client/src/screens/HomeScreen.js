import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearToken } from "../components/utils";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../components/Color";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../gql/Queries";
import CategoryItem from "../components/CategoryItem";

const HomeScreen = ({ navigation }) => {
  const { loading, data } = useQuery(CATEGORIES_QUERY);
  const logout = () => {
    clearToken();
    navigation.navigate("Login");
  };

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
      <View style={styles.header}>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <FontAwesome name="sign-out" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
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
  },
  header: {
    backgroundColor: Colors.primary,
    height: 60,
    justifyContent: "center"
  },
  logout: {
    right: 18,
    position: "absolute"
  }
});

export default HomeScreen;
