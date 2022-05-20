import { useEffect, useState } from 'react'
import { downloadPdf } from '../utils/download';
import { View, Text, StyleSheet, ScrollView ,TouchableOpacity} from 'react-native'
import {React_App_Server} from "@env"
import { ActivityIndicator } from 'react-native';
function handleClick(regNo){
    downloadPdf(regNo);
}
export default function About({Name,phone,Addr,Rating,CertCar}) {
  const [certfiedCars,setCertifiedCars]=useState(null);
  useEffect(()=>{
    fetch(`http://${React_App_Server}:5000/api/mechanic/certified_vehicles`,{
        method:"GET",
        credentials:"include",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>response.json()).then(data=>{
        if(data.length==0)
        setCertifiedCars(0);
        else
        setCertifiedCars(data);
    }).catch(e=>{
        console.log(e+"dcvwev")
    })
  },[Name])
  let list=[];
  if(certfiedCars!=null)
  if(certfiedCars==0){
        list=(<Text>You have not certified any cars yet!</Text>)
  }
  else
   list=certfiedCars.map(certfiedCar=>{
      return(
      <TouchableOpacity onLongPress={()=>handleClick(certfiedCar.VehicleRegNo)} key={certfiedCar.VehicleRegNo} style={styles.list}>
          <Text style={styles.listText}>
          {certfiedCar.VehicleRegNo}
          </Text>
      </TouchableOpacity>)
  })
    return (
       <View style={styles.container}>
            <View style={styles.tiles}>
                <ScrollView horizontal={true}>
                    <View style={styles.cell}>
                        <Text style={styles.cellName}>Name</Text>
                        {
                        Name!=''?
                        <Text style={styles.cellValue}>{Name}</Text>
                        :
                        <ActivityIndicator size="small" color="#0000ff"/>
                        }
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellName}>Contact#</Text>
                        {
                        phone!=''?
                        <Text style={styles.cellValue}>{phone}</Text>
                        :
                        <ActivityIndicator size="small" color="#0000ff"/>
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={styles.tiles}>
                <ScrollView horizontal={true}>
                    <View style={styles.cell}>
                        <Text style={styles.cellName}>Shop Address</Text>
                        {
                        Addr!=''?
                        <Text style={styles.cellValue}>{Addr}</Text>
                        :
                        <ActivityIndicator size="small" color="#0000ff"/>
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={styles.tiles}>
                <ScrollView horizontal={true}>
                    <View style={styles.cell}>
                        <Text style={styles.cellName}>Rating</Text>
                        <Text style={styles.cellValue}>{Rating || "--"}</Text>
                    </View>
                    <View style={styles.cell} >
                        <Text style={styles.cellName}>No.of cars Certified</Text>
                        {
                        CertCar!=''?
                        <Text style={styles.cellValue}>{CertCar}</Text>
                        :
                        <ActivityIndicator size="small" color="#0000ff"/>
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={styles.reports}>
            
               
            <Text style={styles.Heading} >Share Your Certification Reports</Text>
                <Text style={styles.hint}>(Hold to Share)</Text>
                <ScrollView>
                    {list.length!=0?list:
                    <ActivityIndicator size="large" color="#0000ff"/>
                    }
                </ScrollView>
            </View>
        
        </View>

)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "pink"
        , flexDirection: "column",
        justifyContent: "flex-start"
    },
    tiles: {
        marginTop:10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    cell: {

        flexDirection: "row",
        alignItems: "center"
    }
    , cellValue: {
        fontSize: 20,
        fontWeight: "900",
        backgroundColor: "white",
        padding: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    hint:{
        fontSize:9,
        color:"blue",
        alignSelf:"center"
    },
    list:{
        marginBottom:5,
        borderTopRightRadius:5,
        borderBottomLeftRadius:5,
        backgroundColor:"teal",
        color:"white",
        fontSize:16,
        elevation:2,
        padding:2,
        flexDirection:'row',
        justifyContent:"center"
    },
    listText:{
        color:"white",
        fontSize:16,
        fontWeight:"bold"
    },
    cellName: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        color: "white",
        borderRadius: 5,
        backgroundColor: "teal",
        fontSize: 20,
        fontWeight: "bold",
        padding: 10
    },
    reports: {
        flex: 1,
        padding:2,
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    }, Heading: {
        fontSize: 20,
        alignSelf: "center",
        padding: 5
    }

})