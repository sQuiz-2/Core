import Delete from '@material-ui/icons/Delete';
import { GetRound } from '@squiz/shared';
import { useCallback, useState, FocusEvent, FormEvent, useRef } from 'react';
import { Table } from 'src/components/Table';
import useFetchPage from 'src/hooks/useFetchPage';
import useRemoveRow from 'src/hooks/useRemoveRow';
import useUpdateRow from 'src/hooks/useUpdateRow';

import CreateRound from './Create/CreateRound';
import TestAnswer from './Create/TestAnswer';
import useGameColumn from './useRoundColumn';

export default function Rounds() {
  const form = useRef<HTMLFormElement | null>(null);
  const [questionSearch, setQuestionSearch] = useState('');
  const { fetchPage, maxPage } = useFetchPage<GetRound[]>('rounds');
  const [displayData, setDisplayData] = useState<GetRound[]>([]);
  const { removeRow } = useRemoveRow<GetRound>(displayData, setDisplayData, 'rounds/');
  const { updateRow, requestEdit } = useUpdateRow<GetRound>(displayData, setDisplayData, 'rounds/');
  const columns = useGameColumn({ displayData, updateData: updateRow, removeData: removeRow });

  async function updateData({ pageIndex = 1, pageSize = 5, question = questionSearch }) {
    const data = await fetchPage(pageIndex, pageSize, `question=${question}&reported=false`);
    if (!data) return;
    setDisplayData(data);
  }

  const fetchData = useCallback(async (page) => {
    updateData(page);
  }, []);

  // Create a function that will render our row sub components
  const renderRowSubComponent = useCallback(
    ({ row }) => {
      const round = row.values;

      async function edit(e: FocusEvent<HTMLInputElement>, id: number) {
        round.answers.map((answer: any) => {
          if (answer.id === id) {
            answer.answer = e.target.value;
          }
          return answer;
        });
        requestEdit(round);
      }

      async function add(e: FocusEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (!value || value.length < 1) return;
        round.answers.push({ answer: e.target.value });
        const res: GetRound = (await requestEdit(round)) as GetRound;
        const editedRound = displayData.map((data) => {
          if (data.id === round.id) {
            return res;
          }
          return data;
        });
        setDisplayData(editedRound);
        e.target.value = '';
      }

      function remove(id: number) {
        round.answers = round.answers.filter((answer: any) => answer.id !== id);
        const editedRound = displayData.map((data) => {
          if (data.id === round.id) {
            return round;
          }
          return data;
        });
        requestEdit(round);
        setDisplayData(editedRound);
      }
      const answers = row.values.answers;

      return (
        <pre>
          {answers.map(({ id, answer }: any, i: number) => (
            <p key={id}>
              Réponse {i}: <input defaultValue={answer} onBlur={(e) => edit(e, id)} />
              <button onClick={() => remove(id)}>
                <Delete className="hover:text-red-500" />
              </button>
            </p>
          ))}
          <p>
            Réponse {answers.length}: <input defaultValue="" onBlur={(e) => add(e)} />
          </p>
        </pre>
      );
    },
    [displayData]
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.current) return;
    const { question } = form.current;
    setQuestionSearch(question.value);
    updateData({ question: question.value });
  }

  return (
    <>
      <form ref={(ref) => (form.current = ref)} onSubmit={handleSubmit}>
        <input name="question" placeholder="Question" type="text" />
        <button> Chercher </button>
      </form>
      <Table
        renderRowSubComponent={renderRowSubComponent}
        columns={columns}
        data={displayData}
        fetchData={fetchData}
        maxPage={maxPage}
      />
      <CreateRound />
      <TestAnswer />
    </>
  );
}
