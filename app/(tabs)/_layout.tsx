import { StyledTabs } from '@/components/navigation/tabs'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const Layout = () => {
  return (
    <StyledTabs headerClassName="bg-dark text-white" >
        <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
       <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <Ionicons name="cart-outline" color={color} size={size} />
              <View className="absolute -top-2 h-4 w-4 -right-4">
                <Text className="text-md font-bold"></Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rufus"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </StyledTabs>
  )
}

export default Layout