import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import oAuthProviders from '../../../constant/oAuthProviders.json';
import useOAuthTwitch from '../../../utils/hooks/oAuthTwitch';
import Text from '../../Text';

export default function NotConnected() {
  const { colors } = useTheme();
  const { promptAsync, loading } = useOAuthTwitch();

  return (
    <>
      {loading ? (
        <Text> Connection en cours</Text>
      ) : (
        oAuthProviders.map((provider) => (
          <TouchableOpacity
            key={provider.name}
            onPress={() => promptAsync()}
            style={[styles.container, { backgroundColor: provider.color }]}>
            <FontAwesome5 name={provider.icon} size={24} color={colors.text} />
            <Text>Se connecter avec {provider.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
});
