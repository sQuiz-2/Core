import { Delete } from '@material-ui/icons';
import { GetThemes } from '@squiz/shared';
import { useState, useRef, FocusEvent, MouseEvent, FormEvent } from 'react';
import { useQuery } from 'react-query';
import useDifficulties from 'src/hooks/useDifficulties';
import { get, post } from 'src/tools/WrappedFetch';

const selectGuesses = [
  { id: 1, title: 1 },
  { id: 2, title: 2 },
  { id: 3, title: 3 },
  { id: 4, title: 4 },
];

export default function CreateRound() {
  const formRef = useRef<HTMLFormElement | null>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [theme, setTheme] = useState<number>(4);
  const [life, setLife] = useState<number>(4);
  const [errors, setErrors] = useState<any>([]);
  const { data: themes } = useQuery('themes', () => {
    return get<GetThemes>('themes');
  });
  const difficulties = useDifficulties();

  async function edit(e: FocusEvent<HTMLInputElement>, id: number) {
    answers[id] = e.target.value;
    setAnswers(answers);
  }

  async function add(e: FocusEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!value || value.length < 1) return;
    setAnswers([...answers, value]);
    e.target.value = '';
  }

  function remove(e: MouseEvent<HTMLElement>, DeletedId: number) {
    e.preventDefault();
    const NewAnswers = answers.filter((_answer: string, id) => id !== DeletedId);
    setAnswers(NewAnswers);
  }

  async function createRound(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    const formatedAnswers = answers.map((value) => ({ answer: value }));
    try {
      await post('rounds', {
        question,
        answers: formatedAnswers,
        themeId: theme,
        difficultyId: difficulty,
        maxNumberOfGuesses: life,
      });
      setQuestion('');
      setAnswers([]);
    } catch (e) {
      if (e.errors) {
        setErrors(e.errors);
      }
      console.error(e);
    }
  }

  return (
    <>
      <hr className="border-0 bg-gray-500 text-gray-500 h-px my-4" />
      <h3 className="text-lg pb-4">Ajouter une question</h3>
      <form ref={(ref) => (formRef.current = ref)} onSubmit={createRound}>
        <div className="p-1">
          <label>Question:</label>
          <input
            name="question"
            className="border-2 border-black ml-1 w-96"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="p-1">
          <pre>
            {answers.map((answer, id) => (
              <p key={id}>
                Réponse {id}:
                <input
                  className="border-2 border-black ml-1"
                  defaultValue={answer}
                  onBlur={(e) => edit(e, id)}
                />
                <button onClick={(e) => remove(e, id)}>
                  <Delete className="hover:text-red-500" />
                </button>
              </p>
            ))}
            <p>
              Réponse {answers.length}:
              <input
                className="border-2 border-black ml-1"
                defaultValue=""
                onBlur={(e) => add(e)}
              />
            </p>
          </pre>
        </div>
        <div className="p-1">
          <label>Nombre d'essais</label>
          <select value={life} onChange={(e) => setLife(Number(e.target.value))} className="ml-1">
            {selectGuesses.map(({ id, title }) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="p-1">
          <label>Difficulté</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="ml-1">
            {difficulties.map(({ id, title }) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="p-1">
          <label>Thème</label>
          {themes && (
            <select
              value={theme}
              onChange={(e) => setTheme(Number(e.target.value))}
              className="ml-1">
              {themes.map(({ id, title }) => (
                <option value={id} key={id}>
                  {title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="p-1">
          <button>Ajouter</button>
        </div>
        <div className="bg-red-400">
          {errors.map((error: any) => (
            <p>- {error.message}</p>
          ))}
        </div>
      </form>
    </>
  );
}
