import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSvg: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }], // Start the opening of the circle at the top
  },
});

export default styles;
