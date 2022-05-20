import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity ,ImageBackground,Image} from 'react-native';
import {React_App_Server} from "@env"
import { useEffect } from 'react';
export default function Login({navigation,loggedin,setlogin}){
    const [CNIC,setCNIC]=useState("");
    const [pw,setPw]=useState("");
    useEffect(()=>{
      console.log("here",loggedin)
      if(loggedin)
      navigation.replace("Home");
    },[loggedin])
    
    function handleSubmit(){
      console.log(CNIC," ",pw)
      if(CNIC!=''&&pw!='')
      {
        fetch(`http://${React_App_Server}:5000/api/mechanic/login`,{
          method:"POST",
          mode:"cors",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({CNIC,password:pw})
        }).then(res=>res.json()).then(response=>{
          if(response.status==true)
          {
            setlogin(true);
          }
          else{
            Alert.alert("Invalid Credentials",response.message);
          }
        }).catch(err=>{
          Alert.alert("Error",err.message);
        })
      }
    }  
    
    return(
        <View style={styles.Base}>
        <View style={styles.heading}>
      <Image style={{width:"20%",height:"100%"}} source={require('../assets/bg.jpg')}/>
      
      <Text style={styles.welcomeText} >Welcome Mechanic</Text>
      </View>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
       onChangeText={(CNIC)=>{setCNIC(CNIC)}}
          placeholder='CNIC '
          placeholderTextColor='#808e9b'
          style={styles.input}
          autoCorrect={true}
          keyboardType='numeric'
        
        />
        <TextInput
        
       onChangeText={(pw)=>{setPw(pw)}}
          placeholder='Password'
          placeholderTextColor='#808e9b'
          style={styles.input}
          secureTextEntry={true}
          textContentType='password'
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} >
          <Text style={styles.buttonText} >Login</Text>
        </TouchableOpacity>
        </View>
    )
}
const styles=new StyleSheet.create(
    {   Base:{
          padding:10,
          flex:1,
          justifyContent:"center",
          backgroundColor:"white"
        },
        heading:{
            padding:0,
            height:'12%',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
          },
          welcomeText: {
            alignSelf:'center',
            color: "teal",
            fontSize: 30,
            fontWeight: '900'
          },
          loginText: {
          
            color: "teal",
            fontSize: 25,
            fontWeight: '900'
          },input: {
            borderColor:"teal",
            borderLeftWidth:5,
            borderRightWidth:5,
            borderTopWidth:2,
            borderBottomWidth:2,
            width: '100%',
            height: 50,
            backgroundColor: '#fff',
            borderRadius: 6,
            marginTop: 10,
            paddingHorizontal: 10,
            fontSize: 16,
            color: '#000',
          },
          loginButton:{
            padding:10,
            marginTop:20,
            width:'100%',
            backgroundColor:'teal',
            borderRadius:6
          },
          buttonText:{
            color:"#fff",
            marginLeft:'auto',
            marginRight:"auto"
            ,fontSize:15,
            fontWeight:'900'
          },
          loginContainer:{
          
            backgroundColor:'teal',
            padding:15,
            marginTop:20,
            marginBottom:'auto',
            borderRadius:6,
            elevation:20
         
    }})