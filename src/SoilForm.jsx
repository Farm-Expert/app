import { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, Button, KeyboardAvoidingView, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';
import { recentSoilForm, submitSoil } from './auth/recent';
import Checkbox from 'expo-checkbox';
import { useSelector } from 'react-redux';
import { updateProfile } from './auth/profileUpdate';
import back from "../assets/back.png";
import crop_json from './data/crop_json';

export default function SoilForm({navigation}) {
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

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  // to store all soil history
  const handleSubmit = async () => {
    if (Nitrogen != "" && Phosphorous != "" && Potassium != "" && Temperature != "" && Humidity != "" && Rainfall != "" && pH != "") {
    const data = await submitSoil(user_data.payload.token, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH)
    if (data) {
      showToast(data);
      handleRefresh();
    }
    else {
      showToast("Failed");
    }
  }
  }

  // to store soil history as curr ie in profile
  const handleSoilFormHistory = async () => {
    const data = await updateProfile(user_data.payload.token, user_data.payload.user.name, user_data.payload.user.mobile, user_data.payload.user.address,user_data.payload.user.kisanid, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH, user_data.payload.user.profileimage)
    console.log("curr",data);
    if(data){
      showToast(data);
    }
    else{
      showToast("failed adding soil history as current");
    }
  }

  // to get soil history
  const getRecentSoil = async () => {
    const data = await recentSoilForm(user_data.payload.token);
  }

  const getPrevData = async () => {
      setNitrogen(`${user_data.payload.user.nitrogen}`);
      setPhosphorous(`${user_data.payload.user.phosphorous}`);
      setPotassium(`${user_data.payload.user.potassium}`);
      setHumidity(`${user_data.payload.user.humidity}`);
      setTemperature(`${user_data.payload.user.temperature}`);
      setRainfall(`${user_data.payload.user.rainfall}`);
      setPH(`${user_data.payload.user.ph}`);
  }

  const handleCurrCheck=(e)=>{
    if(e){
      handleSoilFormHistory();
    }
    else return
  }

  const handlePrevCheck=(e)=>{
    if(e){
      getPrevData();
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
      <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-10">
            <Image source={back} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>

      <KeyboardAvoidingView className="flex w-full flex-wrap rounded-3xl flex-row items-center justify-center h-fit p-6 bg-white">
        <Text className="text-2xl font-bold">Soil Form</Text>
        <View className="w-full flex-wrap flex flex-row items-center justify-start">
          <Checkbox
            style={styles.checkbox}
            value={isCheckedPrev}
            onValueChange={(e) => {
              setisCheckedPrev(e);
              handlePrevCheck(e);
            }}
          />
          <Text className="text-xs">Fill from previous data</Text>
        </View>

        <View className="flex w-full flex-wrap flex-row items-center justify-center h-fit m-2">

          <TextInput
            style={styles.input}
            placeholder="Nitrogen"
            value={Nitrogen}
            onChangeText={(e) => setNitrogen(e)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Phophorous"
            value={Phosphorous}
            onChangeText={(e) => setPhosphorous(e)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Potassium"
            value={Potassium}
            onChangeText={(e) => setPotassium(e)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Humidity"
            value={Humidity}
            onChangeText={(e) => setHumidity(e)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Temperature"
            value={Temperature}
            onChangeText={(e) => setTemperature(e)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Rainfall"
            value={Rainfall}
            onChangeText={(e) => setRainfall(e)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="pH"
            value={pH}
            onChangeText={(e) => setPH(e)}
            keyboardType="number-pad"
          />
        </View>
        <View className="w-full flex-wrap flex flex-row items-center justify-center">
          <Checkbox
            style={styles.checkbox}
            value={isCheckedCurr}
            onValueChange={(e) => {
              setisCheckedCurr(e);
              handleCurrCheck(e);
            }}
          />
          <Text style={styles.paragraph}>Add this soil information as my current information</Text>
        </View>
        <Button title='submit' color="#007F73" onPress={handleSubmit}>Submit</Button>
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