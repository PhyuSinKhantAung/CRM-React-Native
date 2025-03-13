import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useUpdateLead } from "../hooks/leadHooks";
import { Lead } from "../apis/leadApi";
import { useQueryClient } from "@tanstack/react-query";

export default function EditLeadScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const lead = route.params.lead as Lead;

  const [name, setName] = useState(lead.name);
  const [phone, setPhone] = useState(lead.phone);
  const [email, setEmail] = useState(lead.email);
  const [address, setAddress] = useState(lead.address);
  const [estimatedRevenue, setEstimatedRevenue] = useState(
    lead.estimatedRevenue
  );
  const [status, setStatus] = useState(lead.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const { mutate: updateLeadData, isPending: isLoading } = useUpdateLead(
    lead.id
  );

  const queryClient = useQueryClient();

  const handleInputChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setEstimatedRevenue(text);
    }
  };

  const handleSave = () => {
    updateLeadData(
      {
        name,
        phone,
        email,
        address,
        estimatedRevenue,
        status,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [lead.id],
          });
          queryClient.invalidateQueries({
            queryKey: ["leads"],
          });
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert("Update Lead Failed", "Something Went Wrong!");
        },
      }
    );
  };

  const handleCancel = () => {
    navigation.goBack();
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
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />

        <TextInput
          style={styles.input}
          placeholder="Estimated Revenue"
          placeholderTextColor="#666"
          value={String(estimatedRevenue)}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={status}
          style={{
            height: 50,
            width: 150,
          }}
          onValueChange={(itemValue: string) => handleStatusChange(itemValue)}
        >
          <Picker.Item label="New" value="NEW" />
          <Picker.Item label="Contacted" value="CONTACTED" />
          <Picker.Item label="In-Negotiation" value="IN_NEGOTIATION" />
          <Picker.Item label="Sale-Won" value="WON" />
          <Picker.Item label="Sale-Lost" value="LOST" />
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
