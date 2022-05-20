import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useState } from 'react';
import { createContext } from 'react';
import Login from './components/login';
import Home from './components/Home';
import { Icon } from 'react-native-elements';
import { LoginContext } from './context';
const Stack = createNativeStackNavigator();
function Logout(setlogin) {
  return (
    <TouchableOpacity onPress={
      () => {
        setlogin(false);
      }}>


      <Icon
        name='sign-out'
        type='font-awesome'
        color="white"
        size={25}
      />
    </TouchableOpacity>
  )
}
export default function App() {

  const [loggedin, setlogin] = useState(false);
  return (

    <LoginContext.Provider value={loggedin}>
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerTitleAlign: "center", headerStyle: styles.header, headerTintColor: "#fff", headerTitleStyle: styles.title}}>
          {props => <Login {...props} setlogin={setlogin} loggedin={loggedin} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={Home}  options={{headerTitleAlign: "center", headerStyle: styles.header, headerTintColor: "#fff", headerTitleStyle: styles.title, headerRight:()=>Logout(setlogin) }} />
      </Stack.Navigator>
    </NavigationContainer>
</LoginContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  header: {
    backgroundColor: "teal",

  }
  , title: {

    justifyContent: "center",
    fontWeight: 'bold',
  }

});
