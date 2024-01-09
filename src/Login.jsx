import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { login } from './auth/auth';
import { Alert } from 'react-native';

export default function Login({ navigation }) {

    const [emailfocus, setEmailFocus]=useState(false);
    const [passwordfocus, setPassordFocus]=useState(false);
    const [showpassword, setShowPassword]=useState(false);
    const [ Email, setEmail] = useState("")
    const [Password, setPassword]= useState("")
    function showToast() {
        ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
    }

    const handlelogin=async()=>{
        const data=await login(Email,Password)
        if(data){
            navigation.navigate("Home")
        }
        else{
            Alert.alert("Authentication Failed")
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent'
                barStyle='light-content'
                color='white'
                hidden={false}
                translucent={true}
                networkActivityIndicatorVisible={true}
                showHideTransition='slide'
            />
            <Image source={require("../assets/farming.png")} style={{width:"100%",height:"20%",marginTop:50}}/>
            <Text className="font-bold" style={styles.head}>Log in</Text>
            <View style={styles.inputbox}>
                <AntDesign name="user" size={24} color={emailfocus===true?"red":"black"} />
                <TextInput style={styles.input} placeholder='Email'
                value={Email} 
                onChange={(e)=>setEmail(e)}
                    onFocus={()=>{
                        setEmailFocus(true)
                        setPassordFocus(false)
                        setShowPassword(false)
                    }}
                ></TextInput>
            </View>
            <View style={styles.inputbox}>
                <Feather name="lock" size={24} color={passwordfocus===true?"red":"black"} />
                <TextInput style={styles.input} placeholder='Password'
                value={Password}
                onChange={(e)=>setPassword(e)}
                onFocus={()=>{
                    setEmailFocus(false)
                    setPassordFocus(true)
                }}
                secureTextEntry={showpassword==false?true:false}
                ></TextInput>
                <Octicons name={showpassword==false?"eye-closed":"eye"} size={24} 
                onPress={()=>{
                    setShowPassword(!showpassword)
                }}></Octicons>
            </View>

            <TouchableOpacity  style={styles.btn} onPress={()=>navigation.navigate('Home')}>
              <Text style={{color:"white", fontSize:18}} onClick={handlelogin}>Register</Text>
            </TouchableOpacity>

            <Text style={{color:"grey"}}>Forgot Password </Text>
            <View className="flex w-screen flex-row items-center justify-center m-0 p-1">
                <Text style={{color:"#E9A11A", marginTop:10}}>New here?</Text>
                <Text className="font-bold" style={{color:"black", marginTop:10}} onPress={()=>navigation.navigate("Signup")}> Sign up</Text>
            </View>
            <Image className="absolute bottom-0 -z-30 opacity-10" source={require("../assets/farmbg.png")} style={{width:"100%",height:"50%"}}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#E9A11A",
        backgroundColor:"white",
        width: "100%",
        alignItems: "center",
        // justifyContent: "center",
    },
    head: {
        fontSize: 30,
        color: "#E9A11A",
        textAlign: "center",
        marginVertical: 40,
    },
    inputbox: {
        flexDirection: "row",
        width: "80%",
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: "80%",
    },
    btn: {
        fontSize: 20,
        color: "black",
        width:"80%",
        textAlign: "center",
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: "200",
        backgroundColor: "rgb(233, 161, 26)",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        alignItems:"center",
        justifyContent:"center",
        
      },

})
