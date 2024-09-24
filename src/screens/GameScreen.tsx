import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const GameScreen: React.FC = () => {
  const [groundPosition, setGroundPosition] = useState(new Animated.Value(0));
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const obstacleSpeed = 5;
  const obstacleSpawnInterval = 2000;

  useEffect(() => {
    let gameInterval: NodeJS.Timer;
    let obstacleInterval: NodeJS.Timer;

    if (!gameOver) {
      gameInterval = setInterval(() => {
        Animated.timing(groundPosition, {
          toValue: -1000,
          duration: 5000 / level,
          useNativeDriver: false,
        }).start(() => setGroundPosition(new Animated.Value(0)));

        setScore((prev) => prev + 1);
      }, 50);

      obstacleInterval = setInterval(() => {
        setObstacles((prevObstacles) => [
          ...prevObstacles,
          Math.random() * (600 - 400) + 400,
        ]);
      }, obstacleSpawnInterval);
    }

    return () => {
      clearInterval(gameInterval);
      clearInterval(obstacleInterval);
    };
  }, [gameOver, level]);

  useEffect(() => {
    if (obstacles.length > 0) {
      obstacles.forEach((obstacle) => {
        if (obstacle <= 50) {
          setGameOver(true);
        }
      });
    }

    if (score > level * 100) {
      setLevel(level + 1);
    }
  }, [obstacles, score]);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setObstacles([]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'background' }} style={styles.background} />
      
      <Animated.View style={[styles.ground, { left: groundPosition }]}>
        <Image source={{ uri: 'dog' }} style={styles.groundImage} />
      </Animated.View>

      <Image source={{ uri: 'dog' }} style={styles.avatar} />

      {obstacles.map((obstacle, index) => (
        <Animated.Image
          key={index}
          source={{ uri: 'dog' }}
          style={[styles.obstacle, { left: obstacle }]}
        />
      ))}

      {gameOver && <Text style={styles.gameOverText}>Game Over! Tap to Restart</Text>}
      
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.level}>Level: {level}</Text>

      {gameOver && (
        <Text style={styles.restartText} onPress={handleRestart}>
          Restart
        </Text>
      )}
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
  ground: {
    position: 'absolute',
    bottom: 0,
    width: 1000,
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
    left: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  obstacle: {
    position: 'absolute',
    bottom: 50,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  gameOverText: {
    fontSize: 36,
    color: 'red',
    position: 'absolute',
    top: 200,
  },
  score: {
    fontSize: 24,
    position: 'absolute',
    top: 50,
    color: 'white',
  },
  level: {
    fontSize: 24,
    position: 'absolute',
    top: 80,
    color: 'white',
  },
  restartText: {
    fontSize: 24,
    color: 'blue',
    position: 'absolute',
    top: 300,
  },
});

export default GameScreen;
