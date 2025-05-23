import { Stack } from "expo-router";
export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 Hides ALL headers by default
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
