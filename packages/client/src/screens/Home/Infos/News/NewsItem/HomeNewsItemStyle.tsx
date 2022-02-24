import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    paddingRight: 8,
  },
  dateText: {
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 5,
    textAlign: 'justify',
  },
  freshLabel: {
    backgroundColor: 'red',
    borderRadius: 5,
    fontWeight: 'bold',
    paddingRight: 7,
    paddingLeft: 5,
    marginLeft: 10,
  },
});

export default styles;
