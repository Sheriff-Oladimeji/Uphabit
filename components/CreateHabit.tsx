import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from './BottomSheet'
import { BottomSheetProps } from '@/@types/bottomSheet'

const CreateHabit = ({isVisible, onClose}: BottomSheetProps) => {

  return (
      <BottomSheet onClose={onClose} isVisible={isVisible} height="100%">
          <View>
              <Text className='text-white font-bold text-xl'>Create Habit</Text>
          </View>
  </BottomSheet>
  )
}

export default CreateHabit