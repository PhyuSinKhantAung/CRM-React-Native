import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useAddLead } from "../hooks/leadHooks";
import { useQueryClient } from "@tanstack/react-query";

export default function LeadManagementScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [estimatedRevenue, setEstimatedRevenue] = useState("");

  const handleInputChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setEstimatedRevenue(text);
    }
  };
  const { mutate: addLead, isPending: isLoading } = useAddLead();

  const queryClient = useQueryClient();

  const handleSave = () => {
    const data = {
      name,
      email,
      phone,
      address,
      estimatedRevenue,
    };

    addLead(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["leads"],
        });
        navigation.navigate("Dashboard");
      },
      onError: (error) => {
        Alert.alert("Add Lead Failed", "Something Went Wrong!");
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Lead</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#666"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#666"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Estimated Revenue"
        placeholderTextColor="#666"
        value={estimatedRevenue}
        onChangeText={handleInputChange}
        keyboardType="numeric" // Ensure the keyboard is numeric
      />
      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
