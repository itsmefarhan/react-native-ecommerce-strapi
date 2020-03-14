import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";

import Color from "./src/components/Color";
import Register from "./src/screens/RegisterScreen";
import Login from "./src/screens/LoginScreen";
import Logout from "./src/screens/Logout";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import Products from './src/screens/Products'

const client = new ApolloClient({
  uri: "http://192.168.0.103:1337/graphql",
  request: async operation => {
    const token = await AsyncStorage.getItem("jwt");
    operation.setContext({
      headers: {
        "Authorization": token ? `Bearer ${JSON.parse(token)}` : ""
      }
    });
  }
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();

function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="md-home" size={25} />
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <Ionicons name="md-home" size={25} />
        }}
      />
    </Tab.Navigator>
  );
}

function DrawNav() {
  return (
    <Draw.Navigator>
      <Draw.Screen name="Register" component={Register} />
      <Draw.Screen name="Login" component={Login} />
      <Draw.Screen name="Logout" component={Logout} />
    </Draw.Navigator>
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
          <Stack.Screen
            name="Auth"
            component={DrawNav}
            options={{
              headerTitle: null
            }}
          />
          <Stack.Screen
            name="Home"
            component={TabNav}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Products" component={Products} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
