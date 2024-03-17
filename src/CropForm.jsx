import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, Button, KeyboardAvoidingView, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';
import { Alert } from 'react-native';
import { recentCropForm, submitCrop } from './auth/recent';
import Checkbox from 'expo-checkbox';
import { useSelector } from 'react-redux';
import { updateProfile } from './auth/profileUpdate';
import back from "../assets/back.png";
import crop_json from './data/crop_json';
import RecentPredictedCrop from './comp/recentPredictedCrop';

export default function CropForm({ navigation }) {

  const [Cropname, setCropName] = useState("")
  const [Nitrogen, setNitrogen] = useState("");
  const [Phosphorous, setPhosphorous] = useState("");
  const [Potassium, setPotassium] = useState("");
  const [Humidity, setHumidity] = useState("");
  const [Temperature, setTemperature] = useState("");
  const [Rainfall, setRainfall] = useState("");
  const [pH, setPH] = useState("");
  const [isCheckedPrev, setisCheckedPrev] = useState(false);
  const [isCheckedCurr, setisCheckedCurr] = useState(false);
  const user_data = useSelector(state => state.value);
  const [cropData, setCropData] = useState([]);  // for getrecentcrop

  useEffect(() => {
    // to get crop history
    const getRecentCrop = async () => {
      const data = await recentCropForm(user_data.payload.token);
      console.log("crop data", data);
      if (data) {
        console.log("get soil (prev)", data.recentCrop);
        setCropData(data.recentCrop);
      }
    }
    getRecentCrop();

  }, [user_data.payload.token]);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  // to store all crop history
  const handleSubmit = async () => {
    if (Nitrogen != "" && Phosphorous != "" && Potassium != "" && Temperature != "" && Humidity != "" && Rainfall != "" && pH != "") {
      const data = await submitCrop(user_data.payload.token, Cropname, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH)
      if (data) {
        // navigation.navigate("Predict")
        Alert.alert(data);
      }
      else {
        Alert.alert("Failed")
      }
    }
    else {
      showToast("Please fill all the fields")
    }
  }


  // to store crop history as curr ie in profile
  const handleCropFormHistory = async () => {
    const data = await updateProfile(user_data.payload.token, user_data.payload.user.name, user_data.payload.user.mobile, user_data.payload.user.address, user_data.payload.user.kisanid, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH, user_data.payload.user.profileimage)
    // console.log("curr",data);
    if (data) {
      console.log("soil history set as curr", data);
    }
    else {
      console.log("failed adding curr");
    }
  }


  const getPrevData = async () => {
    // console.log("user ka data",user_data.payload.user);
    setCropName("");
    setNitrogen(`${user_data.payload.user.nitrogen}`);
    setPhosphorous(`${user_data.payload.user.phosphorous}`);
    setPotassium(`${user_data.payload.user.potassium}`);
    setHumidity(`${user_data.payload.user.humidity}`);
    setTemperature(`${user_data.payload.user.temperature}`);
    setRainfall(`${user_data.payload.user.rainfall}`);
    setPH(`${user_data.payload.user.ph}`);
  }

  const handleCurrCheck = (e) => {
    if (e) {
      handleCropFormHistory();
    }
    else return
  }

  const handlePrevCheck = (e) => {
    if (e) {
      // profile se get wali api
      getPrevData();
    }
    else handleRefresh();
  }

  const handleRefresh = () => {
    setCropName("");
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
        <Text className="text-2xl font-bold">Crop Form</Text>
        <View className="w-full flex-wrap flex flex-row items-center justify-start">
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
            placeholder="Crop Name"
            value={Cropname}
            onChangeText={(e) => setCropName(e)}
            keyboardType="default"

          />
          <TextInput
            style={styles.input}
            placeholder="Nitrogen"
            value={Nitrogen}
            onChangeText={(e) => setNitrogen(e)}
            keyboardType="numeric"

          />
          <TextInput
            style={styles.input}
            placeholder="Phophorous"
            value={Phosphorous}
            onChangeText={(e) => setPhosphorous(e)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Potassium"
            value={Potassium}
            onChangeText={(e) => setPotassium(e)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Humidity"
            value={Humidity}
            onChangeText={(e) => setHumidity(e)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Temperature"
            value={Temperature}
            onChangeText={(e) => setTemperature(e)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Rainfall"
            value={Rainfall}
            onChangeText={(e) => setRainfall(e)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="pH"
            value={pH}
            onChangeText={(e) => setPH(e)}
            keyboardType="numeric"
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
        <Button title='submit' color="#007F73" onPress={handleSubmit}>Submit</Button>
      </KeyboardAvoidingView>

      <ScrollView>
        {cropData.map((i, index) => {
          console.log("map",i);
          const filteredCrop = crop_json.some(crop => crop.name === i.crop)
          
          console.log("filter",filteredCrop);
          return (
            <RecentPredictedCrop
              key={index}
              crop={filteredCrop}
              data={i}
              setCropName={setCropName}
              setNitrogen={setNitrogen}
              setPhosphorous={setPhosphorous}
              setPotassium={setPotassium}
              setTemperature={setTemperature}
              setHumidity={setHumidity}
              setRainfall={setRainfall}
              setPH={setPH}
            />
          )
        })
        }
      </ScrollView>

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