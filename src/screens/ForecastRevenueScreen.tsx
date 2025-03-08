import React from "react";
import { View, Text, Dimensions } from "react-native";
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

export default function ForecastRevenueScreen() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
      }}
    >
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
        // style={styles.chart}
      />
    </View>
  );
}
