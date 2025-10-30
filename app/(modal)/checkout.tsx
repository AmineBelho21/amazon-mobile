import { useCartStore } from '@/utils/cartStore'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useStripe } from '@stripe/stripe-react-native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Page = () => {
  const { articles, total, clearCart } = useCartStore()
  const { user } = useUser();
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const { getToken } = useAuth()
  const [ checkoutLoading, setCheckoutLoading ] = useState(false);
  const router = useRouter()

  const handleCheckout = async () => {

  }

  return (
    <ScrollView contentContainerClassName='flex-1 p-5 bg-white'>
      <View className='mb-4'>
        <Text className='text-sm mb-2 text-gray-900'>
        By placing your order you agree to Amazon's Conditions of Use & Sale. Please see our
        Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </Text>
      </View>
      <TouchableOpacity
        className="bg-yellow-300 rounded-full py-4 items-center mb-5 mt-1"
        onPress={handleCheckout}>
        <Text className="text-2xl font-bold text-gray-900">Buy now</Text>
      </TouchableOpacity>
      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <Text className="text-lg font-semibold mb-1">Order Total:</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-1">${total.toFixed(2)}</Text>
        <Text className="text-xs text-gray-500">Order totals include VAT.</Text>
      </View>

    </ScrollView>
  )
}

export default Page