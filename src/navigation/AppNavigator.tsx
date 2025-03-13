import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LeadManagementScreen from "../screens/LeadManagementScreen";
import ForecastRevenueScreen from "../screens/ForecastRevenueScreen";
import LeadDetailsScreen from "../screens/LeadDetailsScreen";
import EditLeadScreen from "../screens/EditLeadScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Lead Management" component={LeadManagementScreen} />

        <Stack.Screen name="Lead Details" component={LeadDetailsScreen} />
        <Stack.Screen name="Edit Lead" component={EditLeadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
