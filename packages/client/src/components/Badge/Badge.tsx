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
  id?: string;
  lockedDescription?: string;
};

export default function Badge({
  badgeName,
  imageStyle,
  id,
  locked = false,
  overForInfo = true,
  lockedDescription,
}: Props) {
  const [displayInfo, setDisplayInfo] = useState(!overForInfo);
  const [displayDescription, setDisplayDescription] = useState(false);
  const source = badges[id as keyof typeof badges];
  const styles = useBadgeStyle();

  if (!source) return <View style={imageStyle} />;

  function handleOver() {
    if (overForInfo) {
      setDisplayInfo(true);
    }
    if (lockedDescription) {
      setDisplayDescription(true);
    }
  }

  function handleLeaveOver() {
    if (overForInfo) {
      setDisplayInfo(false);
    }
    if (lockedDescription) {
      setDisplayDescription(false);
    }
  }

  const badgeAndInfos = (
    <>
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
          <View style={[styles.labelContainer, { top: overForInfo ? '0%' : '100%' }]}>
            <View style={[styles.label]}>
              <Text fontSize="sm">{badgeName}</Text>
            </View>
          </View>
        )}
      </View>
      {displayDescription && locked && lockedDescription && (
        <View style={[styles.lockedDescriptionContainer]}>
          <View style={[styles.lockedDescription]}>
            <Text fontSize="sm">{lockedDescription}</Text>
          </View>
        </View>
      )}
    </>
  );

  if (!locked && !overForInfo) {
    return <>{badgeAndInfos}</>;
  } else {
    return (
      <IsOver onHover={handleOver} onLeaveOver={handleLeaveOver}>
        {badgeAndInfos}
      </IsOver>
    );
  }
}
