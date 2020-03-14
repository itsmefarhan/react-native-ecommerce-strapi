import React, { useState, useContext, useEffect } from "react";
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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();

  // useEffect(()=>{
  //   const token = async ()=>{
  //     await AsyncStorage.removeItem('jwt')
  //   }
  //   token()
  // },[])

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
        value={username}
        onChangeText={e => setUsername(e)}
        style={styles.input}
      />
      <TextInput
        theme={{ colors: { primary: Color.primary } }}
        label="Password"
        secureTextEntry
        mode="outlined"
        value={password}
        onChangeText={e => setPassword(e)}
        style={styles.input}
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
        <TouchableOpacity
          onPress={() => navigation.replace("Auth", { screen: "Register" })}
        >
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
