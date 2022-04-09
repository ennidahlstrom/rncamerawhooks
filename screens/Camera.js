import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, LogBox} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import TextRecognition from 'react-native-text-recognition';// <- npm install react-native-text-recognition@ml 
                                                            // !!! Without @ml this doesn't work


export default function Camera({navigation, route}) {
  const [imagePath,setImagePath] = useState(null);
  const [{cameraRef},{takePicture}] = useCamera(null);
  const [detectedCode, SetDetectedCode] = useState(null);
  const [scanning, setScanning] = useState(false);

    useEffect(() => {
        // Not showing this popup warning when opening camera-screen on a real phone (still visible in console)
        LogBox.ignoreLogs([ 
            "ViewPropTypes will be removed",
        ])
    },[])
  
// User takes a picture and the path to said image is saved
  const captureHandle = async () => {
    try {
      // if a code was detected during a previous scan, its value is nullified upon a new scan
      SetDetectedCode(null); 
      setScanning(true);
      const data = await takePicture({fixOrientation: true});
      setImagePath(data.uri)
    } catch (e) {
      alert(e);
    }
  }

  // Text recognition done after a new image has been taken
  useEffect(() => {
    (async () => {    
      if (imagePath) {
            try {

            // NO TEXT DETECTED
            const result = await TextRecognition.recognize(imagePath);
            if (result.length === 0) {
              alert('Error. Nothing detected. Please try again.');
              setScanning(false);
              return;
            }

            // TEXT DETECTED

            // Result quality and format from TextRecognition varies, so the result needs to be cleaned up
            const sections1 = result.toString().split(/\r?\n/); // Splitting results if there is a line break
            const sections2 = sections1.toString().split(" ");  // Splitting results if there is a space
            const sections3 = sections2.toString().split(",");  // Splitting results if there is a comma

            // Making a new array with values of appropriate lengths to avoid false readings
            const arrayOf4s = [];

            // Another new array is made to compile all suitable code options
            const arrayOfCodes = []; 
              

            // Going through the sections after cleanup; Searching for 4-character values
            for (let i = 0; i < sections3.length; i++) {

              // If a value has length of 4, it is added to another array
              if (sections3[i].toString().length === 4) { 
                arrayOf4s.push(sections3[i]);
              }
            }

            // This new array of only 4-character values is then tested to see if they contain numbers or letters
            for (let i = 0; i < arrayOf4s.length; i++) {
              if (!isNaN(Number(arrayOf4s[i]))) {
                arrayOfCodes.push(arrayOf4s[i]); // 4-character numerical values are added to new array
              }
            }
              setScanning(false);
            // Ideally this array contains only one code. But if two or more codes are scanned simultaneously, 
            // error is handled accordingly and the user is prompted to try to scan one at a time.
              if (arrayOfCodes.length > 1) {
                alert(arrayOfCodes.length + ' codes detected. Please scan one at a time.');
              } else if (arrayOfCodes.length === 1) {
                // One code detected successfully.
                handleCodeDetected(arrayOfCodes[0]);
              } else {
                // No codes detected (text was detected but it did not contain a code)
                alert('Error. No suitable codes detected. Code must be 4-digits in length and can contain only numbers.');
              }
          } catch (e) {
            alert(e);
          }}
    })();
  },[imagePath])

  // Four-number code detected
 
  async function handleCodeDetected(code) {
  //  alert('Code found: '+ code);
    SetDetectedCode(code);
  }

// What to do when a code is detected? Following actions here ...
  // Here navigation takes user back to Home Screen and sends the code as a parameter + shows the code there
  // In a real situation this could maybe send the user to another Screen to edit the information of the calf?
  useEffect(() => {
      if (detectedCode) {
        navigation.navigate({
            name: 'Home',
            params: { code: detectedCode },
            merge: true,
          });
    }
  }, [detectedCode])

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.preview} captureAudio={false}
        fixOrientation={true}>

          {scanning 
            ? <>
              <ActivityIndicator size="large" color="#fff"/>
              <Text style={styles.scanStatus}>
                Scanning
              </Text>
              </>
            : null}

        <TouchableOpacity onPress={() => captureHandle()}>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.button} >
              <Text style={styles.buttonText}>SCAN</Text>
            </View>
          </View>
        </TouchableOpacity>

        </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  preview: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom: 20,
  },
  button: {
    height: 70,
    fontSize: 30,
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#d1d1d1',
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
  scanStatus: {
    fontSize: 17,
    fontStyle: 'italic',
    color: '#e8e8e8',
    margin: 20
  },
  buttonText: {
    marginVertical: 5,
    color: '#d1d1d1',
    fontWeight: 'bold'
  }
})