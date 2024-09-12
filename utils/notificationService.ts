import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Habit } from '@/store/useHabitStore';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    // Get the token with the project ID
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId ?? undefined,
    })).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function scheduleNotification(habit: Habit) {
  const trigger = new Date(habit.reminderTime);
  trigger.setSeconds(0);
  trigger.setMilliseconds(0);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Habit Reminder',
      body: `Time to work on your habit: ${habit.name}`,
    },
    trigger,
  });
}

export async function cancelNotification(habitId: string) {
  await Notifications.cancelScheduledNotificationAsync(habitId);
}