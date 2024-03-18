import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import bgimage from '../assets/bg.webp';
import CropScroll from './comp/CropScroll';
import back from "../assets/back.png"


export default function PredictDisease({navigation, route}) {
    console.log(route.params);
  const diseaseImg = route.params.img;
  console.log(diseaseImg,"Predict Disease");
  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <View className="flex w-screen items-center justify-center flex-row top-0 m-0 p-0">
        <View className="w-screen items-center top-0 justify-center rounded-lg overflow-hidden">
          <Image source={{uri:diseaseImg}} className="rounded-full h-full w-full m-0 p-0" style={styles.diseaseimg} />
        </View>
      </View>
      <Text className="text-white w-full -mt-5 font-bold text-center text-3xl">Disease Name</Text>
      <TouchableOpacity onPress={() => navigation.navigate("disease")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-12">
                <Image source={back} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <View className="p-5 w-screen m-3 justify-center" style={{ height: 150 ,backgroundColor:'#ffffff60',borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <ScrollView bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
            <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In ex provident et molestiae eius, ratione rem odio laborum consectetur ipsum dolore voluptatem tempora, ducimus dignissimos ut reiciendis eos quibusdam obcaecati?</Text>
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
        top: 0,
        paddingTop: 50,
        resizeMode: 'cover',
        paddingHorizontal: 30,
        alignItems: "center"
    },
  diseaseimg: {
    justifyContent: 'center',
    height: 200,
    width: "50%",
    marginBottom: 40,
    // borderRadius: 50,
    
    // resizeMode: "contain"
  },
  rec: {
    bottom:50,
    height: 80,
    backgroundColor: "#F3EEEAA0",
    position: "absolute",
  },
});