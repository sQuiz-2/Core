import ReportButton from '@Src/components/QuestionReport';
import Text from '@Src/components/Text';
import { titleCase } from '@Src/utils/text';
import React from 'react';
import { View } from 'react-native';

import styles from './QuestionInfoStyle';

type QuestionInfosProps = {
  id: number;
  question: string;
  theme: string;
  answers?: string[];
  displayReport?: boolean;
};

export default function QuestionInfos({
  id,
  question,
  answers,
  theme,
  displayReport = false,
}: QuestionInfosProps) {
  return (
    <View style={styles.roundContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.theme}>{titleCase(theme)}</Text>
        {answers && <Text>{answers.length > 1 ? answers.join(' / ') : answers}</Text>}
      </View>
      {displayReport && (
        <View style={styles.reportContainer}>
          <ReportButton id={id} question={question} answers={answers} theme={theme} />
        </View>
      )}
    </View>
  );
}
