import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useGetLeads } from "../hooks/leadHooks";
import { Lead } from "../apis/leadApi";

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;

  const { data: leads, isLoading, isError, error } = useGetLeads();
  const [leadsData, setLeadsData] = useState<Lead[]>([]);

  useEffect(() => {
    if (leads) {
      setLeadsData(leads.data);
    }
  }, [leads]);

  const processLeadsForChart = () => {
    const statusMap: Record<string, number> = {};

    const statusShortForm: Record<string, string> = {
      NEQ: "NEW",
      CONTACTED: "CONTACT",
      IN_NEGOTIATION: "IN-NEGO",
      WON: "WON",
      LOST: "LOST",
    };

    leadsData.forEach((lead) => {
      if (lead.status && lead.forecastedRevenue) {
        const shortLabel = statusShortForm[lead.status] || lead.status;
        statusMap[shortLabel] =
          (statusMap[shortLabel] || 0) + +lead.forecastedRevenue;
      }
    });

    return {
      labels: Object.keys(statusMap),
      datasets: [
        {
          data: Object.values(statusMap),
          color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text style={styles.errorText}>
        Something went wrong, please try again.
      </Text>
    ); // Show error message
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.forecastText}>
          Leads' Forecast Revenue by Status
        </Text>
        <BarChart
          data={processLeadsForChart()}
          width={Dimensions.get("window").width - 32}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
          }}
        />
      </View>

      <Text style={styles.title}>Sales Pipeline</Text>

      {leadsData.length === 0 ? (
        <Text style={styles.noLeadsText}>No Leads Found</Text>
      ) : (
        <FlatList
          data={leadsData}
          keyExtractor={(item) => item.id}
          numColumns={isLargeScreen ? 2 : 1}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.leadItem,
                { width: isLargeScreen ? "48%" : "100%" },
              ]}
              onPress={() =>
                navigation.navigate("Lead Details", { lead: item })
              }
            >
              <Text style={styles.leadName}>{item.name}</Text>
              <Text style={styles.leadStatus}>{item.status}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Lead Management")}
      >
        <Text style={styles.addButtonText}>Add Lead</Text>
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
  forecastText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF6F00",
  },
  leadItem: {
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 8,
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#FF6F00",
  },
  noLeadsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#FF6F00",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "red",
  },
});
