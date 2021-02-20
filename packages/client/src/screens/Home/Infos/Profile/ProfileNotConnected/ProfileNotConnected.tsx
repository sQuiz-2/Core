import { CenterContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import userBasicInfoState from '@Src/global/userBasicInfos';
import useOAuthTwitch from '@Src/utils/hooks/oAuthTwitch';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { GetProviders, MeBasic } from '@squiz/shared';
import React from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import useProfileNotConnectedStyle from './ProfileNotConnectedStyle';

export default function ProfileNotConnected() {
  const { colors } = useTheme();
  const { promptAsync, loading } = useOAuthTwitch(onSuccess);
  const styles = useProfileNotConnectedStyle();
  const providers = GetProviders();
  const setUserBasicInfoState = useSetRecoilState(userBasicInfoState);

  async function onSuccess(token: string) {
    try {
      const meBasicInfos = await get<MeBasic>({ path: 'me-basic', token });
      if (!meBasicInfos) return;
      setUserBasicInfoState(meBasicInfos);
    } catch (error) {
      console.error(error);
    }
  }

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
