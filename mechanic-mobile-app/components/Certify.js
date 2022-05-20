import { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import {React_App_Server} from "@env"
import { Icon } from 'react-native-elements'
function AttributeInput({ rate, setRating, name }) {
    return (
        <View style={{ marginTop: 20, backgroundColor: "white", borderRadius: 5, padding: 5 }}>
            <Text style={style.attrHeading}>{name}</Text>
            <View style={style.InputContainer}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Rating</Text>
                <View style={style.rating}>
                    <Icon reverse
                        name='add-circle'
                        type='ionicicon'
                        color='#00f'
                        onPress={() => {
                            if (rate.rating < 10)
                                setRating({ rating: rate.rating + 1, comment: rate.comment })
                        }}
                    />
                    <TextInput style={style.input} defaultValue='' value={rate.rating.toString()} placeholder='1-10' keyboardType='numeric' maxLength={2} />
                    <TouchableOpacity>
                        <Icon reverse
                            name='remove-circle'
                            type='ionicicon'
                            color='#f00'
                            onPress={() => {
                                console.log(rate)
                                if (rate.rating > 0)
                                    setRating({ ...rate, rating: rate.rating - 1 })
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput multiline onChangeText={(val) => { setRating({ ...rate, comment: val }) }} value={rate.comment} returnKeyType="next" autoCapitalize="words" placeholder='comments if any ...' />
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
        </View>
    )
}

export default function Certify({mechanicName,phone,cnic}) {
    const [name,SetName]=useState("");
    const [RegNo, setRegNo] = useState("");
    const [hl, setHl] = useState({ rating: 8, comment: "" });  //headlight
    const [Fbumper, setFBumper] = useState({ rating: 8, comment: "" });  //forntBumpper
    const [Rbumper, setRBumper] = useState({ rating: 8, comment: "" });  //RearBumpper
    const [DashBoard, setDashBoard] = useState({ rating: 8, comment: "" });  //DashBoard
    const [Tyers, setTyers] = useState({ rating: 8, comment: "" });  //Tyers
    const [Engine, setEngine] = useState({ rating: 8, comment: "" });  //Engine
    const [Body, setBody] = useState({ rating: 8, comment: "" });  //Body
    const [Paint, setPaint] = useState({ rating: 8, comment: "" });  //Paint
    const [Seats, setSeats] = useState({ rating: 8, comment: "" });  //Seats
    const [Suspension, setSuspension] = useState({ rating: 8, comment: "" });  //Suspension
    const [Wiper, setWiper] = useState({ rating: 8, comment: "" });  //Wipers
    const [Controls, setControls] = useState({ rating: 8, comment: "" });  //Controls
    return (
        <View style={style.Container}>
            <Text style={style.Heading}>Vehicle Inspection</Text>
            <View style={style.form}>
                <TouchableOpacity style={style.button} onPress={handleSubmit} >
                    <Text style={style.btext} >Submit</Text>
                </TouchableOpacity>

                <TextInput style={style.input} onChangeText={(val) => { SetName(val) }} value={name} returnKeyType="next" autoCapitalize="words" placeholder='Car name' />
                <TextInput style={style.input}  onChangeText={(val) => { setRegNo(val) }} value={RegNo} returnKeyType="next" autoCapitalize="words" placeholder='Car registeration # ' />
            
                <ScrollView>
                    <AttributeInput rate={hl} setRating={setHl} name="Headlights" />
                    <AttributeInput rate={Fbumper} setRating={setFBumper} name="Front Bumper" />
                    <AttributeInput rate={Rbumper} setRating={setRBumper} name="Rear Bumper" />
                    <AttributeInput rate={DashBoard} setRating={setDashBoard} name="Dashboard" />
                    <AttributeInput rate={Tyers} setRating={setTyers} name="Tyers" />
                    <AttributeInput rate={Engine} setRating={setEngine} name="Engine" />
                    <AttributeInput rate={Body} setRating={setBody} name="Body" />
                    <AttributeInput rate={Paint} setRating={setPaint} name="Paint" />
                    <AttributeInput rate={Seats} setRating={setSeats} name="Seats" />
                    <AttributeInput rate={Suspension} setRating={setSuspension} name="Suspension" />
                    <AttributeInput rate={Wiper} setRating={setWiper} name="Wiper" />
                    <AttributeInput rate={Controls} setRating={setControls} name="Controls" />
                </ScrollView>

            </View>
        </View>
    )
    function handleSubmit() {
        if(name==""||RegNo==""){
            Alert.alert("Oh!oh","You must enter car name and registeration number")
            return false
        }
        const attributes = {
            HeadLights: hl,
            DashBoard: DashBoard,
            FrontBumper: Fbumper,
            RightBumper:Rbumper,
            Tyers:Tyers,
            Engine,
            Body,
            Paint,
            Seats,
            Suspension,
            Wiper,
            Controls
        }
        const request = {
            regNo: RegNo,
            carName:name,
            CNIC:cnic,
            mechanicName: mechanicName,
            mechanicPhone:phone,
            attributes
        }
        fetch(`http://${REACT_APP_Server}:5000/api/mechanic/generateReport`,{
            method:"POST",
            mode:'cors',
            headers:{
                "Content-Type":"application/json"
            },
         body:JSON.stringify(request)
        }).then(response=>response.json()).then(data=>{
            Alert.alert("Success",data);
        }).catch(e=>console.log("error"+e))
    }
}
const style = StyleSheet.create({
    Container: {
        padding: 5,
        flex: 1,
    },
    button: {
        backgroundColor: "white",
        borderRadius: 2,
        borderBottomWidth: 5,
        borderBottomColor: "teal"
    },
    btext: {
        textAlign: "center",
        fontSize: 16,
        color: "black"
    },
    Heading: {
        alignSelf: "center",
        color: 'teal',
        fontSize: 25,
        fontWeight: "bold",
    }
    , rating: {

        flexDirection: "row"
    }
    , form: {
        flex: 1,
        backgroundColor: "teal",
        padding: 0,
        paddingTop: 5,
        borderRadius: 6,
        borderWidth: 1,
    }, InputContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },

    input: {
        borderBottomColor:"teal",
        borderBottomWidth:2,
        marginTop:2,
        backgroundColor:"white",
        borderWidth: 0,
        fontSize: 20,
        paddingLeft: 23,
        borderRadius: 6,
    },
    attrHeading: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black',
        textDecorationLine: 'underline'
    }
})