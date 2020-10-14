import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export function useScreenWidth() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };
    Dimensions.addEventListener('change', onDimensionsChange);
    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  return dimensions.width >= 1024;
}
