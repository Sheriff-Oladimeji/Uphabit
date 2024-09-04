import { View, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <View className="flex-1 bg-[#111827]">
      <SafeAreaView className="flex-1">
        <View className={`flex-1 ${Platform.OS === 'android' ? 'mt-2' : ''}`}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Container