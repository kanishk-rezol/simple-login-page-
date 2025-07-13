import React, { useState, useEffect, useRef } from 'react';
import {View,TextInput,Alert,StyleSheet,ImageBackground,KeyboardAvoidingView,Platform,Text,TouchableOpacity,Animated,} from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function Signup({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [change,setChange]=useRef(false);

  const buttonColorAnim = useRef(new Animated.Value(1)).current; 

  const animateToBlue = () => {
    Animated.timing(buttonColorAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const animateToRed = () => {
    buttonColorAnim.setValue(0);
    animateToBlue();
  };

  const handleSignup = async () => {
    const isValid =
      username.trim() !== '' &&
      email.trim() !== '' &&
      email.includes('@') &&
      password.trim() !== '';

    if (!isValid) {
      animateToRed();
      Alert.alert('Validation Error', 'Please fill all fields correctly');
      return;
    }

    try {
      const res = await axios.post('http://192.168.1.4:3001/signup', {
        username,
        email,
        password,
      });

      Alert.alert('Success', res.data.message);
      navigation.navigate('Login');
    } catch (error: any) {
      console.log('Signup error:', error.message);
      console.log('Response:', error?.response?.data);
      Alert.alert('Error', error?.response?.data?.message || 'Signup failed');
    }
  };
  // useEffect(()=>{
  //   const changecolor=
  // }
  // )

  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF3B30', '#007AFF'], 
  });


  return (
    <ImageBackground
      source={require('../assets/image1.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>Sign up to proceed to the next step.</Text>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor="#444"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#444"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#444"
              autoCapitalize="none"
            />
          </View>
          <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor }]}>
            <TouchableOpacity onPress={handleSignup} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {/* <TouchableOpacity style={[styles.buttonsample,{backgroundColor}]}>
        <Text>
          sample
        </Text>
      </TouchableOpacity> */}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent:'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  buttonContainer: {
    borderRadius: 6,
    marginTop: 10,
    overflow: 'hidden',
    marginLeft:60,
    marginRight:60
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsample:{ 
    alignSelf:'center',
    backgroundColor:'white',
    marginLeft:20,
  }
});
