import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  AsyncStorage
} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import Color from "../components/Color";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../gql/Mutations";
import { getToken } from "../components/utils";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    getToken().then(data => setToken(data));
  }, []);

  const [login] = useMutation(LOGIN_USER, {
    update: async (_, result) => {
      await AsyncStorage.setItem("jwt", JSON.stringify(result.data.login.jwt));
      navigation.navigate("Home", { screen: "HomeScreen" });
    },
    variables: { input: { identifier: username, password } }
  });

  const handleSubmit = () => {
    login();
    setUsername("");
    setPassword("");
  };

  if (token) {
    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Title style={styles.title}>Log into your account</Title>
      <TextInput
        theme={{ colors: { primary: Color.primary } }}
        label="Username"
        mode="outlined"
        autoCapitalize="none"
        style={styles.input}
        value={username}
        onChangeText={e => setUsername(e)}
      />
      <TextInput
        theme={{ colors: { primary: Color.primary } }}
        label="Password"
        mode="outlined"
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
        value={password}
        onChangeText={e => setPassword(e)}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!username || !password}
      >
        Login
      </Button>
      <View style={styles.para}>
        <Text style={{ color: Color.accent }}>Not a user? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={{ color: Color.primary }}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 18,
    marginTop: "20%"
  },
  title: {
    alignSelf: "center",
    color: Color.accent
  },
  input: {
    marginTop: 10
  },
  button: {
    marginVertical: 10,
    backgroundColor: Color.primary
  },
  para: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default LoginScreen;
