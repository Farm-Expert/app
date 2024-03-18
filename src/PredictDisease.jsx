import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import bgimage from '../assets/bg.webp';
import CropScroll from './comp/CropScroll';
import back from "../assets/back.png"


export default function PredictDisease({navigation, route}) {
  const {diseaseImg}= route.params;
//   console.log(img,"lalala");
  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" backgroundColor="#ffffff30" />
      <View className="flex w-screen items-center justify-center flex-row top-0 m-0 p-0">
        <View className="w-screen items-center top-0 justify-center rounded-lg overflow-hidden">
          <Image source={{uri:diseaseImg}} className="rounded-b-3xl h-full w-full m-0 p-0" style={styles.diseaseimg} />
        </View>
      </View>
      <Text className="text-white w-full -mt-5 font-bold text-center text-3xl">Disease Name</Text>
      <TouchableOpacity onPress={() => navigation.navigate("disease")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-12">
                <Image source={back} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <View className="p-5 w-screen" style={{ height: 150 }}>
        <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In ex provident et molestiae eius, ratione rem odio laborum consectetur ipsum dolore voluptatem tempora, ducimus dignissimos ut reiciendis eos quibusdam obcaecati?
          {/* Here Precuations and cure display */}
        </ScrollView>
      </View>

      {/* we can also add correct soil conditions to grow the crop */}

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
  diseaseimg: {
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