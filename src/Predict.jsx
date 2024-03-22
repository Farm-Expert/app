import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import bgimage from '../assets/bg.webp';
import CropScroll from './comp/CropScroll';
import back from "../assets/back.png";
import { search_crop } from './auth/recent';


export default function Predict({ navigation, route }) {
  const { crop } = route.params;
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  const search =async (crop) => {
    const response =await search_crop(crop);
    if (response != null) {
      navigation.navigate("Predict", { crop: response })
    }
    else {
      showToast(`Authentication Failed: ${data}`)
    }
  }

  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" backgroundColor="#ffffff30" />
      <View className="flex w-screen items-center justify-center flex-row top-0 m-0 p-0">
        <View className="w-screen items-center top-0 justify-center rounded-lg overflow-hidden">
          <Image source={{ uri: crop.ci[0] }} className="rounded-b-3xl h-full w-full m-0 p-0" style={styles.cropimg} />
        </View>
        <View className="flex w-4/6 flex-row items-center justify-around m-0 p-1 rounded-xl" style={styles.rec}>
          <TouchableOpacity onPress={()=>search(crop.cn[1])}>
            <Image source={{ uri: crop.ci[1] }} className="rounded h-full w-full p-0" style={{ width: 75, height: 65 }} />
            <Text className="text-black text-xs font-bold text-center">{crop.cn[1].length > 8 ? `${crop.cn[1].slice(0, 8)}...` : crop.cn[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>search(crop.cn[2])}>
            <Image source={{ uri: crop.ci[2] }} className="rounded h-full w-full p-0" style={{ width: 75, height: 65 }} />
            <Text className="text-black text-xs font-bold text-center">{crop.cn[2].length > 8 ? `${crop.cn[2].slice(0, 8)}...` : crop.cn[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>search(crop.cn[3])}>
            <Image source={{ uri: crop.ci[3] }} className="rounded h-full w-full p-0" style={{ width: 75, height: 65 }} />
            <Text className="text-black text-xs font-bold text-center">{crop.cn[3].length > 8 ? `${crop.cn[3].slice(0, 8)}...` : crop.cn[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-white w-full -mt-5 font-bold text-center text-3xl">{crop.cn[0]}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-12">
        <Image source={back} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <View className="p-5 w-screen" style={{ height: 150 }}>
        <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
          <CropScroll name={"Nitrogen"} value={crop.crop[0]} />
          <CropScroll name={"PH"} value={crop.crop[5]} />
          <CropScroll name={"Temperature"} value={crop.crop[3]} />
          <CropScroll name={"Phosphorus"} value={crop.crop[1]} />
          <CropScroll name={"Rainfall"} value={crop.crop[6]} />
          <CropScroll name={"Potassium"} value={crop.crop[2]} />
          <CropScroll name={"Humidity"} value={crop.crop[4]} />
        </ScrollView>
      </View>

      <View style={{ backgroundColor: "#00000080" }} className="w-screen p-4 rounded-tl-3xl rounded-tr-3xl flex-1 flex flex-column items-left justify-around">
        <Text className="text-white font-extrabold text-2xl text-center pb-3">How to grow {crop.name}?</Text>
        <ScrollView showsVerticalScrollIndicator={false} vertical={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
          <Text className="text-slate-300 font-bold pl-3 pr-3 text-xl text-left">{crop.cd}</Text>
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
    bottom: 30,
    height: 90,
    backgroundColor: "#F3EEEAA0",
    position: "absolute",
  },
});