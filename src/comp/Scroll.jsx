import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Scroll({crop,navigation}) {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("Predict")} className="pr-5">
            <View className="h-20 rounded-full w-20 bg-yellow-400">

            </View>
            <Text className="text-white font-bold text-center">{crop}</Text>
        </TouchableOpacity>
    );
}
