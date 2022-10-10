import React, { useState,useEffect } from 'react'
import { Alert, PermissionsAndroid, Platform, Text, TouchableHighlight, View,Image, ScrollView} from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';

const CameraPage = () => {
  const [isPermitted,setIsPermitted] = useState(false)
  const [captureImages,setCaptureImages] = useState([])

  const requestCameraPermission = async()=>{
    try{
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
        title:'Camera Permission deu',
        message:'Photo khichna permission chaiyo.'
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }catch(error){
      console.log(error)
      return false
    }
  }

  const requestExternalWritePermission = async()=>{
    try{
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
        title:'External Storage Write Permission',
        message:'App needs write permission'
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }catch(error){
      console.log(error)
      return false
    }
  }

  const requestExternalReadPermission = async()=>{
    try{
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,{
        title:'External Storage Read Permission',
        message:'App needs read storage permission'
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }catch(error){
      console.log(error)
      return false
    }
  }

  const openCamera = async()=>{
    if(Platform.OS === 'android'){
      if (await requestCameraPermission()){
        if( await requestExternalReadPermission()){
          if( await requestExternalWritePermission()){
            setIsPermitted(true)
          }else{alert('READ_EXTERNAL_STORAGE permission denied')}
        }else{alert('WRITE_EXTERNAL_STORAGE  permission denied')}
      }else{alert('CAMERA permission denied') }
    }else{setIsPermitted(true) }
  }

  const onCapturePressed = event=>{
    const images = JSON.stringify(event.captureImages)
    if(event.type === 'left'){setIsPermitted(false)}
    else if(event.type === 'right'){setIsPermitted(false); setCaptureImages(event.captureImages);}
    else{
      setCaptureImages(event.captureImages)
      // Alert.alert(event.type,images,[{text:'Ok',onPress:()=>console.log('images',images)}],{cancelable:false})
    }
  }

  return (
    <View style={{flex:1}}>
    {
      isPermitted ?(
        <View style={{flex:1}}>
          <CameraScreen style={{flex:1}} actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          onBottomButtonPressed={(event)=>onCapturePressed(event)}
          flashImages = {{
            on:require('../../assets/images/on-flash.png'),
            off:require('../../assets/images/off-flash.png'),
            auto:require('../../assets/images/auto-flash.png')
          }}
          captureButtonImage={require('../../assets/images/camera.png')}
          torchOnImage={require('../../assets/images/on-flash.png')}
          />
        </View>
      ):(
        <View>
          <TouchableHighlight onPress={openCamera} style={{alignItems:'center',backgroundColor:'#ddd',padding:10}}>
            <Text>Open Camera</Text>
          </TouchableHighlight>
          <ScrollView>
          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
          {captureImages.length>0 && captureImages.map((image,index)=>{
            return(
              <View style={{padding:2}} key={index} ><Image  style={{height:200,width:200}} source={{ uri: image.uri,}}/></View>
            )})}
            </View>
            </ScrollView>
        </View>
      )
    }
    </View>
  )
}

export default CameraPage