import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useReportStyle() {
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    icon: {
      width: 'fit-content',
      marginLeft: 'auto',
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
    },
  });
  return styles;
}
