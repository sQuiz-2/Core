import userState from '@Src/global/userState';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import ReportModal from '../ReportModal';
import useReportStyle from './ReportButtonStyle';

type ReportProps = {
  id: number;
  question: string;
  theme: string;
  answers?: string[];
};

export default function ReportButton({ id, question, answers, theme }: ReportProps) {
  const user = useRecoilValue(userState);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const styles = useReportStyle();

  if (user.token) {
    return (
      <>
        <ReportModal
          question={question}
          answers={answers}
          theme={theme}
          id={id}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
        <FontAwesome5
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.icon}
          name="flag"
          size={18}
          color={colors.text}
        />
      </>
    );
  } else {
    return null;
  }
}
