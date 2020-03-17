import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";

import Register from "./src/screens/RegisterScreen";
import Login from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Products from "./src/screens/Products";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";

import { API_URL } from "./src/components/utils";
import Color from "./src/components/Color";
import Logout from "./src/components/Logout";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  request: async operation => {
    const token = await AsyncStorage.getItem("jwt");
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${JSON.parse(token)}` : ""
      }
    });
  }
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.primary,
        inactiveTintColor: Color.accent
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Logout"
        children={Logout}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-log-out" size={25} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Color.primary },
            headerTintColor: "white"
          }}
        >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={TabNav}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
