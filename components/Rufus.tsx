import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SUGGESTED_PHRASES = [
    'What do I need a shaker for?',
    'What are the best gifts for my best friends?',
    'What are the best sustainable shoes?',
];

const Page = () => {
    const router = useRouter();
    const onPhrasePress = async (phrase: string) => { }

    return (
        <ScrollView className='flex-1 bg-white pb-safe mb-10' contentContainerClassName='pb-12'>
            <View className='flex-1 items-center justify-center p-4'>
                <Text className='text-lg font-semibold mb-6 text-center'>
                    What do you need help with today ?
                </Text>
            </View>

            {/* Suggested phrases */}
            <View className='px-4 pb-2'>
                <View className='flex-row flex-wrap gap-2 justify-center mb-2'>
                    {SUGGESTED_PHRASES.map((phrase, idx) => (
                        <TouchableOpacity
                            key={idx}
                            className='bg-blue-100 px-3 py-2 mb-2 justify-center'
                        >
                            <Text className='text-blue-700 font-medium text-sm'>{phrase}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Chat messages */}
            <View className='flex-1 px-4'>
            </View>

            {/* Input */}
            <View className='px-4 pb-6'>
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 shadow-md">
                    <TextInput
                        className="flex-1 text-base"
                        placeholder="Ask Rufus a question"
                        placeholderTextColor="#888"
                        style={{ minHeight: 40 }}
                    />
                    <TouchableOpacity className='ml-2'>
                        <Ionicons name='mic-outline' size={24} color={'#2563eb'} />
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

export default Page