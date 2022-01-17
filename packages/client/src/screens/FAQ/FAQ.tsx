import { ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';

import styles from './FAQStyle';

export default function FAQ() {
  const { colors } = useTheme();

  function openLink(link: string) {
    if (Platform.OS === 'web') {
      window.open(link, '_blank');
    } else {
      Linking.openURL(link);
    }
  }
  return (
    <ResponsiveContainer>
      <View style={{ flex: 1 }}>
        <Text fontSize="xl" style={styles.question}>
          Où puis-je signaler un bug ?
        </Text>
        <Text fontSize="lg">
          Un canal dédié a été créé sur
          <Pressable onPress={() => openLink('https://discord.gg/3jyvnKuP6a')}>
            <Text fontSize="lg" style={{ color: colors.notification }}>
              {' '}
              Discord
            </Text>
          </Pressable>
          .
        </Text>
        <Text fontSize="xl" style={styles.question}>
          Comment puis-je proposer des questions ?
        </Text>
        <Text fontSize="lg">
          Vous pouvez proposer vos propres questions en utilisant{' '}
          <Pressable
            onPress={() =>
              openLink(
                'https://docs.google.com/forms/d/e/1FAIpQLSdwMnH332LgNZrsfKjOCQThjZwA9CvlJ4XS5BBSrcUFsNVZJA/viewform'
              )
            }>
            <Text fontSize="lg" style={{ color: colors.notification }}>
              ce formulaire
            </Text>
          </Pressable>
          .
        </Text>
        <Text fontSize="xl" style={styles.question}>
          Est-ce que je peux aider pour le développement du site ?
        </Text>
        <Text fontSize="lg">
          Oui ! Le site est open-source vous pouvez y contribuer en allant sur notre
          <Pressable onPress={() => openLink('https://github.com/sQuiz-2/Core')}>
            <Text fontSize="lg" style={{ color: colors.notification }}>
              {' '}
              Github
            </Text>
          </Pressable>{' '}
          ! Si vous n'êtes pas développeur la meilleure façon d'aider est de proposer vos idées,
          faire connaître le site, etc.
        </Text>
        <Text fontSize="xl" style={styles.question}>
          Je n'arrive pas à lier mon compte Twitch, j'ai une erreur 401, comment faire ?
        </Text>
        <Text fontSize="lg">
          C'est un problème de cache lié à Twitch directement. Essayez de vous déconnecter puis
          reconnecter sur le site Twitch, ou de vous connecter sur sQuiz en navigation privée.
        </Text>
        <Text fontSize="xl" style={styles.question}>
          J'ai terminé une partie et je n'ai pas gagné d'expérience, pourquoi ?
        </Text>
        <Text fontSize="lg">
          Pour éviter les abus, il faut un minimum de 5 personnes pour que de l'expérience soit
          acquise sur une partie.
        </Text>
        <Text fontSize="xl" style={styles.question}>
          Je me suis fait bannir, comment faire pour être déban ?
        </Text>
        <Text fontSize="lg">
          Merci de faire votre demande déban sur{' '}
          <Pressable onPress={() => openLink('https://forms.gle/gwXjh4T6otpRmM6GA')}>
            <Text fontSize="lg" style={{ color: colors.notification }}>
              ce formulaire
            </Text>
          </Pressable>
          .
        </Text>
        <Text fontSize="xl" style={styles.question}>
          Pour toutes autres questions, merci de nous contacter via 
          <Pressable onPress={() => openLink('https://discord.gg/3jyvnKuP6a')}>
            <Text fontSize="lg" style={{ color: colors.notification }}>
              Discord
            </Text>
          </Pressable>
          ou sur notre adresse mail: support@squiz.gg
        </Text>
      </View>
    </ResponsiveContainer>
  );
}
