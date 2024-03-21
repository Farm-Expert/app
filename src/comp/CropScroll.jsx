import React from 'react';
import { View, Text } from 'react-native';

export default function CropScroll({name,value}) {
    
    return (
        <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">{name}</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>{value}</Text>
        </View>
    );
}
