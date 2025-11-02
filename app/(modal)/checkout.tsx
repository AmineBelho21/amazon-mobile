import { Article, createOrder, createPaymentIntent } from '@/utils/api';
import { useCartStore } from '@/utils/cartStore';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useStripe } from '@stripe/stripe-react-native';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
  const { articles, total, clearCart } = useCartStore();
  const { user } = useUser();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { getToken } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();

  const { isPending: isOrderPending, mutate: orderMutation } = useMutation({
    mutationFn: ({
      articles,
      token,
    }: {
      articles: (Article & { quantity: number })[];
      token: string;
    }) => createOrder(articles, token),
    onSuccess: (data) => {
      console.log('✅ Order created successfully:', data);
      console.log('Order ID:', data.id);
      console.log('Order items:', data.items);
      paymentMutation();
    },
    onError: (error) => {
      console.error('❌ Error creating order:', error);
      Alert.alert('Order Error', 'Failed to create order. Please try again.');
      setCheckoutLoading(false);
    },
  });

  const { isPending: isPaymentPending, mutate: paymentMutation } = useMutation({
    mutationFn: () => {
      console.log('💳 Creating payment intent for amount:', total);
      console.log('Email:', user?.emailAddresses[0].emailAddress);
      return createPaymentIntent(total, user?.emailAddresses[0].emailAddress ?? '');
    },
    onSuccess: (data) => {
      console.log('✅ Payment intent created:', data);
      const { paymentIntent, ephemeralKey, customer } = data;
      showPaymentSheet(paymentIntent, ephemeralKey, customer);
    },
    onError: (error) => {
      console.error('❌ Error creating payment intent:', error);
      Alert.alert('Payment Error', 'Failed to initialize payment. Please try again.');
      setCheckoutLoading(false);
    },
  });

  const handleCheckout = async () => {
    try {
      console.log('🛒 Starting checkout process...');
      console.log('Cart articles:', articles);
      console.log('Total amount:', total);
      
      const token = await getToken();
      console.log('🔑 Token retrieved:', token ? '✅ Token exists' : '❌ No token');
      
      setCheckoutLoading(true);
      
      if (!token) {
        console.error('❌ No authentication token found');
        Alert.alert('Error', 'Please login to continue');
        setCheckoutLoading(false);
        return;
      }
      
      if (!user?.emailAddresses?.[0]?.emailAddress) {
        console.error('❌ No email address found for user');
        Alert.alert('Error', 'User email not found. Please try again.');
        setCheckoutLoading(false);
        return;
      }
      
      console.log('📤 Sending order creation request...');
      orderMutation({ articles, token });
    } catch (error) {
      console.error('❌ Unexpected error in handleCheckout:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setCheckoutLoading(false);
    }
  };

  const showPaymentSheet = async (
    paymentIntent: string,
    ephemeralKey: string,
    customer: string
  ) => {
    try {
      console.log('💳 Initializing payment sheet...');
      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Galaxies.dev',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: user?.fullName ?? '',
        },
      });

      if (error) {
        console.error('❌ Error initializing payment sheet:', error);
        Alert.alert('Payment Error', error.message);
        setCheckoutLoading(false);
      } else {
        console.log('✅ Payment sheet initialized, presenting to user...');
        const { error: presentError } = await presentPaymentSheet();
        
        if (presentError) {
          console.log('⚠️ Payment sheet dismissed or error:', presentError);
          if (presentError.code === 'Canceled') {
            console.log('User canceled payment');
            Alert.alert('Payment Canceled', 'Your order has been created but payment was not completed.');
          } else {
            console.error('❌ Payment error:', presentError);
            Alert.alert('Payment Error', presentError.message);
          }
          setCheckoutLoading(false);
        } else {
          console.log('✅ Payment completed successfully!');
          clearCart();
          Alert.alert('Success', 'Your order is confirmed!', [
            {
              text: 'OK',
              onPress: () => {
                console.log('Navigating back after successful payment');
                router.dismissAll();
              },
            },
          ]);
          setCheckoutLoading(false);
        }
      }
    } catch (error) {
      console.error('❌ Unexpected error in showPaymentSheet:', error);
      Alert.alert('Error', 'An unexpected error occurred during payment.');
      setCheckoutLoading(false);
    }
  };

  return (
    <ScrollView contentContainerClassName="flex-1 p-5 bg-white">
      {(isOrderPending || isPaymentPending || checkoutLoading) && (
        <View className="flex-1 absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/20 z-20">
          <ActivityIndicator size="large" className="text-dark" />
        </View>
      )}
      <View className="mb-4">
        <Text className="text-sm mb-2 text-gray-900">
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
  );
};

export default Page;