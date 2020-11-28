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
