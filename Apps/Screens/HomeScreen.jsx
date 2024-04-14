import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../../firebaseConfig';

export default function HomeScreen() {

  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([])

  useEffect(() => {
    getSliders();
  }, [])  

  const getSliders = async () => {
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
    setSliderList(sliderList=>[...sliderList, doc.data()])
});
  }
  return (
    <View className="py-12 px-6 bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList}/>
    </View>
  )
}