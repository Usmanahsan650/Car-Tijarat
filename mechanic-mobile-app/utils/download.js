import * as FileSystem from 'expo-file-system';

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from "expo-sharing";
import {React_App_Server} from "@env";
import { Alert } from 'react-native';
const uri=`http://${React_App_Server}:5000/static/reports/`;
export async function downloadPdf(regNo){
const fileUri = `${FileSystem.documentDirectory}${regNo}.pdf`;
const downloadedFile= await FileSystem.downloadAsync(uri+regNo+".pdf", fileUri);
if (downloadedFile.status != 200) {
  
   console.log(downloadedFile);
}

Alert.alert("Success","Report fetched and is ready to be shared",
[
   {
      text: "Share",
      onPress: () => shareFile(fileUri,regNo),
    },
    { text: "Close",style:"cancel" }
])

// console.log(downloadedFile)
}

async function shareFile(fileUri,fileName){

     const UTI = 'public.item';
     const shareResult = await Sharing.shareAsync(fileUri, {UTI});
   
}
async function downloadLocal(fileUri){
   
   const { status } = await MediaLibrary.requestPermissionsAsync();
if (status != 'granted') {
  return;
}

try {
  const asset = await MediaLibrary.createAssetAsync(fileUri);
  const album = await MediaLibrary.getAlbumAsync('Download');
  if (album == null) {
    await MediaLibrary.createAlbumAsync('Download', asset, false);
  } else {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
  }
} catch (e) {
  console.log(e);
}
}