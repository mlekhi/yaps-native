import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles';

interface PauseMenuProps {
  onResume: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onResume }) => {
  return (
    <View style={styles.pauseMenu}>
      <Text style={styles.pauseMenuText}>Paused</Text>
      <Pressable onPress={onResume} style={styles.resumeButton}>
        <Text style={styles.resumeText}>Resume</Text>
      </Pressable>
    </View>
  );
};

export default PauseMenu;
