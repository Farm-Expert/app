import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function Scroll({crop,navigation}) {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("Predict",{crop:crop})} className="pr-5">
            <View className="h-20 rounded-full w-20 overflow-hidden">
                <Image source={{uri:crop.img}} style={{ width:'100%', height:'100%' }} />
            </View>
            <Text className="text-white font-bold text-center">{crop.name}</Text>
        </TouchableOpacity>
    );
}
