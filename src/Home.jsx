import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Alert, Linking, ToastAndroid } from 'react-native';
import stringSimilarity from 'string-similarity';
import bgImage from "../assets/bg2.jpg"
import searchicon from "../assets/seach.png"
import soil from "../assets/soil.jpg"
import disease_plant from "../assets/disease_plant.jpg"
import chatbot from "../assets/chatbot.jpg"
import crop from "../assets/crop.jpg"
import farmbg from '../assets/farmbg.png';
import Scroll from './comp/Scroll';
import * as Speech from 'expo-speech';
import { add_recentCrop, recentCrop, search_crop } from './auth/recent';
import { useSelector } from 'react-redux';
import crop_json from './data/crop_json';
import price from '../assets/price.jpg'


export default function Home({ navigation }) {
  const [text, setText] = useState('Welcome to Agri Tech');
  const imgsrc = useSelector(state => state.profile_img)
  const user_data = useSelector(state => state.value)
  const handleSpeak = async () => {
    if (text.trim() !== '') {
      Speech.speak(text, { language: 'eng' });
    }
  };
  const [search, setSearch] = useState("");
  const [recent_crops, setRecentCrops] = useState([]);
  const [news, setNews] = useState([]);

  const addNews = async () => {
    const data = await fetch("https://newsdata.io/api/1/news?apikey=pub_401852fbb45d7f29a86ad96f72210c73ca7bb&q=agriculture&country=in&language=en&category=business,domestic,environment,food,health")
    const news = await data.json();
    setNews(news.results);
  }
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  useEffect(() => {
    // handleSpeak();
    handlesearch();
    addNews();
  }, [])

  const handlesearch = async () => {
    const data = await recentCrop(user_data.payload.token)

    if (data.recentCrop) {
      let filtercrop = []
      data.recentCrop.filter(recentCrop => crop_json.some(crop => crop.name === recentCrop.crop))
        .map((recentCrop, i) => {
          const matchingCrop = crop_json.find(crop => crop.name === recentCrop.crop);
          filtercrop = [...filtercrop, matchingCrop]

        }
        )
      filtercrop = filtercrop.reverse()
      setRecentCrops(filtercrop);
    }
    else {
      Alert.alert("Failed", data)
    }
  }


  const handle_crop_search = async () => {
    const cropNames = crop_json.map(crop => crop.name);
    const matches = stringSimilarity.findBestMatch(search, cropNames);
    const data = await add_recentCrop(user_data.payload.token, matches.bestMatch.target)
    if (data != null && data.crop) {
      setSearch("");
      handlesearch();
      const response = await search_crop(matches.bestMatch.target);
      if (response != null) {
        navigation.navigate("Predict", { crop: response })
      }
      else {
        showToast(`Authentication Failed: ${data}`)
      }
    }
    else {
      showToast(`Failed: ${data}`)
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
          <Text className="text-slate-300 font-bold text-xl text-left">Hi {user_data.payload.user.name}!!</Text>
          <Text className="text-white font-bold text-2xl text-left">Happy Farming</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Profile")}><Image className="rounded-full" source={{ uri: imgsrc }} style={{ width: 50, height: 50 }} /></TouchableOpacity>
      </View>
      <View className="rounded-3xl flex gap-2 flex-row items-center justify-center mt-12" style={styles.input}>
        <TextInput value={search} onChangeText={e => setSearch(e)} className="font-bold mb-2 text-lg" style={{ width: "80%" }} placeholder="Search crop name...." />
        <TouchableOpacity onPress={handle_crop_search} activeOpacity={0.7}><Image source={searchicon} style={{ width: 30, height: 30 }} /></TouchableOpacity>
      </View>

      {/* suggested crops */}
      <View className="w-screen flex-1 flex items-center justify-center">
        <ScrollView >
          <View className="w-full px-3 h-28 mt-4 ">

            <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
              {
                // crop_json.filter(crop => recent_crops.some(e => e.crop === crop.name)).map((crop, i) => {
                //   console.log("Filtered crop:", crop.name); // Add the console.log here
                //   return (
                //     <Scroll key={i} crop={crop} navigation={navigation} />
                //   );
                // })
                // recent_crops.filter(recentCrop => crop_json.some(crop => crop.name === recentCrop.crop))
                //   .map((recentCrop, i) => {
                //     const matchingCrop = crop_json.find(crop => crop.name === recentCrop.crop);
                recent_crops.map((matchingCrop, i) => {
                  return (
                    <Scroll key={i} crop={matchingCrop} navigation={navigation} />
                  );
                })
              }
            </ScrollView>
          </View>
          <View className="flex items-center justify-center mb-2">
            <View style={{ height: 2 }} className="bg-slate-400 w-3/4"></View>
          </View>
          <Text className="text-white text-2xl mt-4 text-center font-extrabold">Features</Text>
          <View className="flex items-center justify-center">
            <View style={{ height: 2 }} className="bg-slate-300  w-1/4"></View>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View className="flex w-screen px-4 pt-2 flex-row items-start justify-center gap-2">
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
            <View className="flex w-screen px-4 pt-2 flex-row items-start justify-center gap-2">
              <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("disease")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
                <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                  <Image source={disease_plant} className="rounded-3xl h-full w-full" />
                </View>
                <View className='w-full h-1/6' >
                  <Text className="text-black font-bold text-center">Disease Prediction</Text>
                  <Text className="text-center text-slate-500 text-xs">for predicting plant disease</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("price")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
                <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                  <Image source={price} className="rounded-3xl h-full w-full" />
                </View>
                <View className='w-full h-1/6' >
                  <Text className="text-black font-bold text-center">Crop Price Prediction</Text>
                  <Text className="text-center text-slate-500 text-xs">for predicting crop price</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex w-screen px-4 pt-2 flex-row items-start justify-center gap-2">
              <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("chatbot")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
                <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                  <Image source={chatbot} className="rounded-3xl h-full w-full" />
                </View>
                <View className='w-full h-1/6' >
                  <Text className="text-black font-bold text-center">Chat Bot</Text>
                  <Text className="text-center text-slate-500 text-xs">Chat With Agro Expert</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ elevation: 10 }} onPress={() => navigation.navigate("chatbot")} activeOpacity={0.7} className=" h-60 w-1/2 flex items-center justify-start rounded-3xl bg-green-100">
                <View className='w-full h-5/6' style={{ overflow: "hidden" }}>
                  <Image source={chatbot} className="rounded-3xl h-full w-full" />
                </View>
                <View className='w-full h-1/6' >
                  <Text className="text-black font-bold text-center">Chat Bot</Text>
                  <Text className="text-center text-slate-500 text-xs">Chat With Agro Expert</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View className="flex mt-2 items-center justify-center mb-2">
            <View style={{ height: 2 }} className="bg-slate-400 w-5/6"></View>
            <Text className="text-slate-100 text-left w-full px-7 font-bold ">{"scroll->"}</Text>
          </View>
          <Text className="text-white text-2xl mt-3 text-center font-extrabold">News</Text>
          <View className="flex items-center justify-center">
            <View style={{ height: 2 }} className="bg-slate-300  w-1/4"></View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, paddingTop: 3, width: '100%' }}>
            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '90.33%' }}>
              {
                news.map((e) => {
                  if (e.description) {
                    const words = e.description ? e.description.split(' ') : e.description;
                    const displayedDescription = words.length > 10 ? `${words.slice(0, 10).join(' ')}...` : e.description;
                    return (
                      <TouchableOpacity key={e.article_id} style={{ elevation: 10, overflow: "hidden", height: 100, margin: 3, padding: 1, width: '100%', alignItems: 'flex-start', borderRadius: 10, backgroundColor: '#C6F6D5' }} onPress={() => Linking.openURL(e.link)} activeOpacity={0.7} >
                        <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                          {e.image_url ? <Image source={{ uri: e.image_url }} style={{ borderRadius: 10, height: '100%', width: '33.33%' }} /> : <Image source={farmbg} style={{ borderRadius: 10, height: '100%', width: '33.33%' }} />}
                          <View className="flex items-center" style={{ height: '100%', width: '66.67%', padding: 1, justifyContent: 'space-around' }}>
                            <Text style={{ color: 'black', flexShrink: 1, fontWeight: 'bold', textAlign: 'center' }}>{e.title}</Text>
                            <Text className="text-xs text-slate-600 font-bold" style={{ flexShrink: 1, textAlign: 'center' }}>{displayedDescription}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                })
              }
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
