import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Platform,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Button from '../components/Button';
import { CenterContainer } from '../components/Containers';
import Text from '../components/Text';
import { fontSizes, fontFamilies } from '../constant/theme';
import request from '../utils/request';
import { titleCase } from '../utils/text';

const ROUND_LIMIT = 6;

type Answer = {
  prefix: string;
  answer: string;
};

type Theme = {
  title: string;
  id: number;
};

type Difficulty = {
  title: string;
  id: number;
};

export default function AddRound() {
  const { colors } = useTheme();
  const [answers, setAnswers] = useState([{ prefix: '', answer: '' }]);
  const [question, setQuestion] = useState('');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [themeId, setThemeId] = useState(1);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [difficultyId, setDifficultyId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string; rule: string }[]>([]);
  const firstAnswerRef = useRef<TextInput | null>(null); // Clear the first answer/prefix with the ref
  const firstPrefixRef = useRef<TextInput | null>(null);

  function updateAnswer(text: string, idAnswer: number, key: keyof Answer) {
    answers[idAnswer][key] = text;
    setAnswers(answers);
  }

  function addAnswer() {
    const moreAnswers = [...answers, { prefix: '', answer: '' }];
    setAnswers(moreAnswers);
  }

  function removeAnswer(position: number) {
    const moreAnswers = [
      ...answers.slice(0, position),
      ...answers.slice(position + 1, answers.length),
    ];
    setAnswers(moreAnswers);
  }

  async function sendSound() {
    setErrors([]);
    setLoading(true);
    try {
      await request('rounds', { method: 'POST' }, { question, answers, themeId, difficultyId });
      if (firstAnswerRef.current) {
        firstAnswerRef.current.clear();
      }
      if (firstPrefixRef.current) {
        firstPrefixRef.current.clear();
      }
      setAnswers([{ prefix: '', answer: '' }]);
      setQuestion('');
      setErrors([
        {
          rule: 'Success',
          message:
            'Ajout effectué avec succès, votre question va être étudié par un membre du staff !',
        },
      ]);
    } catch (e) {
      console.error(e);
      if (e.errors && e.errors.length > 0) {
        setErrors(e.errors);
      } else {
        setErrors([{ rule: 'API error', message: "Impossible de contacter l'API" }]);
      }
    }
    setLoading(false);
  }

  async function fetchThemes() {
    const response: Theme[] = await request('themes', {});
    setThemes(response);
    setThemeId(response[0].id);
  }

  async function fetchDifficulties() {
    const response: Difficulty[] = await request('difficulties', {});
    setDifficulties(response);
    setDifficultyId(response[2].id); // It's the most simple difficulty
  }

  function fetchData() {
    try {
      fetchDifficulties();
      fetchThemes();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CenterContainer footerEnable>
      <View>
        <View style={styles.formPart}>
          <Text fontFamily="title" fontSize="md" style={styles.title}>
            Catégorie:
          </Text>
          <Picker
            selectedValue={themeId}
            style={{
              backgroundColor: colors.text,
              color: colors.primary,
            }}
            onValueChange={(itemValue) => setThemeId(itemValue as number)}>
            {themes.map((categorie) => (
              <Picker.Item
                key={categorie.title}
                label={titleCase(categorie.title)}
                value={categorie.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.formPart}>
          <Text fontFamily="title" fontSize="md" style={styles.title}>
            Difficulté:
          </Text>
          <Picker
            selectedValue={difficultyId}
            style={{
              backgroundColor: colors.text,
              color: colors.primary,
            }}
            onValueChange={(itemValue) => setDifficultyId(itemValue as number)}>
            {difficulties.map((difficulty) => (
              <Picker.Item
                key={difficulty.title}
                label={titleCase(difficulty.title)}
                value={difficulty.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.formPart}>
          <Text fontFamily="title" fontSize="md" style={styles.title}>
            Question:
          </Text>
          <TextInput
            style={[styles.input, styles.question, { backgroundColor: colors.text }]}
            placeholder="Qui est le premier homme à avoir marché sur la lune ?"
            value={question}
            onChange={(data) => setQuestion(data.nativeEvent.text)}
          />
        </View>

        <View style={styles.formPart}>
          <Text fontFamily="title" fontSize="md" style={styles.title}>
            Réponse(s):
          </Text>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            {answers.map((answer, index) => {
              const add = index + 1 === answers.length && index < ROUND_LIMIT - 1;
              const remove = index > 0;
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    ref={index === 0 ? firstPrefixRef : null}
                    style={[styles.input, { backgroundColor: colors.text }]}
                    placeholder={`Déterminant ${index + 1}`}
                    onChange={(data) => updateAnswer(data.nativeEvent.text, index, 'prefix')}
                  />
                  <TextInput
                    ref={index === 0 ? firstAnswerRef : null}
                    style={[styles.input, { backgroundColor: colors.text }]}
                    placeholder={`Réponse ${index + 1}`}
                    onChange={(data) => updateAnswer(data.nativeEvent.text, index, 'answer')}
                  />
                  {remove && (
                    <TouchableOpacity onPress={() => removeAnswer(index)}>
                      <Ionicons name="md-remove-circle-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                  )}
                  {add && (
                    <TouchableOpacity onPress={addAnswer}>
                      <Ionicons name="md-add-circle-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.errors}>
          {errors.map((error) => (
            <Text fontFamily="title" fontSize="sm" key={error.rule}>
              {error.message}
            </Text>
          ))}
        </View>

        <View style={styles.formPart}>
          {loading ? (
            <ActivityIndicator focusable color={colors.text} />
          ) : (
            <Button onPress={sendSound} style={styles.button}>
              Envoyer
            </Button>
          )}
        </View>
      </View>
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  errors: {
    alignItems: 'center',
  },
  formPart: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    padding: 4,
  },
  button: {
    borderRadius: 20,
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },

  input: {
    borderRadius: 20,
    width: 200,
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    textAlign: 'center',
    height: 30,
    fontFamily: fontFamilies.text,
    fontSize: fontSizes.md,
    margin: 4,
  },

  question: {
    width: 420,
  },
});
