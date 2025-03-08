import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

export default function EditLeadScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  //   const navigation = useNavigation();
  const { lead } = route.params; // Get the lead data from navigation params

  console.log({ lead });
  // State to manage editable fields
  const [name, setName] = useState(lead.name);
  const [phone, setPhone] = useState(lead.phone);

  const [status, setStatus] = useState(lead.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // onStatusChange(newStatus);
  };

  const handleSave = () => {
    // Save logic here (e.g., update the lead in the database or state)
    console.log("Saved:", { name, phone, status });
    navigation.goBack(); // Go back to the detail screen after saving
  };

  const handleCancel = () => {
    navigation.goBack(); // Go back to the detail screen without saving
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>Edit Lead</Text>
        </View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />

        <Picker
          selectedValue={status}
          style={{
            height: 50,
            width: 150,
          }}
          onValueChange={(itemValue: string) => handleStatusChange(itemValue)}
        >
          <Picker.Item label="New" value="New" />
          <Picker.Item label="Contacted" value="Contacted" />
          <Picker.Item label="In-Negotiation" value="In-Negotiation" />
          <Picker.Item label="Sale-Won" value="Sale-Won" />
          <Picker.Item label="Sale-Lost" value="Sale-Lost" />
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: "#FF6F00",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
