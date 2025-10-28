import { VAPI_OVERLAY_ID } from '@/hooks/useVapi'
import { storage } from '@/storage/mmkv'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'

const Page = () => {
  const router = useRouter()
  const [showOverlay, setShowOverlay] = useState(storage.getBoolean(VAPI_OVERLAY_ID) ?? false)

  const handleMicPress = () => {
    const newValue = true
    setShowOverlay(newValue)
    storage.set(VAPI_OVERLAY_ID, newValue)
  }

  return (
    <View className="flex-1 flex-row items-center bg-dark min-h-36 pt-safe px-3">
      <View className="flex-row items-center flex-1 bg-white rounded-md px-3 py-3 mx-3 gap-4">
        <Ionicons name='search' size={22} color="#6B7280" />
        <TextInput 
          className='flex-1 text-black'
          placeholder='Search or ask a question'
          placeholderTextColor="#888"
          returnKeyType='search'
        />

        <Pressable>
          <Ionicons name='camera-outline' size={22} color="#6B7280" />
        </Pressable>

        <Pressable onPress={handleMicPress}>
          <Ionicons name='mic-outline' size={22} color="#6B7280" />
        </Pressable>
      </View>
    </View>
  )
}

export default Page
