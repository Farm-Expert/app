import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function RecentPredictedCrop({crop,data,setCropname, setNitrogen, setPhosphorous, setPotassium, setTemperature, setHumidity, setRainfall, setPH ,navigation}) {

    const handleClick =()=>{
        setCropname(crop.name);
        setNitrogen(data.nitrogen);
        setPhosphorous(data.phosphorous);
        setPotassium(data.potassium);
        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setRainfall(data.rainfall);
        setPH(data.ph);
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handleClick} className="pr-5">
            <View className="h-20 rounded-full w-20 overflow-hidden">
                <Image source={{uri:crop.img}} style={{ width:'100%', height:'100%' }} />
            </View>
            <Text className="text-white font-bold text-center">{crop.name}</Text>
        </TouchableOpacity>
    );
}
