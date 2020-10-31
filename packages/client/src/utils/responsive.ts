import { ScreenWidth } from './hooks/screenWidth';

export default function responsive(
  screenWidth: ScreenWidth,
  sm: string | number,
  md: string | number,
  xl: string | number
): any {
  switch (screenWidth) {
    case 'sm':
      return sm;
    case 'md':
      return md;
    case 'xl':
      return xl;
  }
}
