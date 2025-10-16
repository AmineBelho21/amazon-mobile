import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Page = () => {
  return (
    <View className='flex-1'>
        <SignedOut>
            <View className='pt-10 px-8 items-center'>
                <Text className="text-3xl text-center">Sign in for the optimal experience</Text>
            </View>
            <View className="mt-8 w-full px-8">
          <Link href="/signIn" asChild>
            <TouchableOpacity className="bg-primary py-3 px-4 border border-dark">
              <Text className="text-center text-base text-dark">Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
        </SignedOut>

        <SignedIn>
        <View className="pt-10 px-8 items-center">
          <View className="pt-10 px-8 items-center">
            <Text className="text-3xl text-center">You are signed in</Text> 
          </View>
        </View>
      </SignedIn>
    </View>
  )
}

export default Page