import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface HomeScreenProps {
  navigation: any;
}

const GradientText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <MaskedView
      style={styles.maskedView}
      maskElement={<Text style={styles.tap}>{text}</Text>}
    >
      <Text style={styles.linearGradient}>{text}</Text>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      />
    </MaskedView>
  );
};

// HomeScreen Component
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'background-landing' }} style={styles.background} />
      <Text style={styles.title}>Yaps</Text>
      <Image source={{ uri: 'dog' }} style={styles.image} />
      <TouchableOpacity onPress={() => navigation.navigate('Game')}>
        <GradientText text="Tap to start" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Daydream',
    fontSize: 50,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  tap: {
    fontFamily: 'Daydream',
    fontSize: 18,
    marginBottom: 20,
    color: 'transparent', // Make the text transparent to apply the mask correctly
  },
  maskedView: {
    height: 30, // Ensure this matches the text height
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    width: 150, // Adjust the width to match the text
    height: 30,  // Ensure the height matches the text size
  },
});

export default HomeScreen;
