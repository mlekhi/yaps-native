import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles';

interface LevelCompleteProps {
  onNextLevel: () => void;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ onNextLevel }) => {
  return (
    <View style={styles.levelCompleteContainer}>
      <Text style={styles.levelCompleteText}>Level Complete!</Text>
      <Pressable onPress={onNextLevel} style={styles.nextLevelButton}>
        <Text style={styles.nextLevelText}>Next Level</Text>
      </Pressable>
    </View>
  );
};

export default LevelComplete;
