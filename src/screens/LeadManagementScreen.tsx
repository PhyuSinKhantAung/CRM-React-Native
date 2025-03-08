// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet, Text } from "react-native";

// export default function LeadManagementScreen() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("");

//   const handleSave = () => {
//     // Add your save logic here
//     console.log("Lead saved:", { name, email, status });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add/Edit Lead</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Status"
//         value={status}
//         onChangeText={setStatus}
//       />
//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LeadManagementScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    // Save logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add/Edit Lead</Text>
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
        placeholder="Status"
        placeholderTextColor="#666"
        value={status}
        onChangeText={setStatus}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
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
