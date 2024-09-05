import { View, SafeAreaView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Container = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const padding = Platform.OS === "android" ? insets.top : 0
  
  return (
    <SafeAreaView className="flex-1 bg-darkBg">
      <StatusBar style="light" />
      <ScrollView style={{ paddingTop: padding }} className='w-[90%] mx-auto'>{children}</ScrollView>
    </SafeAreaView>
  );
}

export default Container