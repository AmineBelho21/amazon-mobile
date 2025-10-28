import VapiOverlay from '@/components/VapiOverlay'
import { VAPI_OVERLAY_ID } from '@/hooks/useVapi'
import React from 'react'
import { Text, View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv'

const Page = () => {
  const [showOverlay, setShowOverlay] = useMMKVBoolean(VAPI_OVERLAY_ID)
  
  return (
    <>
      {showOverlay && <VapiOverlay/>}
      <View>
      <Text>cart</Text>
    </View>
    </>

  )
}

export default Page