import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from '../styles';

interface GameOverScreenProps {
  onRestart: () => void;
  onExitToHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart, onExitToHome }) => {
  return (
    <View style={styles.gameOverContainer}>
      <Text style={styles.gameOverText}>Game Over!</Text>
      <Pressable onPress={onRestart} style={styles.restartButton}>
        <Image source={{ uri: 'restart' }} style={styles.restartImage} />
      </Pressable>
      <Pressable onPress={onExitToHome} style={styles.exitButton}>
        <Image source={{ uri: 'x-mark' }} style={styles.exitImage} />
      </Pressable>
    </View>
  );
};

export default GameOverScreen;
