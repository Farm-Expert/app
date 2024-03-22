import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import bgimage from '../assets/bg.webp';
import DiseaseScroll from './comp/DiseaseScroll';
import back from "../assets/back.png"
import { diseasePredict } from './auth/ml_api';


export default function PredictDisease({ navigation, route }) {
  console.log(route.params);
  const diseaseImg = route.params.img;
  const [name] = useState(route.params.disease_name);
  const [plantName] = useState(route.params.plant_name);
  const [precautions] = useState(route.params.precautions);
  const [symptoms] = useState(route.params.symptoms);
  const [treatment] = useState(route.params.treatment);
  const [show] = useState(true)
  const [loading] = useState(false);
  // console.log(diseaseImg, "Predict Disease");
  useEffect(() => {
    // handleDisease();
  }, []);

  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
      {loading &&<View className="absolute mt-10 z-50 w-screen h-screen flex items-center justify-center" style={{backgroundColor:"#00000060"}}><ActivityIndicator size="large" color="#0000ff" /></View>}
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <View className="flex w-screen items-center justify-center flex-row top-0 m-0 p-0">
        <View className="w-screen items-center top-0 justify-center rounded-lg overflow-hidden">
          <Image source={{ uri: diseaseImg }} className="rounded-full h-full w-full m-0 p-0" style={styles.diseaseimg} />
        </View>
      </View>
      {show ? (
        <>
          <Text className="text-white w-full -mt-5 font-bold text-center text-3xl">{name}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("disease")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-12">
            <Image source={back} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <View className="p-3 w-screen m-3 items-center justify-center h-full" style={{ backgroundColor: '#ffffff60', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>

            <ScrollView bouncesZoom={true} showsVerticalScrollIndicator={false} bounces={true}>
              <Text className="text-white w-full font-bold text-center text-xl">{plantName}</Text>
              <View style={{ height: 2 }} className=" items-center w-1.3 bg-white m-2"></View>
              <View className=" flex flex-col justify-center items-center m-2 ">
                <DiseaseScroll value={precautions} title="Precautions" />
                <DiseaseScroll value={symptoms} title="Symptoms" />
                <DiseaseScroll value={treatment} title="Treatment" />
              </View>
            </ScrollView>

          </View>
        </>
      ) :
        (
          <Text className="text-white w-full -mt-5 font-bold text-center text-3xl">{name}</Text>
        )}

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
    bottom: 50,
    height: 80,
    backgroundColor: "#F3EEEAA0",
    position: "absolute",
  },
});