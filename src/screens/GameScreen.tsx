import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, Pressable } from 'react-native';
import Sound from 'react-native-sound';

const GameScreen: React.FC = () => {
  const [groundPosition, setGroundPosition] = useState(new Animated.Value(0));
  const [obstacles, setObstacles] = useState<{ id: number; position: Animated.Value }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelComplete, setLevelComplete] = useState(false);
  const [avatarImageUri, setAvatarImageUri] = useState('dog');
  let backgroundMusic: Sound;

  useEffect(() => {
    backgroundMusic = new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      backgroundMusic.setNumberOfLoops(-1);
      backgroundMusic.play();
    });

    return () => {
      if (backgroundMusic) {
        backgroundMusic.stop(() => backgroundMusic.release());
      }
    };
  }, []);

  const obstacleSpeed = 5;
  const obstacleSpawnInterval = 2000;

  useEffect(() => {
    let gameInterval: NodeJS.Timer;
    let obstacleInterval: NodeJS.Timer;

    if (!gameOver && !levelComplete) {
      gameInterval = setInterval(() => {
        Animated.timing(groundPosition, {
          toValue: -1000,
          duration: 5000 / level,
          useNativeDriver: false,
        }).start(() => setGroundPosition(new Animated.Value(0)));
      }, 50);

      obstacleInterval = setInterval(() => {
        spawnObstacle();
      }, obstacleSpawnInterval);
    }

    return () => {
      clearInterval(gameInterval);
      clearInterval(obstacleInterval);
    };
  }, [gameOver, level, levelComplete]);

  useEffect(() => {
    const levelThreshold = Math.floor(15 * Math.log(level) + 5);

    if (score >= levelThreshold) {
      setLevelComplete(true);
    }
  }, [score, level]);

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
      if (position._value <= 50) {
        setGameOver(true);
      }
      setObstacles((prevObstacles) => prevObstacles.filter((obs) => obs.id !== obstacleId));
    });
  };

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setObstacles([]);
    setLevelComplete(false);
  };

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setScore(0);
    setObstacles([]);
    setLevelComplete(false);
  };

  const handleAvatarTap = () => {
    setAvatarImageUri('dog-yap');
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

  return (
    <Pressable onPress={handleAvatarTap} style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: 'background' }} style={styles.background} />

        <Animated.View style={[styles.ground, { left: groundPosition }]}>
          <Image source={{ uri: 'ground' }} style={styles.groundImage} />
        </Animated.View>

        <Image source={{ uri: avatarImageUri }} style={styles.avatar} />

        {obstacles.map((obstacle) => (
          <Animated.Image
            key={obstacle.id}
            source={{ uri: 'shrub' }}
            style={[styles.obstacle, { left: obstacle.position }]}
          />
        ))}

        {gameOver && <Text style={styles.gameOverText}>Game Over!</Text>}
        {levelComplete && !gameOver && (
          <View style={styles.levelCompleteContainer}>
            <Text style={styles.levelCompleteText}>Level Complete!</Text>
            <Pressable onPress={handleNextLevel} style={styles.nextLevelButton}>
              <Text style={styles.nextLevelText}>Next Level</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.level}>Level: {level}</Text>

        {gameOver && (
          <Pressable onPress={handleRestart} style={styles.restartButton}>
            <Image source={{ uri: 'restart' }} style={styles.restartImage} />
          </Pressable>
        )}
      </View>
    </Pressable>
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
  ground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
  },
  groundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'repeat',
  },
  avatar: {
    position: 'absolute',
    bottom: 50,
    left: -150,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  obstacle: {
    position: 'absolute',
    bottom: 50,
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  gameOverText: {
    fontFamily: 'Daydream',
    fontSize: 24,
    color: 'red',
    position: 'absolute',
    top: 200,
  },
  levelCompleteContainer: {
    position: 'absolute',
    top: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelCompleteText: {
    fontFamily: 'Daydream',
    fontSize: 24,
    color: 'green',
  },
  nextLevelButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  nextLevelText: {
    color: 'white',
    fontSize: 18,
  },
  score: {
    fontFamily: 'Daydream',
    fontSize: 24,
    position: 'absolute',
    top: 50,
    color: 'white',
  },
  level: {
    fontFamily: 'Daydream',
    fontSize: 24,
    position: 'absolute',
    top: 80,
    color: 'white',
  },
  restartButton: {
    position: 'absolute',
    top: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default GameScreen;
