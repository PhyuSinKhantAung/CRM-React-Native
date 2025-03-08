// import React from "react";
// import { Button, View, Text, FlatList, StyleSheet } from "react-native";
// import LeadItem from "../components/LeadItem";

// const leads = [
//   { id: "1", name: "John Doe", status: "Contacted", phone: "+95988844" },
//   { id: "2", name: "Jane Smith", status: "New", phone: "+0003933" },
// ];

// export default function DashboardScreen({ navigation }: { navigation: any }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sales Pipeline</Text>
//       <FlatList
//         data={leads}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <LeadItem lead={item} />}
//       />

//       <Button
//         title="Add Lead"
//         onPress={() => navigation.navigate("LeadManagement")}
//       />
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
// });

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// // import { useNavigation } from "@react-navigation/native";

// const leads = [
//   { id: "1", name: "John Doe", status: "New", stage: "Lead" },
//   { id: "2", name: "Jane Smith", status: "Contacted", stage: "Proposal Sent" },
//   {
//     id: "3",
//     name: "Alice Johnson",
//     status: "In-Negotiation",
//     stage: "Negotiation",
//   },
//   { id: "4", name: "Bob Brown", status: "Sale-Won", stage: "Closed Won" },
//   { id: "5", name: "Charlie Davis", status: "Sale-Lost", stage: "Closed Lost" },
// ];

// export default function DashboardScreen({ navigation }: { navigation: any }) {
//   // const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sales Pipeline</Text>
//       <FlatList
//         data={leads}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.leadItem}
//             onPress={() => navigation.navigate("LeadDetails", { lead: item })}
//           >
//             <Text style={styles.leadName}>{item.name}</Text>
//             <Text style={styles.leadStatus}>{item.status}</Text>
//             <Text style={styles.leadStage}>{item.stage}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate("LeadManagement")}
//       >
//         <Text style={styles.addButtonText}>Add Lead</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#FFFFFF",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     color: "#FF6F00",
//   },
//   leadItem: {
//     backgroundColor: "#FFF3E0",
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   leadName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   leadStatus: {
//     fontSize: 14,
//     color: "#666",
//   },
//   leadStage: {
//     fontSize: 14,
//     color: "#666",
//   },
//   addButton: {
//     backgroundColor: "#FF6F00",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   addButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // X-axis labels
  datasets: [
    {
      data: [50, 10, 40, 95, 85, 120], // Example data
      color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`, // Line color (orange)
      strokeWidth: 2, // Line thickness
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis and label color
  strokeWidth: 2, // Line thickness
  barPercentage: 0.5,
  propsForDots: {
    r: "4", // Dot radius
    strokeWidth: "2",
    stroke: "#FF6F00", // Dot border color
  },
};

const leads = [
  { id: "1", name: "John Doe", status: "New", phone: "02020202" },
  { id: "2", name: "Jane Smith", status: "Contacted", phone: "38403403" },
  {
    id: "3",
    name: "Alice Johnson",
    status: "In-Negotiation",
    phone: "3903430384030",
  },
  { id: "4", name: "Bob Brown", status: "Sale-Won", phone: "38403403" },
  { id: "5", name: "Charlie Davis", status: "Sale-Lost", phone: "3403403483" },
];

export default function DashboardScreen({ navigation }: { navigation: any }) {
  // const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isLargeScreen = width > 600; // Adjust breakpoint as needed

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 16,
            color: "#FF6F00",
          }}
        >
          Forecast Revenue
        </Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 32} // Use screen width minus padding
          height={220}
          yAxisLabel="$"
          yAxisSuffix="" // Add an empty suffix (or customize as needed)
          chartConfig={chartConfig}
          bezier // Smooth line curve
        />
      </View>

      <Text style={styles.title}>Sales Pipeline</Text>

      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        numColumns={isLargeScreen ? 2 : 1} // Show 2 columns on larger screens
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.leadItem, { width: isLargeScreen ? "48%" : "100%" }]} // Adjust width for large screens
            onPress={() => navigation.navigate("LeadDetails", { lead: item })}
          >
            <Text style={styles.leadName}>{item.name}</Text>
            <Text style={styles.leadStatus}>{item.status}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("LeadManagement")}
      >
        <Text style={styles.addButtonText}>Add Lead</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("ForecastRevenue")}
      >
        <Text style={styles.addButtonText}>View Forecast Revenue</Text>
      </TouchableOpacity> */}
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
  leadItem: {
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 8, // Add margin between items on large screens
  },
  leadName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  leadStatus: {
    fontSize: 14,
    color: "#666",
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#FF6F00",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
