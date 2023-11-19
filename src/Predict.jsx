import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';
import bgimage from '../assets/bg.webp';
import crop from '../assets/rice.jpg';
import CropScroll from './comp/CropScroll';

export default function Predict() {
  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
        <Image source={crop} className="rounded-b-3xl h-full w-full m-0 p-0" style={styles.cropimg} />
        <View className="flex w-3/5 flex-row items-center justify-evenly m-0 p-2 rounded-2xl bottom-10" style={styles.rec}>
          <Image source={crop} className="rounded-2xl h-full w-full m-1 p-0" style={{ width: 55, height: 55 }} />
          <Image source={crop} className="rounded-2xl h-full w-full m-1 p-0" style={{ width: 55, height: 55 }} />
          <Image source={crop} className="rounded-2xl h-full w-full m-1 p-0" style={{ width: 55, height: 55 }} />
        </View>
      </View>

      <View className="w-screen flex flex-row items-left justify-between m-4 px-7">
        <Text className="text-white font-bold text-3xl text-left">Rice</Text>
        <Text className="text-white font-bold text-2xl text-left">$120</Text>
      </View>

      <View className="p-5 w-screen" style={{ height: 150 }}>
        <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
          <CropScroll name={"Nitrogen"} value={122} />
          <CropScroll name={"PH"} value={122} />
          <CropScroll name={"Temperature"} value={122} />
          <CropScroll name={"Phosphorus"} value={122} />
          <CropScroll name={"Rainfall"} value={122} />
          <CropScroll name={"Potassium"} value={122} />
          <CropScroll name={"Humidity"} value={122} />
        </ScrollView>
      </View>

      <View className="w-screen flex flex-column items-left justify-around m-4 px-7">
        <Text className="text-white font-bold text-2xl text-left pb-3">How to grow Rice?</Text>
        <ScrollView vertical={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
        <Text className="text-slate-300 font-bold text-xl text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore, nihil maiores dignissimos est, excepturi voluptatum voluptatibus repudiandae quibusdam, cum magnam esse illum. Repudiandae quaerat, repellendus molestias consectetur nisi tempora!</Text>
        </ScrollView>      
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 30,
    alignItems: "center"
  },
  cropimg: {
    height: 380,
    resizeMode: "contain"
  },
  rec: {
    height: 80,
    backgroundColor: "#F3EEEAA0",
    position: "absolute",
  },
});