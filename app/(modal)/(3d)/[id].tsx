import { getArticleById } from '@/utils/api';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  DefaultLight,
  FilamentScene,
  FilamentView,
  Model,
  useCameraManipulator,
} from "react-native-filament";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['article', id], 
    queryFn: () => getArticleById(+id)
  });

  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 8],
    targetPosition: [0, 0, 0],
    orbitSpeed: [0.003, 0.003],
  });

  const viewHeight = Dimensions.get('window').height;

  // Pan gesture for rotating the model
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      const yCorrected = viewHeight - event.y;
      cameraManipulator?.grabBegin(event.x, yCorrected, false);
    })
    .onUpdate((event) => {
      const yCorrected = viewHeight - event.y;
      cameraManipulator?.grabUpdate(event.x, yCorrected);
    })
    .onEnd(() => {
      cameraManipulator?.grabEnd();
    })
    .maxPointers(1);

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      cameraManipulator?.zoom(event.x, event.y, event.scale);
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Error loading model</Text>
      </View>
    );
  }

  return (
    <View className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Back button with absolute positioning */}
      <TouchableOpacity 
        className='absolute top-safe left-6 z-10 rounded-full bg-gray-800 p-2 w-12 h-12 items-center justify-center'
        onPress={() => router.dismiss()}
      >
        <Ionicons name='arrow-back' size={24} color={'#fff'} />
      </TouchableOpacity>

      {/* 3D View - needs flex-1 to take full height */}
      {data?.glbUrl && (
        <GestureDetector gesture={composedGesture}>
          <FilamentView className='flex-1'>
            <Camera cameraManipulator={cameraManipulator} />
            <DefaultLight /> 
            <Model source={{ uri: data.glbUrl }} transformToUnitCube />
          </FilamentView>
        </GestureDetector>
      )}
    </View>
  );
}

export default function Scene() {
  return (
    <View className='flex-1'>
      <FilamentScene>
        <Page />
      </FilamentScene>
    </View>
  );
}