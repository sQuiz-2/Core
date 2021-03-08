import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useCustomRoomStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
    },
    join: {
      width: responsive(screenWidth, '90%', '40%', '40%'),
      alignSelf: responsive(screenWidth, 'center', 'auto', 'auto'),
      marginBottom: responsive(screenWidth, 8, 0, 0),
    },
    create: {
      width: responsive(screenWidth, '90%', '60%', '60%'),
      alignSelf: responsive(screenWidth, 'center', 'auto', 'auto'),
      paddingLeft: responsive(screenWidth, 0, 20, 20),
    },
    bold: {
      fontWeight: 'bold',
    },
  });
}
