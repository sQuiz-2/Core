import { SocketErrors } from '@squiz/shared';
import React from 'react';

import { ResponsiveContainer, CenterContainer } from '../Containers';
import Text from '../Text';
import styles from './SocketErrorStyle';

function getErrorMessage(error: string) {
  switch (error) {
    case SocketErrors.AlreadyConnected:
      return '🤯 Ton compte est déjà connecté dans un autre onglet !';
    case SocketErrors.MissingParameter:
      return '🤔 Un paramètre est manquant';
    case SocketErrors.ServerFull:
      return '😱 Le serveur est full ! Il y a ~2000 joueurs devant toi';
    case SocketErrors.ExceedMaxConnectionPerIp:
      return '🙄 La limite de connexion avec cette adresse ip a été atteinte';
    case SocketErrors.CantFindPseudo:
      return '⚙️ Nous ne trouvons pas de compte invité disponible';
    case SocketErrors.BadCredentials:
      return '🕵️‍♂️ Tes identifiants ont expirés ! Déconnecte-toi puis reconnecte toi';
    case SocketErrors.MissingPrivateCode:
      return "💂‍♂️ Il s'agit d'une partie privée ! Pour la rejoindre utilise la fonction 'Rejoindre une partie' dans le menu 'Parties persos'";
    case SocketErrors.InvalidPrivateCode:
      return "🤖 Le code utilisé pour rejoindre cette partie est invalide ! Pour la rejoindre utilise la fonction 'Rejoindre une partie' dans le menu 'Parties persos'";
    default:
      return '💥 Une erreur est survenue !';
  }
}

type SocketErrorProps = {
  error: string;
};

export default function SocketError({ error }: SocketErrorProps) {
  return (
    <ResponsiveContainer footerEnable={false}>
      <CenterContainer>
        <Text fontSize="xxl" fontFamily="title" style={styles.text}>
          {getErrorMessage(error)}
        </Text>
      </CenterContainer>
    </ResponsiveContainer>
  );
}
