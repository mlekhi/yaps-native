import { StyleSheet } from 'react-native';

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
    width: '200%',
    height: 50,
  },
  groundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'repeat',
  },
  avatar: {
    position: 'absolute',
    bottom: 25,
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
  gameOverContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.8)',
    width: '80%',
    height: '20%',
    borderRadius: 10,
  },
  gameOverText: {
    fontFamily: 'Daydream',
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  restartButton: {
    marginTop: 10,
    padding: 10,
  },
  restartImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  exitButton: {
    marginTop: 20,
    padding: 10,
  },
  exitImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
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
    color: 'white',
  },
  nextLevelButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  nextLevelText: {
    fontFamily: 'Daydream',
    color: 'white',
    fontSize: 18,
  },
  pauseMenu: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.8)',
    width: '80%',
    height: '20%',
    borderRadius: 10,
  },
  pauseMenuText: {
    fontFamily: "Daydream",
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  pauseButton: {
    width: 25,
    top: -300,
    right: 150,
    height: 25,
    resizeMode: 'contain',
  },
  score: {
    fontFamily: 'Daydream',
    fontSize: 20,
    position: 'absolute',
    top: 50,
    color: 'white',
  },
  level: {
    fontFamily: 'Daydream',
    fontSize: 20,
    position: 'absolute',
    top: 80,
    color: 'white',
  },
  subMenu: {
    flex: 1,
    flexDirection: 'row',  
  }
});

export default styles;
