import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from '../styles';

interface PauseMenuProps {
  onResume: () => void;
  onExitToHome: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onExitToHome }) => {
  return (
    <View style={styles.pauseMenu}>
      <Text style={styles.pauseMenuText}>Menu</Text>
      <View style={styles.subMenu}>
        <Pressable onPress={onResume} style={styles.restartButton}>
          <Image source={{ uri: 'play' }} style={styles.restartImage} />
        </Pressable>
        <Pressable onPress={onExitToHome} style={styles.exitButton}>
          <Image source={{ uri: 'x-mark' }} style={styles.exitImage} />
        </Pressable>
      </View>
    </View>
  );
};

export default PauseMenu;
