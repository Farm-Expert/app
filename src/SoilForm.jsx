import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, Button } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/farming2.png';

export default function SoilForm() {
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
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Phophorous"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Potassium"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Humidity"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Temperature"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Rainfall"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="pH"
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