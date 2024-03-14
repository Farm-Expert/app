import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, Button } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';
import { Alert } from 'react-native';
import { recentSoilForm, submitSoil } from './auth/recent';
import Checkbox from 'expo-checkbox';
import { useSelector } from 'react-redux';
import { updateProfile } from './auth/profileUpdate';
import Scroll from './comp/Scroll';

export default function SoilForm() {
  const [Nitrogen, setNitrogen] = useState("");
  const [Phosphorous, setPhosphorous] = useState("");
  const [Potassium, setPotassium] = useState("");
  const [Humidity, setHumidity] = useState("");
  const [Temperature, setTemperature] = useState("");
  const [Rainfall, setRainfall] = useState("");
  const [pH, setPH] = useState("");
  const [isCheckedPrev, setisCheckedPrev] = useState(false);
  const [isCheckedCurr, setisCheckedCurr] = useState(false);
  const user_data=useSelector(state => state.value);

  // to store all soil history
  const handleSubmit = async () => {
    const data = await submitSoil(user_data.payload.token, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH)
    if (data) {
      // navigation.navigate("Predict")
      Alert.alert(data)
    }
    else {
      Alert.alert("Failed")
    }
  }

  // to store soil history as curr ie in profile
  const handleSoilFormHistory = async () => {
    const data = await updateProfile(user_data.payload.token, user_data.payload.user.name, user_data.payload.user.mobile, user_data.payload.user.address,user_data.payload.user.kisanid, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH)
    // console.log("curr",data);
    if(data){
      console.log("soil history set as curr",data);
    }
    else{
      console.log("failed adding curr");
    }
  }

  // to get soil history
  const getRecentSoil = async () => {
    const data = await recentSoilForm(user_data.payload.token);
    // console.log("get",data);
    // console.log("nit",data.nitrogen);
    if(data){
      console.log("get soil (prev)",data);
      setNitrogen(data.nitrogen);
      setPhosphorous(data.phosphorous);
      setPotassium(data.potassium);
      setHumidity(data.humidity);
      setTemperature(data.temperature);
      setRainfall(data.rainfall);
      setPH(data.ph);
    }
  }

  const getPrevData = async () => {
      setNitrogen(Number(user_data.payload.user.nitrogen));
      setPhosphorous(Number(user_data.payload.user.phosphorous));
      setPotassium(Number(user_data.payload.user.potassium));
      setHumidity(Number(user_data.payload.user.humidity));
      setTemperature(Number(user_data.payload.user.temperature));
      setRainfall(Number(user_data.payload.user.rainfall));
      setPH(Number(user_data.payload.user.ph));
  }

  const handleCurrCheck=(e)=>{
    if(e){
      // submit soil store wali api
      handleSoilFormHistory();
    }
    else return
  }

  const handlePrevCheck=(e)=>{
    if(e){
      // profile se get wali api
      getPrevData();
      // getRecentSoil();
    }
    else handleRefresh();
  }

  const handleRefresh = ()=>{
    setNitrogen("");
    setPhosphorous("");
    setPotassium("");
    setHumidity("");
    setTemperature("");
    setRainfall("");
    setPH("");
  }

  return (
    <ImageBackground
      source={bgimage}
      style={styles.backgroundImage}
    >

      <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
        <Image source={img} className="h-full w-screen m-4 p-4" style={styles.img} />
      </View>

      <View className="flex w-full flex-wrap rounded-3xl flex-row items-center justify-center h-fit p-6 bg-white">

        <View className="w-full flex-wrap flex flex-row items-center justify-end">
          <Checkbox
            style={styles.checkbox}
            value={isCheckedPrev}
            onValueChange={(e) => {
              setisCheckedPrev(e);
              handlePrevCheck(e);
            }}
          // color={isChecked ? '#4630EB' : undefined}
          />
          <Text className="text-xs">Fill from previous data</Text>
        </View>

        <View className="flex w-full flex-wrap flex-row items-center justify-center h-fit m-2">

          <TextInput
            style={styles.input}
            placeholder="Nitrogen"
            value={Nitrogen}
            onChangeText={(e) => setNitrogen(e)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Phophorous"
            value={Phosphorous}
            onChangeText={(e) => setPhosphorous(e)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Potassium"
            value={Potassium}
            onChangeText={(e) => setPotassium(e)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Humidity"
            value={Humidity}
            onChangeText={(e) => setHumidity(e)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Temperature"
            value={Temperature}
            onChangeText={(e) => setTemperature(e)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Rainfall"
            value={Rainfall}
            onChangeText={(e) => setRainfall(e)}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="pH"
            value={pH}
            onChangeText={(e) => setPH(e)}
            keyboardType="default"
          />
        </View>
        <View className="w-full flex-wrap flex flex-row items-center justify-center">
          <Checkbox
            style={styles.checkbox}
            value={isCheckedCurr}
            onValueChange={(e) => {
              setisCheckedCurr(e);
              handleCurrCheck(e); // Call your function when the value changes
            }}
          // color={isChecked ? '#4630EB' : undefined}
          />
          <Text style={styles.paragraph}>Add this soil information as my current information</Text>
        </View>
        <Button title='submit' color="#007F73" onPress={handleSubmit}>Secondary</Button>
      </View>

      {/* <Scroll/> */}

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
    width: 400,
    resizeMode: "contain"
  },
  input: {
    height: 40,
    margin: 12,
    borderColor: "gray",
    width: "40%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  paragraph: {
    fontSize: 10.5,
  },
  checkbox: {
    margin: 8,
    width: 15,
    height: 15
  },
});