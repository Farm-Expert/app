import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, ToastAndroid, Button } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/lead_disease.png';
import back from "../assets/back.png"
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase/firebaseconfig';
import { ActivityIndicator } from 'react-native';

const Plant_Disease = ({ navigation }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const handleUpload = async () => {
    // const data = await submitDisease(user_data.payload.token, imgSrc)
    // if (data) {
      console.log(imgSrc,"Plant Disease");
      navigation.navigate("PredictDisease",{img: imgSrc})
      
    //   Alert.alert(data)
    // }
    // else {
    //   Alert.alert("Failed")
    // }
  }
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access media library denied');
      }
    })();
  }, []);

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        const { uri } = assets[0];
        console.log(uri);
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, (`plant_disease/${Date.now()}.png`));
        try {
          await uploadBytes(storageRef, blob);
          showToast('Image uploaded successfully!');
          const img_URL = await getDownloadURL(storageRef);
          setImgSrc(img_URL);
} catch (error) {
          console.error('Error uploading image:', error.message);
        }
      }
    }
    setLoading(false); 
  };

  const upload_image = async () => {
    if (imgSrc) {
      // logic to send image to backend
      showToast('Image uploaded successfully!');
      setImgSrc(null);
    } else {
      showToast('Please upload an image to get started!');
    }
  };

  return (
    <ImageBackground source={bgimage} style={styles.backgroundImage}>
        {loading &&<View className="absolute mt-10 z-50 w-screen h-screen flex items-center justify-center" style={{backgroundColor:"#00000060"}}><ActivityIndicator size="large" color="#0000ff" /></View>}
      <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
        <Image source={img} className="h-full w-screen m-4 p-4" style={styles.img} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-10"
      >
        <Image source={back} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <Text className="text-2xl text-white font-bolder text-center">
        Plant Disease Prediction
      </Text>
      <View style={{ height: 20 }}></View>

      {imgSrc && <Image source={{ uri: imgSrc }} style={styles.uploadedImage} />}
      {!imgSrc && (
        <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
          <Text className="text-black absolute font-bold z-30">Click to open camera</Text>
        </TouchableOpacity>
      )}

      <View style={{ margin: 20 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.uploadButton}
          onPress={upload_image}
        >
          <Text className="text-xl font-bold text-white text-center" title="upload" onPress={handleUpload}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 mt-4, rounded-tl-xl rounded-tr-xl" style={{backgroundColor:"#ffffff70"}}>
        <View className="flex w-screen items-center justify-center">
          <Text className="text-white font-bold text-2xl text-center p-3">How to use?</Text>
          <Text className="text-white text-center p-3">Click on the sqr to open camera and capture the image of the plant leaf. The image will be uploaded and processed to predict the disease.</Text>
          <Text className="text-white text-center p-3">Upload plant leaf photo to get information about it</Text>
          <Text className="text-white text-center text-lg p-1">What all you get?</Text>
          <Text className="text-white text-center"> Information about the disease.</Text>
          <Text className="text-white text-center"> How to cure the disease.</Text>
          <Text className="text-white text-center"> How to prevent the disease.</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 30,
    alignItems: 'center',
  },
  img: {
    height: 180,
    width: 400,
    resizeMode: 'contain',
  },
  cameraButton: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  uploadButton: {
    backgroundColor: '#6d9eeb',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default Plant_Disease;