import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import { Provider } from "react-redux";
import Store from './redux/Store';
import Profile from './src/Profile';
import Predict from './src/Predict';
import SoilForm from './src/SoilForm';
import CropForm from './src/CropForm';
import Login from './src/Login';
import Signup from './src/Signup';
import Plant_Disease from './src/Plant_Disease';
import ChatScreen from './src/chatbot';
import PredictDisease from './src/PredictDisease';
import PricePredict from './src/PricePredict';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import Loading from './src/Loading';
const Stack = createNativeStackNavigator();


export default function App() {
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    }
  }
  const [token, setToken] = useState("loading");
  const [profileIMG, setProfileIMG] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = await getValueFor("token");
      if (token != null) {
        let data = await getValueFor("user");
        data = JSON.parse(data);
        setUser(data);
        const profileIMG = await getValueFor("profile_img");
        setProfileIMG(profileIMG);
        setToken(token);
      }
      else {
        setToken(null);
      }
    }
    fetchData();
  }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Predict" component={Predict} options={{ headerShown: false }} />
          <Stack.Screen name="Soil" component={SoilForm} options={{ headerShown: false }} />
          <Stack.Screen name="Crop" component={CropForm} options={{ headerShown: false }} />
          <Stack.Screen name="disease" component={Plant_Disease} options={{ headerShown: false }} />
          <Stack.Screen name="price" component={PricePredict} options={{ headerShown: false }} />
          <Stack.Screen name="chatbot" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PredictDisease" component={PredictDisease} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

