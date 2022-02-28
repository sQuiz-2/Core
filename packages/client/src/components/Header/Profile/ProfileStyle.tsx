import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  level: {
    paddingRight: 5,
  },
  avatar: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  dropDownContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 8,
    top: 20,
    right: 0,
  },
  dropDown: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropDownRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
  },
  dropDownText: {
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});

export default styles;
