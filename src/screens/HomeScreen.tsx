import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Svg, { Text, Defs, LinearGradient, Stop } from 'react-native-svg';

interface HomeScreenProps {
  navigation: any;
}
// GradientText Component using react-native-svg
const GradientText: React.FC<GradientTextProps> = ({ text, type }) => {
  // Set font size based on the 'type' prop
  const fontSize = type === 'h1' ? 40 : 20;
  const height = type === 'h1' ? 60 : 50;

  return (
    <Svg height={height} width="300">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#4facfe" stopOpacity="1" />
          <Stop offset="1" stopColor="#00f2fe" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Text
        fill="url(#grad)"
        fontSize={fontSize} // Dynamic font size based on 'type'
        fontWeight="bold"
        x="150"
        y="40"
        textAnchor="middle"
        fontFamily="Daydream"
      >
        {text}
      </Text>
    </Svg>
  );
};

// HomeScreen Component
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'background-landing' }} style={styles.background} />
      <TouchableOpacity onPress={() => navigation.navigate('Game')}>
      <GradientText text="Yaps" type="h1" />
      <Image source={{ uri: 'dog' }} style={styles.image} />
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
  gradientText: {
    fontFamily: 'Daydream',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
