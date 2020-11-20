import { CenterContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import useOAuthTwitch from '@Src/utils/hooks/oAuthTwitch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { GetProviders } from '@squiz/shared';
import React from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';

import useProfileNotConnectedStyle from './ProfileNotConnectedStyle';

export default function ProfileNotConnected() {
  const { colors } = useTheme();
  const { promptAsync, loading } = useOAuthTwitch();
  const styles = useProfileNotConnectedStyle();
  const providers = GetProviders();

  return (
    <View style={styles.container}>
      {loading ? (
        <CenterContainer style={styles.loader}>
          <ActivityIndicator />
        </CenterContainer>
      ) : (
        providers.map((provider) => (
          <TouchableOpacity
            key={provider.name}
            onPress={() => promptAsync()}
            style={[styles.provider, { backgroundColor: provider.color }]}>
            <FontAwesome5 style={styles.icon} name={provider.icon} size={24} color={colors.text} />
            <Text>Se connecter avec {provider.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}
