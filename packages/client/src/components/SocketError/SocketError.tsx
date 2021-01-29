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
    default:
      return '💥 Une erreur est survenue !';
  }
}

type SocketErrorProps = {
  error: string;
};

export default function SocketError({ error }: SocketErrorProps) {
  return (
    <ResponsiveContainer>
      <CenterContainer>
        <Text fontSize="xxl" fontFamily="title" style={styles.text}>
          {getErrorMessage(error)}
        </Text>
      </CenterContainer>
    </ResponsiveContainer>
  );
}
