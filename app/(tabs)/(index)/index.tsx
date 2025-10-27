import { getArticles } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { cssInterop } from "nativewind";
import React from "react";
import { ActivityIndicator, Animated, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";


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

  const { data: articles, isLoading, isError, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  })

  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (event.contentOffset.y > 50) {
        scrollOffset.value = 50 - event.contentOffset.y;
      }
      else {
        scrollOffset.value = 0
      }
    }
  });

  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollOffset.value}]
    }
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
      <Animated.ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerClassName="flex-1 flex-row items-center p-4 gap-6"
        className='absolute top-0 bg-dark h-14 w-full'
        style={scrollStyle}
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
      </Animated.ScrollView>

      <Animated.FlatList 
        scrollEventThrottle={16}
        data={[1]}
        style={{ zIndex: -1 }}
        contentContainerStyle={{ paddingTop: 48}}
        ListHeaderComponent={() => <>
           <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              className="flex-1 mb-10">
              {dummyHeros.map((hero) => (
                <View
                  key={hero.text}
                  style={{
                    width: Dimensions.get('window').width,
                    height: 250,
                    backgroundColor: hero.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text className="text-white text-3xl font-bold text-center">{hero.text}</Text>
                </View>
              ))}
            </ScrollView>
        </> 

        }
        renderItem={() => (
          <View className="mx-4">
            {articles && (
              <FlatList
                data={[...articles]}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                  <Text className="text-2xl font-bold mb-4">Top picks for you</Text>
                )}
                renderItem={({ item }) => (
                  <Link href={`/(tabs)/${item.id}`} asChild style={{ marginBottom: 4 }}>
                    <TouchableOpacity className="flex-row items-center gap-4 flex-wrap">
                      <Image source={{ uri: item.imageUrl }} className="rounded-lg w-28 h-28" />
                      <View className="flex-1">
                        <Text className="text-lg font-bold">{item.title}</Text>
                        <Text className="text-sm text-gray-500">{item.description}</Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                )}
              />
            )}
          </View>
        )}
      />
    </>
 
  );
}
