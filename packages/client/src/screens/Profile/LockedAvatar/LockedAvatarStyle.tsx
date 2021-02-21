import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 5,
    margin: 15,
    borderRadius: 5,
  },
  pictureWidth: {
    width: 50,
    height: 50,
  },
  pictureGray: {
    tintColor: 'gray',
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacity: {
    opacity: 0.3,
  },
  pictureAbsolute: {
    position: 'absolute',
  },
});

export default styles;
