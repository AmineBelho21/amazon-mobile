import { VAPI_OVERLAY_ID } from '@/hooks/useVapi'
import { storage } from '@/storage/mmkv'
import React from 'react'
import { Button, Text } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const VapiOverlay = () => {
  const handleClose = () => {
    storage.set(VAPI_OVERLAY_ID, false)
  }

  return (
    <Animated.View 
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(400)}
      className="bg-white absolute top-0 left-0 w-full h-full z-20 justify-center items-center"
    >
      <Text>VapiOverlay</Text>
      <Button title="Close" onPress={handleClose} />
    </Animated.View>
  )
}

export default VapiOverlay
