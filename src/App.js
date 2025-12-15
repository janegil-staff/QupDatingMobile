import { StatusBar } from "react-native";
import AppNavigator from "./components/AppNavigator";
import { ToastProvider } from "./components/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <AppNavigator />
    </ToastProvider>
  );
}
