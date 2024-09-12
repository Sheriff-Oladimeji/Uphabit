import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity, Text } from "react-native";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utils/notificationService';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="createHabit"
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: "#050a15",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitle: "New Habit",
            headerTitleAlign: "center",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="habit" options={{headerShown: false}}/>
      </Stack>
    </GestureHandlerRootView>
  );
}
