import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';
import bgimage from '../assets/bg.webp';
import crop from '../assets/crop.jpg';

export default function Predict() {
  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
        <Image source={crop} className="rounded-b-3xl h-full w-full m-0 p-0" style={styles.cropimg} />
        <View className="flex w-2/4 flex-row items-center justify-around m-0 p-0 rounded-2xl bottom-10" style={styles.rec}>
          <Image source={crop} className="rounded-2xl h-full w-full m-0 p-0" style={{ width: 50, height: 50 }} />
          <Image source={crop} className="rounded-2xl h-full w-full m-0 p-0" style={{ width: 50, height: 50 }} />
          <Image source={crop} className="rounded-2xl h-full w-full m-0 p-0" style={{ width: 50, height: 50 }} />
        </View>
      </View>

      <View className="flex w-screen flex-row items-center justify-around m-5 p-1">
        <Text className="text-slate-300 font-bold text-xl text-left">Rice</Text>
        <Text className="text-slate-300 font-bold text-xl text-left">$120</Text>
      </View>

      <View className="p-5 w-screen" style={{ height: 150}}>
        <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Nitrogen</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Potassium</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Nitrogen</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Nitrogen</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Nitrogen</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Nitrogen</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
          <View style={{ width: 130 }} className="bg-green-100 mr-5 h-full flex items-center justify-around p-5 rounded-3xl">
            <Text className="font-bold">Nitrogen</Text>
            <View style={{ height: 2 }} className="w-2/3 bg-black"></View>
            <Text>20%</Text>
          </View>
        </ScrollView>
      </View>




      <View>
        <Text className="text-white font-bold text-2xl text-left">How to grow Rice?</Text>
        <Text style={styles.desc} className="text-slate-300 font-bold text-xl text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore, nihil maiores dignissimos est, excepturi voluptatum voluptatibus repudiandae quibusdam, cum magnam esse illum. Repudiandae quaerat, repellendus molestias consectetur nisi tempora!</Text>
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
    resizeMode: "cover"
  },
  rec: {
    height: 80,
    backgroundColor: "#F3EEEAA0",
    position: "absolute",
  },
  desc: {

  }
});