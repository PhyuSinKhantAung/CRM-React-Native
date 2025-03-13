import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGetLeadById } from "../hooks/leadHooks";
import { Lead } from "../apis/leadApi";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function LeadDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [lead, setLead] = useState<Lead>(route.params.lead as Lead);

  const { data: leadData, isLoading, isError, error } = useGetLeadById(lead.id);

  useEffect(() => {
    if (leadData) {
      setLead(leadData);
    }
  }, [leadData]);

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text style={styles.errorText}>
        Something went wrong, please try again.
      </Text>
    );
  }

  function calculateForecastedRevenue(
    estimatedRevenue: number,
    leadStatus: string
  ): number {
    const probabilityMap: Record<string, number> = {
      NEW: 0.1,
      CONTACTED: 0.35,
      IN_NEGOTIATION: 0.75,
      WON: 1.0,
      LOST: 0.0,
    };
    return Math.round(estimatedRevenue * (probabilityMap[leadStatus] || 0));
  }

  const statuses = ["NEW", "CONTACT", "IN-NEGO", "WON", "LOST"];
  const forecastedRevenues = statuses.map((status) =>
    calculateForecastedRevenue(+lead.estimatedRevenue, status)
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{lead.name}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit Lead", { lead })}
          >
            <Text
              style={{
                color: "#FF6F00",
                fontWeight: "bold",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>Phone: {lead.phone}</Text>
        <Text style={styles.infoText}>Email: {lead.email}</Text>
        <Text style={styles.infoText}>Address: {lead.address}</Text>
        <Text style={styles.infoText}>
          Estimated Revenue: {lead.estimatedRevenue} USD
        </Text>
        <Text style={styles.infoText}>
          Forecast Revenue: {lead.forecastedRevenue || 0} USD
        </Text>
        <Text style={styles.infoText}>
          Actual Revenue: {lead.actualRevenue || 0} USD
        </Text>
        <Text style={styles.infoText}>
          Status: {lead.status?.toLocaleLowerCase()}
        </Text>
      </View>

      <Text style={styles.chartTitle}>Future Forecast Revenue</Text>
      <LineChart
        data={{
          labels: statuses,
          datasets: [{ data: forecastedRevenues }],
        }}
        width={Dimensions.get("window").width - 32}
        height={300}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 8 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#FF6F00" },
        }}
        bezier
        style={styles.chart}
      />
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
  infoText: {
    marginBottom: 8,
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
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  chart: { marginVertical: 24, borderRadius: 8 },
});
