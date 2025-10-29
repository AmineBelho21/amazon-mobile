import SearchBar from '@/components/SearchBar';
import VapiOverlay from '@/components/VapiOverlay';
import { VAPI_OVERLAY_ID } from '@/hooks/useVapi';
import { storage } from '@/storage/mmkv';
import { getArticleById } from '@/utils/api';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


const MOCK_RATING = 4.5;
const MOCK_REVIEWS = 1193;
const MOCK_BRAND = 'Expo';
const MOCK_PRIME = true;


const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showOverlay, setShowOverlay] = useState(storage.getBoolean(VAPI_OVERLAY_ID) ?? false)
  const headerHeight = useHeaderHeight();


  const { data, isLoading, isError } = useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticleById(+id),
  });

  const anotherCrash = () => {
    throw new Error('Another error')
  }


  if (isLoading) {
    return (
      <View
        className='flex-1 items-center justify-center'
        style={{ paddingTop: headerHeight || 120 }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  if (isError || !data) {
    return (
      <View
        className='flex-1 items-center justify-center'
        style={{ paddingTop: headerHeight || 120 }}>
        <Text>Failed to load product.</Text>
      </View>
    )
  }

  const onAddToCart = () => { }


  return (
    <View className='flex-1 bg-white' style={{ paddingTop: headerHeight || 100 }}>
      {showOverlay && <VapiOverlay />}
      <Stack.Screen
        options={{
          header: () => <SearchBar withBackButton />
        }} />
      <ScrollView contentContainerClassName='pb-20'>
        <View className='items-center bg-[#f7f7f7] p-4'>
          <Image
            source={{ uri: data.imageUrl }}
            className="w-[220px] h-[220px] rounded-xl"
            resizeMode="cover"
          />
        </View>
        {/* Title & Brand */}
        <Text className="text-[#555] font-semibold text-base mt-2 ml-4">{MOCK_BRAND}</Text>
        <Text className="text-[22px] font-bold mx-4 mt-1">{data.title}</Text>
        {/* Rating & Reviews */}
        <View className="flex-row items-center ml-4 mt-1.5 gap-2">
          <Text className="font-bold">
            {MOCK_RATING} <Ionicons name="star" size={16} className="text-primary" />
          </Text>
          <Text className="text-[#888] text-[15px]">({MOCK_REVIEWS})</Text>
          {MOCK_PRIME && (
            <View className="bg-[#00A8E1] rounded px-1.5 py-0.5 ml-2">
              <Text className="text-white font-bold text-xs">Prime</Text>
            </View>
          )}
        </View>
        {/* Price */}
        <Text className="text-[24px] font-bold text-[#B12704] ml-4 mt-2.5">
          ${data.price?.toFixed(2) ?? 'N/A'}
        </Text>

        {/* Description */}
        <Text className="font-bold text-lg ml-4 mt-4.5 mb-1">Product Description</Text>
        <Text className="text-[15px] text-[#333] mx-4 mb-4">{data.description}</Text>

        {/* View in 3D */}
        <TouchableOpacity className="flex-1 mx-10 rounded-full items-center justify-center py-4 border border-blue-500 ">
          <Text className='text-blue-500 font-bold text-base'>View in 3D</Text>
        </TouchableOpacity>

        {/* Bottom Buttons */}
        <TouchableOpacity
          onPress={onAddToCart}
          className="flex-1 mx-10 bg-[#FFD814] rounded-full items-center justify-center py-4 my-4">
          <Text className="text-[#222] font-bold text-base">Add to Basket</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 mx-10 bg-[#FFA41C] rounded-full items-center justify-center py-4">
          <Text className="text-[#222] font-bold text-base">Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Page