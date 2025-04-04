import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../hooks/authHooks";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLargeScreen = width > 600;

  const {
    mutate: loginMutation,
    isPending: isLoading,
    isError,
    error,
  } = useLogin();

  const handleLogin = () => {
    loginMutation(
      { email, password },
      {
        onSuccess: (data) => {
          AsyncStorage.setItem("jwt_token", data.accessToken);
          navigation.navigate("Dashboard");
        },
        onError: (error) => {
          Alert.alert("Login Failed", "Invalid Password.");
        },
      }
    );
  };

  return (
    <View style={[styles.container, { padding: isLargeScreen ? 32 : 16 }]}>
      <Text style={styles.title}>CRM App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {isError && <Text>Error: {error?.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#FF6F00",
  },
  input: {
    height: 50,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#FF6F00",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
