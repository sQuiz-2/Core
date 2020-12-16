import userState from '@Src/global/userState';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import useReportStyle from './QuestionReportStyle';

type ReportProps = {
  id: number;
};

export default function Report({ id }: ReportProps) {
  const user = useRecoilValue(userState);
  const [reported, setReported] = useState(false);
  const { colors } = useTheme();
  const styles = useReportStyle();

  function handleReport() {
    // Check if the player already reported the question
    if (reported) return;
    try {
      get({ path: 'rounds/report/' + id, token: user.token! });
      setReported(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setReported(false);
  }, [id]);

  if (user.token) {
    return (
      <FontAwesome5
        onPress={handleReport}
        style={styles.icon}
        name={reported ? 'font-awesome-flag' : 'flag'}
        size={18}
        color={colors.text}
      />
    );
  } else {
    return null;
  }
}
