import { getArticles } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { cssInterop } from "nativewind";
import React from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";


cssInterop(Ionicons, {
  className: {
    target: false, 
    nativeStyleToProp: {
      color: true
    }
  }
}
)

const dummyHeros = [
  {
    text: 'Home when you are away',
    color: '#0000ff',
  },
  {
    text: 'New tech, new possibilities',
    color: '#00ff00',
  },
];

export default function Index() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  })

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large'>
          <Text>Loading articles ...</Text>
        </ActivityIndicator>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large'>
          <Text>Error loading articles: {error instanceof Error ? error.message : 'Unknown '}</Text>
        </ActivityIndicator>
      </View>
    )
  }


  return (
    <>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerClassName="flex-1 flex-row items-center p-4 gap-6"
        className='absolute top-0 bg-dark h-14 w-full'
        >
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={20} className="text-white" />
          <Text className="text-white text-lg font-bold">dddxz</Text>
        </View>
        {['Alexa Lists', 'Prime', 'Video', 'Music'].map(item => (
          <TouchableOpacity key={item}>
            <Text className="text-white text-md font-semibold">
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>

  );
}
