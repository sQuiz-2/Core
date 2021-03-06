import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textStats: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 2,
  },
  textDetails: {
    fontWeight: 'normal',
  },
  buttonBan: {
    borderColor: 'red',
    marginTop: 10,
  },
  textBan: {
    color: 'red',
  },
});

export default styles;
