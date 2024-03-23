import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { add, addProfileimage } from '../redux/Auth';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    }
}


export default function Loading({navigation}) {
    const dispatch=useDispatch();
    const autoLogin=async()=>{
        const token=await getValueFor("token")
        if(token!=null){
            let data=await getValueFor("user")
            data=JSON.parse(data)
            dispatch(add(data));
            const profileIMG=await getValueFor("profile_img")
            if(profileIMG!=null){
                dispatch(addProfileimage(profileIMG));
            }

            navigation.navigate("Home")
        }
        else{
            navigation.navigate("Login")
        }
    }

    useEffect(() => {
        autoLogin()
    }
    , [])
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text>Loading...</Text>
     </View>
  );
}
