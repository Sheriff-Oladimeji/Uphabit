import { View, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const padding = Platform.OS === "android"? insets.top: 0
  
  return (
    <SafeAreaView className="flex-1 bg-[#111827]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={{ paddingTop: padding }}>{children}</View>
    </SafeAreaView>
  );
}

export default Container