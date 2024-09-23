import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'background-landing' }} style={styles.background} />
      <Text style={styles.title}>Yaps</Text>
      <Image source={{ uri: 'dog' }} style={styles.image} />
      <Button title="Tap to start" onPress={() => navigation.navigate('Game')} />
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
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    marginBottom: 30, // Spacing between image and button
    resizeMode: 'contain', // Ensures the image scales correctly
  },
});

export default HomeScreen;
