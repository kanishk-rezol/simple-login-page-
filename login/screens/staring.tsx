// import React, { useRef, useState, useEffect } from 'react';
// import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/navigation';
// import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
// import { useFocusEffect } from '@react-navigation/native';


// type Props = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

// export default function GetStarted({ navigation }: Props) {
//   const videoRef = useRef<Video>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [lastPressed, setLastPressed] = useState<'Signup' | 'Login' | null>(null);
//   const [initialPlayComplete, setInitialPlayComplete] = useState(false);
//   useEffect(() => {
//     const playInitialSegment = async () => {
//       if (videoRef.current) {
//         await videoRef.current.setPositionAsync(0);
//         await videoRef.current.playAsync();
//         setTimeout(async () => {
//           await videoRef.current?.pauseAsync();
//           setInitialPlayComplete(true);
//         }, 1500);
//       }
//     };
//     playInitialSegment();
//   }, []);
//   useFocusEffect(
//     React.useCallback(() => {
//       const resetVideo = async () => {
//         if (videoRef.current) {
//           await videoRef.current.setPositionAsync(0);
//           await videoRef.current.pauseAsync();
//           setIsPlaying(false);
//           setInitialPlayComplete(false);
//           setTimeout(async () => {
//             await videoRef.current?.playAsync();
//             setTimeout(async () => {
//               await videoRef.current?.pauseAsync();
//               setInitialPlayComplete(true);
//             }, 2500);
//           }, 100);
//         }
//       };
//       resetVideo();
//       return () => {};
//     }, [])
//   );
//   const handleButtonPress = (screen: 'Signup' | 'Login') => {
//     setLastPressed(screen);
//     setIsPlaying(true);
//     videoRef.current?.playFromPositionAsync(2500);
//   };
//   const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
//     if (!status.isLoaded) return;
//     if (status.didJustFinish) {
//       setIsPlaying(false);
//       if (lastPressed) {
//         navigation.navigate(lastPressed);
//       }
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Video
//         ref={videoRef}
//         source={require('../assets/video2.mp4')}
//         style={styles.video}
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping={false}
//         shouldPlay={false}
//         onPlaybackStatusUpdate={handlePlaybackStatusUpdate}/>
//       <Text style={styles.title}>Welcome</Text>
//       <Text style={styles.subtitle}>
//         Get started with awesome thing – create your account today
//       </Text>
//       <TouchableOpacity
//         onPress={() => handleButtonPress('Signup')}
//         disabled={!initialPlayComplete}
//         style={[
//           styles.primaryButton,
//           !initialPlayComplete && styles.disabledButton,]}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//       <View style={styles.login}>
//         <Text style={{ marginRight: 8 }}>Already have an account?</Text>
//         <TouchableOpacity
//           onPress={() => handleButtonPress('Login')}
//           disabled={!initialPlayComplete}>
//           <Text
//             style={[
//               styles.loginButtonText,
//               !initialPlayComplete && styles.disabledLoginText,]}>
//             Log In
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
// const { width } = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   video: {
//     width: width * 0.8,
//     height: 200,
//     alignSelf: 'center',
//     marginBottom: 30,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 28,
//     marginBottom: 20,
//     alignSelf: 'center',
//     textAlign: 'center',
//     color: 'black',
//   },
//   subtitle: {
//     textAlign: 'center',
//     alignSelf: 'center',
//     marginTop: 10,
//     marginHorizontal: 20,
//     fontSize: 10,
//     color: '#333',
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 20,
//     marginTop: 40,
//     marginHorizontal: 40,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#A0A0A0',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   login: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#007AFF',
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   disabledLoginText: {
//     color: '#888',
//   },
// });
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ColorChangingButton = () => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!pressed); // toggle color on each press
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: pressed ? '#4CAF50' : '#2196F3' }]}
        onPress={handlePress}
      >
        <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
      </TouchableOpacity>
      <View style={styles.button1}></View>
    </View>
    
  );
};

export default ColorChangingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    height:100,
    width:100,
    // borderRadius: ,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button1:{
    paddingVertical: 14,
    paddingHorizontal: 24,
    height:100,
    width:100,
  }
});
