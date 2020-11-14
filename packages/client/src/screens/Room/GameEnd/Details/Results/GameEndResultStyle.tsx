import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  positionContainer: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
  },
  content: {
    paddingTop: 20,
  },
});

export default styles;
