import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

const signInSchema = z.object({
    email: z.string().email('Plesase enter a valid mobile number or email'),
    password: z.string().min(1, 'Please enter your password')
})

type SignInForm = z.infer<typeof signInSchema>;

const Page = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const { signUp, isLoaded: isLoadedSignUp } = useSignUp();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: 'belhocineamine21@gmail.com', password: 'Iv5oC&o1' }
    })


    const onSubmit = async (data: SignInForm) => {
        
    }

    const createAccount = async (data: SignInForm) => { }

    const signInWithPasskey = async () => { }


    return (
        <KeyboardAvoidingView
            className='flex-1 bg-white'
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View className='p-4'>
                <Text className="text-2xl font-bold mb-2">Sign in or create an account</Text>
                <Text className="text-base font-medium mb-2">Enter mobile number or email</Text>

                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="border border-gray-300 rounded-md px-3 py-2 mb-2 bg-white"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder='Mobile number or email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />)}
                />
                {errors.email && <Text className='text-red-500 mb-2'>{errors.email.message}</Text>}


                <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="border border-gray-300 rounded-md px-3 py-2 mb-2 bg-white"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder='Amazon password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={!showPassword}
                            textContentType='password'
                        />)}
                />
                {errors.password && <Text className='text-red-500 mb-2'>{errors.password.message}</Text>}

                <TouchableOpacity
                    className="flex-row items-center mb-4"
                    onPress={() => setShowPassword((prev) => !prev)}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: showPassword }}
                    testID="show-password-checkbox">
                    <View
                        className={`w-5 h-5 rounded border border-gray-400 mr-2 items-center justify-center ${showPassword ? 'bg-green-100 border-green-600' : 'bg-white'
                            }`}>
                        {showPassword && <View className="w-3 h-3 bg-green-600 rounded" />}
                    </View>
                    <Text className="text-base">Show password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-yellow-400 rounded-full py-3 items-center mb-4"
                    onPress={handleSubmit(onSubmit)}>
                    <Text className="text-lg font-medium text-black">Sign in</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

export default Page