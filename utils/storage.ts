import AsyncStorage from "@react-native-async-storage/async-storage";

const storeItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("Error storing value:", e);
  }
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log("Error getting value:", e);
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("Error deleting value:", e);
  }
};

export { getItem, storeItem, removeItem };
