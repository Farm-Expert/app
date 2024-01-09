import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput} from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function CropForm() {
  // const [nitrogenfocus, setNitrogenFocus] = useState(false);
  // const [phosphorousfocus, setPhosphorousFocus] = useState(false);
  // const [potassiumfocus, setPotassiumFocus] = useState(false);
  // const [humidityfocus, setHumidityFocus] = useState(false);
  // const [temperaturefocus, setTemperatureFocus] = useState(false);
  // const [rainfallfocus, setRainfallFocus] = useState(false);
  // const [phfocus, setPhFocus]= useState(false)
  const [Cropname,setCropName]= useState("")
  const [Nitrogen, setNitrogen] =useState("");
  const [Phosphorous, setPhosphorous] =useState("");
  const [Potassium, setPotassium] =useState("");
  const [Humidity, setHumidity] =useState("");
  const [Temperature, setTemperature] =useState("");
  const [Rainfall, setRainfall] =useState("");
  const [pH, setPH] =useState("");

// ab button tu bana lena handle wala function complete h -----
const handlecropform = async () => {
  const data = await submit({ Cropname,Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH })
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

    <View className="flex w-full rounded-3xl flex-row items-center justify-center h-2/3 bg-white">
      <View className="flex w-full flex-row flex-wrap items-center justify-between p-3">
      <TextInput
        style={styles.input}
        placeholder="Nitrogen"
        value={Nitrogen}
        onChange={(e)=>setNitrogen(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(true)
      //     setPhosphorousFocus(false)
      //     setPotassiumFocus(false)
      //     setHumidityFocus(false)
      //     setTemperatureFocus(false)
      //     setRainfallFocus(false)
      //     setPhFocus(false)
      // }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phophorous"
        value={Phosphorous}
        onChange={(e)=>setPhosphorous(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(false)
      //     setPhosphorousFocus(true)
      //     setPotassiumFocus(false)
      //     setHumidityFocus(false)
      //     setTemperatureFocus(false)
      //     setRainfallFocus(false)
      //     setPhFocus(false)
      // }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Potassium"
        value={Potassium}
        onChange={(e)=>setPotassium(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(false)
      //     setPhosphorousFocus(false)
      //     setPotassiumFocus(true)
      //     setHumidityFocus(false)
      //     setTemperatureFocus(false)
      //     setRainfallFocus(false)
      //     setPhFocus(false)
      // }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Humidity"
        value={Humidity}
        onChange={(e)=>setHumidity(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(false)
      //     setPhosphorousFocus(false)
      //     setPotassiumFocus(false)
      //     setHumidityFocus(true)
      //     setTemperatureFocus(false)
      //     setRainfallFocus(false)
      //     setPhFocus(false)
      // }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature"
        value={Temperature}
        onChange={(e)=>setTemperature(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(false)
      //     setPhosphorousFocus(false)
      //     setPotassiumFocus(false)
      //     setHumidityFocus(false)
      //     setTemperatureFocus(true)
      //     setRainfallFocus(false)
      //     setPhFocus(false)
      // }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rainfall"
        value={Rainfall}
        onChange={(e)=>setRainfall(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(false)
      //     setPhosphorousFocus(false)
      //     setPotassiumFocus(false)
      //     setHumidityFocus(false)
      //     setTemperatureFocus(false)
      //     setRainfallFocus(true)
      //     setPhFocus(false)
      // }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="pH"
        value={pH}
        onChange={(e)=>setPH(e)}
      //   onFocus={() => {
      //     setNitrogenFocus(false)
      //     setPhosphorousFocus(false)
      //     setPotassiumFocus(false)
      //     setHumidityFocus(false)
      //     setTemperatureFocus(false)
      //     setRainfallFocus(false)
      //     setPhFocus(true)
      // }}
        keyboardType="numeric"
      />
      </View>
    </View>

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
    height: 250,
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