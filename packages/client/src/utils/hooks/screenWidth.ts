import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export type ScreenWidth = 'sm' | 'md' | 'xl';

export function useScreenWidth() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };
    Dimensions.addEventListener('change', onDimensionsChange);
    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  if (dimensions.width < 768) return 'sm';
  else if (dimensions.width < 1280) return 'md';
  else return 'xl';
}
