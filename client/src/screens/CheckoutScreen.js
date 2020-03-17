import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Title, Button, TextInput } from "react-native-paper";
import Stripe from "react-native-stripe-api";
import {
  calculatePrice,
  clearCart,
  calculateAmount
} from "../components/utils";
import Color from "../components/Color";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ORDER } from "../gql/Mutations";
import config from '../../../myconfig'

const CheckoutScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  // const [token, setToken] = useState();

  const amount = calculateAmount(data);

  const [order] = useMutation(CREATE_ORDER, {
    update: (_, result) => {
      clearCart();
      // const client = new Stripe(config.PUBLIC_KEY);
      // const token = await client.createToken({
      //   number: "4242424242424242",
      //   exp_month: "09",
      //   exp_year: "21",
      //   cvc: "111"
      // });
      // setToken(token);
      navigation.navigate("Home");
    },
    variables: {
      input: {
        data: {
          address,
          amount,
          products: data,
          postalCode: postal,
          city
          // token
        }
      }
    }
  });

  const handleSubmit = () => {
    order();
    setAddress("");
    setPostal("");
    setCity("");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Checkout</Title>
      <View style={styles.view}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.total}>${calculatePrice(data)}</Text>
      </View>

      <TextInput
        style={styles.input}
        theme={{ colors: { primary: Color.primary } }}
        label="Shipping Address"
        autoCorrect={false}
        value={address}
        mode="outlined"
        onChangeText={e => setAddress(e)}
      />
      <TextInput
        style={styles.input}
        theme={{ colors: { primary: Color.primary } }}
        label="Postal Code"
        autoCorrect={false}
        value={postal}
        mode="outlined"
        onChangeText={e => setPostal(e)}
      />
      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        theme={{ colors: { primary: Color.primary } }}
        label="City"
        autoCorrect={false}
        value={city}
        mode="outlined"
        onChangeText={e => setCity(e)}
      />

      <TouchableOpacity onPress={() => {}}>
        <Button
          icon="currency-usd"
          theme={{ colors: { primary: Color.primary } }}
          onPress={handleSubmit}
        >
          Pay now
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18
  },
  title: {
    alignSelf: "center",
    marginVertical: 20,
    color: Color.accent
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: Color.accent
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderRadius: 10
  }
});

export default CheckoutScreen;
