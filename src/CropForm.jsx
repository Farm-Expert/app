import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';
import { useState } from 'react';
import { Alert } from 'react-native';
import back from "../assets/back.png"

export default function CropForm({navigation}) {

  const [Cropname,setCropName]= useState("")
  const [Nitrogen, setNitrogen] =useState("");
  const [Phosphorous, setPhosphorous] =useState("");
  const [Potassium, setPotassium] =useState("");
  const [Humidity, setHumidity] =useState("");
  const [Temperature, setTemperature] =useState("");
  const [Rainfall, setRainfall] =useState("");
  const [pH, setPH] =useState("");

const handlecropform = async () => {
  const data = await submit(Cropname,Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH)
  if (data) {
    navigation.navigate("Predict")
  }
  else {
    Alert.alert("Failed")
  }
}


  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >

    <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
        <Image source={img} className="h-full w-screen m-0 p-0" style={styles.img} />
    </View>
    <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-10">
            <Image source={back} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
    <KeyboardAvoidingView className="flex w-full rounded-3xl items-center justify-center h-2/3 bg-white">
      <Text className="text-2xl font-bold">Crop Information</Text>
      <View className="flex w-full flex-row flex-wrap items-center justify-between p-3">
      <TextInput
        style={styles.input}
        placeholder="Nitrogen"
        value={Nitrogen}
        onChange={(e)=>setNitrogen(e)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phophorous"
        value={Phosphorous}
        onChange={(e)=>setPhosphorous(e)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Potassium"
        value={Potassium}
        onChange={(e)=>setPotassium(e)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Humidity"
        value={Humidity}
        onChange={(e)=>setHumidity(e)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature"
        value={Temperature}
        onChange={(e)=>setTemperature(e)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rainfall"
        value={Rainfall}
        onChange={(e)=>setRainfall(e)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="pH"
        value={pH}
        onChange={(e)=>setPH(e)}
        keyboardType="numeric"
      />
      </View>
    </KeyboardAvoidingView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    padding: 30,
    alignItems: "center"
  },
  img: {
    height: 180,
    width:400,
    resizeMode: "contain"
  },
  input: {
    height: 40,
    margin: 12,
    borderColor: "gray",
    width:"40%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});