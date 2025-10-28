import { VAPI_OVERLAY_ID } from '@/hooks/useVapi'
import { storage } from '@/storage/mmkv'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'

interface SearchBarProps {
  withBackButton?: boolean 
}

const Page = ({ withBackButton = false }: SearchBarProps) => {
  const router = useRouter()
  const [showOverlay, setShowOverlay] = useState(storage.getBoolean(VAPI_OVERLAY_ID) ?? false)

  const handleMicPress = () => {
    storage.set(VAPI_OVERLAY_ID, true)
    setShowOverlay(true)
  }

  const onBackPress = () => {
    if (showOverlay) {
      storage.set(VAPI_OVERLAY_ID, false)
      setShowOverlay(false)
    } else {
      router.back()
    }
  }

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

  return (
    <View className="flex-1 flex-row items-center bg-dark min-h-36 pt-safe px-3">
      {(withBackButton || showOverlay) && (
        <AnimatedTouchableOpacity onPress={onBackPress} entering={FadeInLeft} exiting={FadeOutLeft}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </AnimatedTouchableOpacity>
      )}
      <View className="flex-row items-center flex-1 bg-white rounded-md px-3 py-3 mx-3 gap-4">
        <Ionicons name="search" size={22} className="text-gray-500" />
        <TextInput
          className="flex-1 text-black"
          placeholder="Search or ask a question"
          placeholderTextColor="#888"
          returnKeyType="search"
        />
        <Pressable>
          <Ionicons name="camera-outline" size={22} className="text-gray-500" />
        </Pressable>

        <Pressable onPress={handleMicPress}>
          <Ionicons name="mic-outline" size={22} className="text-gray-500" />
        </Pressable>
      </View>
    </View>
  )
}

export default Page