import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Animated, Image, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import Avatar from './components/Avatar';
import Obstacles from './components/Obstacles';
import PauseMenu from './components/PauseMenu';
import LevelComplete from './components/LevelComplete';
import GameOverScreen from './components/GameOverScreen';
import styles from './styles';

interface GameScreenProps {
  navigation: any;
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const [groundPosition1] = useState(new Animated.Value(0));
  const [groundPosition2] = useState(new Animated.Value(screenWidth));
  const [obstacles, setObstacles] = useState<{ id: number; position: Animated.Value }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelComplete, setLevelComplete] = useState(false);
  const [avatarImageUri, setAvatarImageUri] = useState('dog');
  let backgroundMusic: Sound;

  useEffect(() => {
    backgroundMusic = new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) return;
      backgroundMusic.setNumberOfLoops(-1);
      backgroundMusic.play();
    });

    return () => backgroundMusic?.stop(() => backgroundMusic.release());
  }, []);

  const animateGround = () => {
    const duration = 5000 / level;

    // Animate both ground images
    Animated.loop(
      Animated.parallel([
        Animated.timing(groundPosition1, {
          toValue: -screenWidth,
          duration: duration,
          useNativeDriver: false,
        }),
        Animated.timing(groundPosition2, {
          toValue: 0,
          duration: duration,
          useNativeDriver: false,
        }),
      ]),
    ).start(() => {
      // Reset positions for seamless loop
      groundPosition1.setValue(screenWidth);
      groundPosition2.setValue(0);
    });
  };

  useEffect(() => {
    if (!gameOver && !levelComplete && !paused) {
      animateGround();
      const interval = setInterval(() => spawnObstacle(), 2000);
      return () => clearInterval(interval);
    }
  }, [gameOver, level, levelComplete, paused]);

  const spawnObstacle = () => {
    const obstacleId = Date.now();
    const position = new Animated.Value(600);
    const newObstacle = { id: obstacleId, position };

    setObstacles((prevObstacles) => [...prevObstacles, newObstacle]);

    Animated.timing(position, {
      toValue: -50,
      duration: 5000 / level,
      useNativeDriver: false,
    }).start(() => {
      setObstacles((prevObstacles) => prevObstacles.filter((obs) => obs.id !== obstacleId));
      if (position._value <= 50) setGameOver(true);
    });
  };

  useEffect(() => {
    const levelThreshold = Math.floor(15 * Math.log(level) + 5);
    if (score >= levelThreshold) {
      setLevel((prevLevel) => prevLevel + 1);
      setLevelComplete(true);
    }
  }, [score, level]);

  const handleScreenPress = () => {
    setAvatarImageUri('dog-bark');
    setTimeout(() => {
      setAvatarImageUri('dog');
    }, 500);

    setObstacles((prevObstacles) => {
      const closestObstacleIndex = prevObstacles.findIndex(
        (obs) => obs.position._value < 150 && obs.position._value > 50
      );

      if (closestObstacleIndex !== -1) {
        const updatedObstacles = [...prevObstacles];
        updatedObstacles.splice(closestObstacleIndex, 1);
        setScore((prevScore) => prevScore + 1);
        return updatedObstacles;
      }
      return prevObstacles;
    });
  };

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setObstacles([]);
    setLevelComplete(false);
    setPaused(false);
    setShowPauseMenu(false);
  };

  const handleExitToHome = () => {
    navigation.navigate('Home');
  };

  const handleNextLevel = () => {
    setLevelComplete(false);
    setObstacles([]);
  };

  return (
    <Pressable onPress={handleScreenPress} style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: 'background' }} style={styles.background} />
        
        {/* Two ground images to simulate continuous scrolling */}
        <Animated.View style={[styles.ground, { transform: [{ translateX: groundPosition1 }] }]}>
          <Image source={{ uri: 'ground' }} style={styles.groundImage} />
        </Animated.View>
        <Animated.View style={[styles.ground, { transform: [{ translateX: groundPosition2 }] }]}>
          <Image source={{ uri: 'ground' }} style={styles.groundImage} />
        </Animated.View>

        <Avatar avatarImageUri={avatarImageUri} />
        <Obstacles obstacles={obstacles} />

        {gameOver && (
          <GameOverScreen onRestart={handleRestart} onExitToHome={handleExitToHome} />
        )}

        {levelComplete && <LevelComplete onNextLevel={handleNextLevel} />}

        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.level}>Level: {level}</Text>

        {!gameOver && showPauseMenu && <PauseMenu onResume={() => setPaused(false)} />}
      </View>
    </Pressable>
  );
};

export default GameScreen;
