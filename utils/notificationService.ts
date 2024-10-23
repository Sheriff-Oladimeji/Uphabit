import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { Habit } from "@/@types/habitTypes";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    // Get the token with the project ID
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId ?? undefined,
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function scheduleNotification(habit: Habit) {
  const trigger = new Date(habit.reminderTime);
  trigger.setSeconds(0);
  trigger.setMilliseconds(0);

  // Schedule the initial reminder
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Habit Reminder",
      body: `Time to work on your habit: ${habit.name}. You're almost there!`,
      sound: "default", // Ensure sound is set
    },
    trigger,
  });
}

export async function sendCompletionNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Good Job!",
      body: "You've achieved all your goals for the day!",
      sound: "default", // Ensure sound is set
    },
    trigger: null, // Send immediately
  });
}

export async function cancelNotification(habitId: string) {
  await Notifications.cancelScheduledNotificationAsync(habitId);
}

export async function scheduleHabitNotification(habit: Habit) {
  const notificationTime = habit.reminderTime || getDefaultReminderTime();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Time to ${habit.name}!`,
      body: `Don't forget to complete your habit: ${habit.name}`,
      sound: 'default', // This will play the default notification sound
    },
    trigger: {
      hour: notificationTime.getHours(),
      minute: notificationTime.getMinutes(),
      repeats: true, // Repeat daily
    },
  });
}

const getDefaultReminderTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60000); // 10 minutes from now
};
