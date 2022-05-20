import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Certify from './Certify';
import { React_App_Server } from "@env";
import About from './AboutMe';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context';
const Tab = createMaterialTopTabNavigator();

export default function Home({navigation}) {
    const [Name, SetName] = useState("");
    const [phone, SetPhone] = useState("");
    const [Addr, SetAddr] = useState("");
    const [Rating, SetRating] = useState("");
    const [CertCar,SetCertCars]=useState("");
    const [cnic,SetCnic]=useState("");
    let loggedin=useContext(LoginContext);
    useEffect(()=>{
        if(!loggedin)
            navigation.replace("Login");
        else
            fetch(`http://${React_App_Server}:5000/api/mechanic/mechanic/info`, {
                method: "GET",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
    
            }).then(res => res.json()).then(data => {
                SetName(data.full_name);
                SetPhone(data.contact_no);
                SetAddr(data.location);
                SetCnic(data.CNIC);
                SetCertCars(data.certifiedVehicles)
            }).catch(e => {
                console.log(e);
            })
    },[loggedin])
    return (
        <Tab.Navigator>
            <Tab.Screen name="certify"  >
            {props=><Certify mechanicName={Name} phone={phone} cnic={cnic} />}
            </Tab.Screen>
            <Tab.Screen name="AboutMe"  >
           { props=><About Name={Name} phone={phone}  Addr={Addr} Rating={Rating} CertCar={CertCar} />}
            </Tab.Screen>
        </Tab.Navigator>
        // <View style={styles.container}>
        //     <Text >Home</Text>
        // </View>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            color: "white"
        }
    }
)