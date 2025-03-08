// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// export default function LeadItem({ route }: { route: any }) {
//   const { lead } = route.params; // Access the lead data passed via navigation

//   const [status, setStatus] = useState(lead.status);

//   const handleStatusChange = (newStatus: string) => {
//     setStatus(newStatus);
//     // onStatusChange(newStatus);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "New":
//         return "#FFA500"; // Orange
//       case "Contacted":
//         return "#00FF00"; // Green
//       case "Qualified":
//         return "#0000FF"; // Blue
//       case "Lost":
//         return "#FF0000"; // Red
//       default:
//         return "#ccc"; // Default gray
//     }
//   };

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.name}>{lead.name}</Text>
//         <View
//           style={[
//             styles.statusBullet,
//             { backgroundColor: getStatusColor(status) },
//           ]}
//         />
//       </View>
//       <Text>Phone: {lead.phone}</Text>
//       <View style={styles.statusContainer}>
//         <Text>Status: </Text>
//         <Picker
//           selectedValue={status}
//           style={styles.picker}
//           // onValueChange={(itemValue: string) => handleStatusChange(itemValue)}
//         >
//           <Picker.Item label="New" value="New" />
//           <Picker.Item label="Contacted" value="Contacted" />
//           <Picker.Item label="Qualified" value="Qualified" />
//           <Picker.Item label="Lost" value="Lost" />
//         </Picker>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 16,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   statusBullet: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//   },
//   statusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   picker: {
//     height: 50,
//     width: 150,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/MaterialIcons"; // Install this package if not already installed

export default function LeadDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  // const navigation = useNavigation();
  const { lead } = route.params; // Get the lead data from navigation params

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{lead.name}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditLead", { lead })}
          >
            <Text
              style={{
                color: "#FF6F00",
                fontWeight: "bold",
              }}
            >
              Edit
            </Text>

            {/* <Icon name="edit" size={24} color="#007BFF" /> */}
          </TouchableOpacity>
        </View>
        <Text>Phone: {lead.phone}</Text>
        <Text>Status: {lead.status}</Text>
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
});
