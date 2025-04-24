import { Redirect } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import "../styles/globals.css";

export default function Index() {
  return <Redirect href="/home" />;
}
