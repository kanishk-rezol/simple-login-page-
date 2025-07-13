import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Video, ResizeMode, Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const enableAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };
    enableAudio();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.1.4:3001/login', {
        username,
        password,
      });
      setLoginError(false);
      Alert.alert('Success', res.data.message);
      // navigation.navigate('Home'); // Navigate after success
    } catch (error: any) {
      setLoginError(true);
      Alert.alert('Error', error?.response?.data?.message || 'Login failed');
    }
  };

  const toggleMute = async () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(newMuteState);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/video3.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted={isMuted}
        volume={1.0}
      />

      <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
        <Ionicons
          name={isMuted ? 'volume-mute' : 'volume-high'}
          size={20}
          color="white"
        />
      </TouchableOpacity>

      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Ready to start your engine? Login now
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={18} color="#ccc" style={styles.iconInside} />
          <TextInput
            placeholder="Username / Email"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setLoginError(false);
            }}
            style={styles.input} placeholderTextColor="#eee"/>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={18} color="#ccc" style={styles.iconInside} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setLoginError(false); 
              }}
              style={styles.input} placeholderTextColor="#eee"/>
        </View>

        <View style={styles.forgotSection}>
          <Text style={styles.forgotText}>Having trouble logging in?</Text>
          <TouchableOpacity>
            <Text style={styles.forgotLink}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: loginError ? '#ff3b30' : '#007AFF' },]}onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 12,
    marginHorizontal: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    color: '#fff',
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 10,
  },
  iconInside: {
    position: 'absolute',
    top: 12,
    left: 10,
  },
  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 25,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  muteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  forgotSection: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    color: '#ccc',
    fontSize: 14,
  },
  forgotLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginHorizontal: 100,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
