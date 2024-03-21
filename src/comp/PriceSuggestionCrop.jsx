import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function PriceSuggestionCrop({ crop, navigation }) {
    const capitalizedCropName = crop.charAt(0).toUpperCase() + crop.slice(1);

    return (
        <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold text-xl">{capitalizedCropName}</Text>
        </View>
    )
}