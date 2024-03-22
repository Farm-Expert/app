import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function PriceSuggestionCrop({ value, title }) {
    return (
        <View className=" bg-lime-100" style={{ width :'100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 20, marginBottom: 10, marginTop: 10 }}>
            {/* <Text className="font-bold text-xl">{capitalizedCropName}</Text> */}
            <Text className=" text-xl font-bold">{title}</Text>
            <View style={{ height: 2}} className=" items-center w-1/3 bg-black m-2"></View>
            {value.map((item, i) => {
                return (
                    <Text key={i}>{item}</Text>
                )
            })}
        </View>
    )
}
