import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming.png';

export default function SoilForm() {
  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >

    <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
        <Image source={img} className="h-full w-screen m-4 p-4" style={styles.img} />
    </View>

    <View className="flex w-screen rounded-3xl flex-row items-center justify-center m-0 p-4 h-80 bg-white">

    </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    padding: 30,
    alignItems: "center"
  },
  img: {
    height: 250,
    width:400,
    resizeMode: "contain"
  },
});