import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import bgimage from '../assets/bg.webp';
import CropScroll from './comp/CropScroll';
import back from "../assets/back.png"

export default function Predict({navigation, route}) {
  const { crop } = route.params;
  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" backgroundColor="#ffffff30" />
      <View className="flex w-screen items-center justify-center flex-row top-0 m-0 p-0">
        <View className="w-screen items-center top-0 justify-center rounded-lg overflow-hidden">
          <Image source={{uri:crop.img}} className="rounded-b-3xl h-full w-full m-0 p-0" style={styles.cropimg} />
        </View>
        <View className="flex w-3/5 flex-row items-center justify-evenly m-0 p-2 rounded-2xl" style={styles.rec}>
          <Image source={{uri:crop.img}} className="rounded-2xl h-full w-full p-0" style={{ width: 55, height: 55 }} />
          <Image source={{uri:crop.img}} className="rounded-2xl h-full w-full p-0" style={{ width: 55, height: 55 }} />
          <Image source={{uri:crop.img}} className="rounded-2xl h-full w-full p-0" style={{ width: 55, height: 55 }} />
        </View>
      </View>
      <Text className="text-white w-full -mt-5 font-bold text-center text-3xl">{crop.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-12">
                <Image source={back} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
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

      <View style={{backgroundColor:"#00000080"}} className="w-screen p-4 rounded-tl-3xl rounded-tr-3xl flex-1 flex flex-column items-left justify-around">
        <Text className="text-white font-extrabold text-2xl text-center pb-3">How to grow {crop.name}?</Text>
        <ScrollView showsVerticalScrollIndicator={false} vertical={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
          <Text className="text-slate-300 font-bold pl-3 pr-3 text-xl text-left">{crop.desc}</Text>
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
    height: 300,
    width: "100%",
    marginBottom: 30,
    borderRadius: 20,
    // resizeMode: "contain"
  },
  rec: {
    bottom:50,
    height: 80,
    backgroundColor: "#F3EEEAA0",
    position: "absolute",
  },
});