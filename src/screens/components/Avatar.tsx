import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import styles from '../styles';

interface AvatarProps {
  avatarImageUri: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatarImageUri }) => {
  const [currentImageUri, setCurrentImageUri] = useState(avatarImageUri);

  useEffect(() => {
    if (avatarImageUri === 'dog-bark') {
      setCurrentImageUri('dog-bark');
      const resetTimeout = setTimeout(() => {
        setCurrentImageUri('dog'); // or 'dog-walk' based on toggling logic
      }, 500); // Reset to default after 500ms
      return () => clearTimeout(resetTimeout);
    } else {
      const interval = setInterval(() => {
        setCurrentImageUri((prev) => (prev === 'dog' ? 'dog-walk' : 'dog'));
      }, 200); // 0.2 seconds

      return () => clearInterval(interval);
    }
  }, [avatarImageUri]);

  return <Image source={{ uri: currentImageUri }} style={styles.avatar} />;
};

export default Avatar;
