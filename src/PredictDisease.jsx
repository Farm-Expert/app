import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import bgimage from '../assets/bg.webp';
import DiseaseScroll from './comp/DiseaseScroll';
import back from "../assets/back.png"
import { diseasePredict } from './auth/ml_api';


export default function PredictDisease({ navigation, route }) {
  console.log(route.params);
  const diseaseImg = route.params.img;
  const [name, setName] = useState("");
  const [plantName, setPlantName] = useState("");
  const [precautions, setPrecautions] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [show, setShow] = useState(true)
  const [msg, setMsg] = useState("");
  // console.log(diseaseImg, "Predict Disease");
  useEffect(() => {
    handleDisease();
  }, [])
  const handleDisease = async () => {
    const data = await diseasePredict(diseaseImg);
    console.log(data, "predict data")
    if (data && data.success) {
      setShow(true);
      setName(data.disease_name);
      setPlantName(data.plant_name);
      setPrecautions(data.precautions);
      setSymptoms(data.symptoms);
      setTreatment(data.treatment);
    }
    else {
      setShow(false);
      setName('No disease detected');
      setPlantName('');
      setPrecautions('');
      setSymptoms('');
      setTreatment('');
    }
  }

  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >
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
              {/* Here Precuations and cure display */}
              {/* {precautions.map((item,i)=>{
            return (
              <DiseaseScroll key={i} value={item}></DiseaseScroll>
            )
          })} */}
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