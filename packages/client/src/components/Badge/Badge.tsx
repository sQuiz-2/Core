import { badges } from '@Src/utils/loadBadges';
import React, { useState } from 'react';
import { View, StyleProp, Image, ImageStyle } from 'react-native';

import { IsOver } from '../Over';
import Text from '../Text';
import useBadgeStyle from './BadgeStyle';

type Props = {
  badgeName?: string;
  imageStyle?: StyleProp<ImageStyle>;
  locked?: boolean;
  overForInfo?: boolean;
};

export default function Badge({
  badgeName,
  imageStyle,
  locked = false,
  overForInfo = true,
}: Props) {
  const [displayInfo, setDisplayInfo] = useState(!overForInfo);
  const source = badges[badgeName as keyof typeof badges];
  const styles = useBadgeStyle();

  if (!source) return <View style={imageStyle} />;

  const badgeAndInfos = (
    <View>
      {locked && <Image source={source} style={[imageStyle, styles.pictureGray as ImageStyle]} />}
      <Image
        source={source}
        style={[
          imageStyle,
          locked && (styles.pictureAbsolute as ImageStyle),
          locked && (styles.opacity as ImageStyle),
        ]}
      />
      {displayInfo && (
        <View style={[styles.label, { top: overForInfo ? '0%' : '100%' }]}>
          <Text fontSize="sm">{badgeName}</Text>
        </View>
      )}
    </View>
  );

  if (overForInfo) {
    return (
      <IsOver onHover={() => setDisplayInfo(true)} onLeaveOver={() => setDisplayInfo(false)}>
        {badgeAndInfos}
      </IsOver>
    );
  }
  return badgeAndInfos;
}
