import { badges } from '@Src/utils/loadBadges';
import React, { useState } from 'react';
import { View, StyleProp, Image, ImageStyle } from 'react-native';

import { IsHover } from '../Hover';
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
  const [animate, setAnimate] = useState(false);
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

  function handleAnimate() {
    if (!locked) {
      setAnimate(true);
    }
  }

  function handleLeaveAnimate() {
    if (!locked) {
      setAnimate(false);
    }
  }

  const badge = source.animated ? (
    <IsHover onHover={handleAnimate} onLeaveOver={handleLeaveAnimate}>
      {animate && <Image source={source.animated} style={[imageStyle]} />}
      {locked && <Image source={source} style={[imageStyle, styles.pictureGray as ImageStyle]} />}
      {!animate && (
        <Image
          source={source.static}
          style={[
            imageStyle,
            locked && (styles.pictureAbsolute as ImageStyle),
            locked && (styles.opacity as ImageStyle),
          ]}
        />
      )}
    </IsHover>
  ) : (
    <>
      {locked && <Image source={source} style={[imageStyle, styles.pictureGray as ImageStyle]} />}
      <Image
        source={source}
        style={[
          imageStyle,
          locked && (styles.pictureAbsolute as ImageStyle),
          locked && (styles.opacity as ImageStyle),
        ]}
      />
    </>
  );

  const badgeAndInfos = (
    <>
      <View>
        {badge}
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
      <IsHover onHover={handleOver} onLeaveOver={handleLeaveOver}>
        {badgeAndInfos}
      </IsHover>
    );
  }
}
