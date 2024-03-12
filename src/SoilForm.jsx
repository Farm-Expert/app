import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, Button } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';
import { Alert } from 'react-native';
import { submitSoilForm } from './auth/recent';
export default function SoilForm() {
  const [Nitrogen, setNitrogen] = useState("");
  const [Phosphorous, setPhosphorous] = useState("");
  const [Potassium, setPotassium] = useState("");
  const [Humidity, setHumidity] = useState("");
  const [Temperature, setTemperature] = useState("");
  const [Rainfall, setRainfall] = useState("");
  const [pH, setPH] = useState("");
  const handlesoilform = async () => {
    const data = await submit(Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH)
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
        <Image source={img} className="h-full w-screen m-4 p-4" style={styles.img} />
      </View>

      <View className="flex w-full flex-wrap rounded-3xl flex-row items-center justify-center h-fit p-6 m-5 bg-white">
        <TextInput
          style={styles.input}
          placeholder="Nitrogen"
          value={Nitrogen}
          onChange={(e) => setNitrogen(e)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Phophorous"
          value={Phosphorous}
          onChange={(e) => setPhosphorous(e)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Potassium"
          value={Potassium}
          onChange={(e) => setPotassium(e)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Humidity"
          value={Humidity}
          onChange={(e) => setHumidity(e)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Temperature"
          value={Temperature}
          onChange={(e) => setTemperature(e)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Rainfall"
          value={Rainfall}
          onChange={(e) => setRainfall(e)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="pH"
          value={pH}
          onChange={(e) => setPH(e)}
          keyboardType="numeric"
        />
        {/* <Button color="secondary">Secondary</Button> */}
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
});