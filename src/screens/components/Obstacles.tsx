import React from 'react';
import { Animated, Image } from 'react-native';
import styles from '../styles';

interface ObstaclesProps {
  obstacles: { id: number; position: Animated.Value }[];
}

const Obstacles: React.FC<ObstaclesProps> = ({ obstacles }) => {
  return (
    <>
      {obstacles.map((obstacle) => (
        <Animated.Image
          key={obstacle.id}
          source={{ uri: 'shrub' }}
          style={[styles.obstacle, { left: obstacle.position }]}
        />
      ))}
    </>
  );
};

export default Obstacles;
