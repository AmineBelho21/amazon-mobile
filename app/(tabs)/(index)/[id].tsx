import SearchBar from '@/components/SearchBar';
import VapiOverlay from '@/components/VapiOverlay';
import { VAPI_OVERLAY_ID } from '@/hooks/useVapi';
import { storage } from '@/storage/mmkv';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

const Page = () => {
    const {id} = useLocalSearchParams<{ id: string}>();
  const [showOverlay, setShowOverlay] = useState(storage.getBoolean(VAPI_OVERLAY_ID) ?? false)
  const headerHeight = useHeaderHeight();


  return (
    <View className='flex-1 bg-white' style={{paddingTop: headerHeight || 100}}>
      {showOverlay && <VapiOverlay />}
      <Stack.Screen 
        options={{
          header: () => <SearchBar withBackButton />
        }} />
      <Text>{id}</Text>
    </View>
  )
}

export default Page