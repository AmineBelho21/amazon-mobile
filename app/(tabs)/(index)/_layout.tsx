import { StyledStack } from '@/components/navigation/stack'
import SearchBar from '@/components/SearchBar'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <StyledStack 
      screenOptions={{
        header: () => <SearchBar />
      }}
      contentClassName="bg-gray-100 dark:bg-dark" 
      headerClassName="bg-dark text-white">
        <Stack.Screen name= "index" options={{ title: ''}}/>
    </StyledStack>


  )
}

export default Layout