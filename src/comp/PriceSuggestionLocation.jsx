import { View, Text } from 'react-native'
import React from 'react'

export default function PriceSuggestionLocation() {
    return (
        <TouchableOpacity activeOpacity={0.7} className="pr-5">
            <Text className="text-white text-sm text-center">{crop.location}</Text>
            <Text className="text-center text-xs" style={{color:"#DDDDDD"}}>{crop.price}</Text>
        </TouchableOpacity>
    )
}