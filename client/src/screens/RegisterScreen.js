import React, { useState } from "react";
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
import { REGISTER_USER } from "../gql/Mutations";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useMutation(REGISTER_USER, {
    async update(_, result) {
      await AsyncStorage.setItem(
        "jwt",
        JSON.stringify(result.data.register.jwt)
      );
      navigation.navigate("Home", { screen: "HomeScreen" });
    },
    variables: { input: { username, email, password } }
  });

  const handleSubmit = () => {
    register();
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Title style={styles.title}>Create An Account</Title>
      <TextInput
        theme={{ colors: { primary: Color.primary } }}
        label="Username"
        mode="outlined"
        autoCapitalize='none'
        style={styles.input}
        value={username}
        onChangeText={e => setUsername(e)}
      />
      <TextInput
        theme={{ colors: { primary: Color.primary } }}
        label="Email"
        mode="outlined"
        autoCapitalize='none'
        style={styles.input}
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        theme={{ colors: { primary: Color.primary } }}
        label="Password"
        mode="outlined"
        secureTextEntry
        autoCapitalize='none'
        style={styles.input}
        value={password}
        onChangeText={e => setPassword(e)}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!username || !email || !password}
      >
        Register
      </Button>
      <View style={styles.para}>
        <Text style={{ color: Color.accent }}>Already a user? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: Color.primary }}>Login</Text>
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

export default RegisterScreen;
