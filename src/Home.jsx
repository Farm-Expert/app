import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import stringSimilarity from 'string-similarity';
import bgImage from "../assets/bg2.jpg"
import avatar from "../assets/avatar.png"
import searchicon from "../assets/seach.png"
import soil from "../assets/soil.jpg"
import crop from "../assets/crop.jpg"
import profile from "../assets/profile.png"
import home from "../assets/home.png"
import Scroll from './comp/Scroll';
import * as Speech from 'expo-speech';
import { add_recentCrop, recentCrop } from './auth/recent';
import { useSelector } from 'react-redux';
import crop_json from './data/crop_json';
export default function Home({ navigation }) {
  const [text, setText] = useState('farm expert me aapka swagat hai');
  const imgsrc=useSelector(state => state.profile_img)
  const user_data=useSelector(state => state.value)
  const handleSpeak = async () => {
    if (text.trim() !== '') {
      Speech.speak(text, { language: 'hin' });
      console.log(imgsrc);
    }
  };
  const [search, setSearch] = useState("");
  const [recent_crops, setRecentCrops] = useState([]);

  useEffect(() => {
    handleSpeak();
    handlesearch();
    // console.log("user_data",user_data.payload.user.profileimg);
    // if(user_data.payload.user.profileimg && user_data.payload.user.profileimg !== ""){
    //   console.log("img",user_data.payload.user.profileimg);
    //   setImgSrc(user_data.payload.user.profileimg);
    // }
  }, [])

  const handlesearch = async () => {
    const data = await recentCrop(user_data.payload.token)

    if (data.recentCrop) {
      data.recentCrop.filter(recentCrop => crop_json.some(crop => crop.name === recentCrop.crop))
      setRecentCrops(data.recentCrop);
    }
    else {
      Alert.alert("Failed", data)
    }
  }

  const handle_crop_search = async () => {
    const cropNames = crop_json.map(crop => crop.name);
    const matches = stringSimilarity.findBestMatch(search, cropNames);
    // console.log(matches.bestMatch.target);
    const data = await add_recentCrop(user_data.payload.token, matches.bestMatch.target)
    if (data != null && data.crop) {
      setSearch("");
      handlesearch();
      navigation.navigate("Predict", { crop: crop_json.find(crop => crop.name === matches.bestMatch.target) })
    }
    else {
      Alert.alert("Failed", data)
    }
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.backgroundImage}
    >
      <StatusBar backgroundColor='transparent'
        barStyle='light-content'
        color='white'
        hidden={false}
        translucent={true}
        networkActivityIndicatorVisible={true}
        showHideTransition='slide'
      />

      {/* handle search yaha daala h jisse jaise hi home aae search update ho jae */}
      <View className="flex w-full flex-row items-center justify-between">
        <View>
          <Text className="text-slate-300 font-bold text-xl text-left">Hi There !! {user_data.payload.user.name}</Text>
          <Text className="text-white font-bold text-2xl text-left">Happy Farming</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Profile")}><Image className="rounded-full" source={{ uri: imgsrc }} style={{ width: 50, height: 50 }} /></TouchableOpacity>
      </View>
      <View className="rounded-3xl flex gap-2 flex-row items-center justify-center mt-12" style={styles.input}>
        <TextInput value={search} onChangeText={e => setSearch(e)} className="font-bold mb-2 text-lg" style={{ width: "80%" }} placeholder="Search crop name...." />
        <TouchableOpacity onPress={handle_crop_search} activeOpacity={0.7}><Image source={searchicon} style={{ width: 30, height: 30 }} /></TouchableOpacity>
      </View>

      {/* suggested crops */}
      <View className="w-full h-28 mt-4">
        <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
          {
            // crop_json.filter(crop => recent_crops.some(e => e.crop === crop.name)).map((crop, i) => {
            //   console.log("Filtered crop:", crop.name); // Add the console.log here
            //   return (
            //     <Scroll key={i} crop={crop} navigation={navigation} />
            //   );
            // })
            recent_crops.filter(recentCrop => crop_json.some(crop => crop.name === recentCrop.crop))
              .map((recentCrop, i) => {
                const matchingCrop = crop_json.find(crop => crop.name === recentCrop.crop);
                console.log("Filtered crop:", matchingCrop.name); // Add the console.log here
                return (
                  <Scroll key={i} crop={matchingCrop} navigation={navigation} />
                );
              })
          }
        </ScrollView>
      </View>
      <View style={{ height: 2 }} className="bg-slate-300 w-full"></View>
      <View className="w-full"><Text className="text-left text-slate-300 font-bold mb-10">{"scroll ->"}</Text></View>

      <View><Text className="text-white text-2xl font-bold">Features</Text></View>
      <View className="w-screen flex items-center justify-center">
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View className="flex w-screen p-4 pt-7 flex-row items-start justify-center gap-2">
            <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("Soil")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
              <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                <Image source={soil} className="rounded-3xl h-full w-full" />
              </View>
              <View className='w-full h-1/6' >
                <Text className="text-black font-bold text-center">Predict Soil</Text>
                <Text className="text-center text-slate-500 text-xs">for given Crop</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("Crop")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
              <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                <Image source={crop} className="rounded-3xl h-full w-full" />
              </View>
              <View className='w-full h-1/6' >
                <Text className="text-black font-bold text-center">Predict Crop</Text>
                <Text className="text-center text-slate-500 text-xs">for given Soil Condition</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex w-screen p-4 pt-7 flex-row items-start justify-center gap-2">
            <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("Soil")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
              <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                <Image source={soil} className="rounded-3xl h-full w-full" />
              </View>
              <View className='w-full h-1/6' >
                <Text className="text-black font-bold text-center">Predict Soil</Text>
                <Text className="text-center text-slate-500 text-xs">for given Crop</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("Crop")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
              <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                <Image source={crop} className="rounded-3xl h-full w-full" />
              </View>
              <View className='w-full h-1/6' >
                <Text className="text-black font-bold text-center">Predict Crop</Text>
                <Text className="text-center text-slate-500 text-xs">for given Soil Condition</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={{ height: 2 }} className="bg-slate-300 w-full"></View>
      <View className="w-full"><Text className="text-left text-slate-300 font-bold">{"scroll ->"}</Text></View>

      {/* nav */}
      {/* <View style={{ width: "100%" }} className="absolute bottom-12">
        <View className="h-16 rounded-full mt-7 overflow-hidden flex flex-row justify-around items-center w-full bg-green-100">
          <TouchableOpacity className="flex items-center opacity-25 justify-center flex-1"><Image source={home} style={{ width: 30, height: 30 }} /></TouchableOpacity>
          <View style={{ width: 2, height: 35, backgroundColor: "black" }}></View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")} className="flex-1 flex items-center justify-center"><Image source={profile} style={{ width: 30, height: 30 }} /></TouchableOpacity>
        </View>
      </View> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    paddingTop: 50,
    resizeMode: 'cover',
    paddingHorizontal: 30,
    alignItems: "center"
  },
  input: {
    height: 50,
    backgroundColor: "white",
    // borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
});
