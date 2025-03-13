import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </PaperProvider>
  );
}
