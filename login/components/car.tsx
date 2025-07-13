import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

export default function VideoPlayer({ navigation, route }: Props) {
  const { from } = route.params;
  const video = useRef<Video>(null);
  const handlePlaybackFinish = () => {
    if (from === 'signup') navigation.navigate('Signup');
    else navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('../assets/video.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        useNativeControls
        style={styles.video}
        onPlaybackStatusUpdate={(status) => {
          if ((status as any).didJustFinish) {
            handlePlaybackFinish();
          }
        }}
      />
      <Button title="Skip Video" onPress={handlePlaybackFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  video: {
    width: '100%',
    height: 300,
  },
});
