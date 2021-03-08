import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    minWidth: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginRight: 5,
  },
  medal: {
    width: 16,
    height: 23,
  },
  positionContainer: {
    minWidth: 30,
  },
  score: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  positionText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
