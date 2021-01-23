import { PrimaryButton } from '@Src/components/Buttons';
import Modal from '@Src/components/Modal';
import QuestionInfos from '@Src/components/QuestionInfos';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { post } from '@Src/utils/wrappedFetch';
import { Report, ReportDetail } from '@squiz/shared';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import useReportModalStyle from './ReportModalStyle';

type ReportModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  question: string;
  answers: string[];
  id: number;
};

export default function ReportModal({
  visible,
  setVisible,
  question,
  answers,
  id,
}: ReportModalProps) {
  const styles = useReportModalStyle();
  const [reported, setReported] = useState<{ [I in Report]?: boolean }>({});
  const user = useRecoilValue(userState);

  function handlePressReport(pressedReport: Report) {
    const reportExist = reported[pressedReport];
    if (reportExist) {
      reported[pressedReport] = !reportExist;
    } else {
      reported[pressedReport] = true;
    }
    setReported({ ...reported });
  }

  function sendReport() {
    try {
      post({ path: 'rounds/report/' + id, token: user.token!, body: { reports: reported } });
    } catch (error) {
      console.log(error);
    }
    setVisible(false);
  }

  return (
    <Modal setVisible={setVisible} visible={visible}>
      <Text style={styles.title} fontFamily="title" fontSize="xxl">
        SIGNALEMENT
      </Text>
      <View style={styles.question}>
        <QuestionInfos answers={answers} question={question} id={id} displayReport={false} />
      </View>
      {ReportDetail.map((report) => {
        return (
          <Pressable style={styles.reasonButton} onPress={() => handlePressReport(report.type)}>
            <Text
              style={[styles.reason, { backgroundColor: reported[report.type] ? 'green' : 'none' }]}
              fontSize="md">
              {report.detail}
            </Text>
          </Pressable>
        );
      })}
      <PrimaryButton onPress={sendReport} style={styles.sendButton}>
        <Text fontSize="md">Envoyer</Text>
      </PrimaryButton>
    </Modal>
  );
}
