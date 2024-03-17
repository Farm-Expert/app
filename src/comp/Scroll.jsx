import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { search_crop } from '../auth/recent';

export default function Scroll({crop,navigation}) {
    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    const click_crop =async (crop) => {
        const response =await search_crop(crop);
        if (response != null) {
          navigation.navigate("Predict", { crop: response })
        }
        else {
          showToast(`Authentication Failed: ${data}`)
        }
      }
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>click_crop(crop.name)} className="pr-5">
            <View className="h-20 rounded-full w-20 overflow-hidden">
                <Image source={{uri:crop.img}} style={{ width:'100%', height:'100%' }} />
            </View>
            <Text className="text-white font-bold text-center">{crop.name}</Text>
        </TouchableOpacity>
    );
}
