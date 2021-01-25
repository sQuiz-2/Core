import Delete from '@material-ui/icons/Delete';
import Refresh from '@material-ui/icons/Refresh';
import { GetReportedRound, GetRound, ReportDetail, ReportProps } from '@squiz/shared';
import { useCallback, useState, FocusEvent } from 'react';
import { Table } from 'src/components/Table';
import useFetchPage from 'src/hooks/useFetchPage';
import useRemoveRow from 'src/hooks/useRemoveRow';
import useUpdateRow from 'src/hooks/useUpdateRow';
import { put } from 'src/tools/WrappedFetch';

import useGameColumn from './useRoundColumn';

interface FormatReported extends GetRound {
  report: ReportProps;
}

export default function Reported() {
  const { fetchPage, maxPage } = useFetchPage<GetReportedRound[]>('rounds');
  const [displayData, setDisplayData] = useState<FormatReported[]>([]);
  const { removeRow } = useRemoveRow<FormatReported>(displayData, setDisplayData, 'rounds/');
  const { updateRow, requestEdit } = useUpdateRow<FormatReported>(
    displayData,
    setDisplayData,
    'rounds/'
  );
  const columns = useGameColumn({ displayData, updateData: updateRow, removeData: removeRow });

  async function updateData({ pageIndex = 1, pageSize = 5, question = '' }) {
    const data = await fetchPage(pageIndex, pageSize, `question=${question}&reported=true`);
    if (!data) return;
    const formattedData = data.map(({ round, ...reportProps }) => ({
      ...round,
      report: reportProps,
    }));
    setDisplayData(formattedData);
  }

  const fetchData = useCallback(async (page) => {
    updateData(page);
  }, []);

  // Create a function that will render our row sub components
  const renderRowSubComponent = useCallback(
    ({ row }) => {
      const round = row.values;

      const reports = displayData
        .map(({ report }) => {
          if (round.id === report.roundId) {
            return report;
          }
        })
        .filter((report) => report)[0];

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
        const res: FormatReported = (await requestEdit(round)) as FormatReported;
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

      function resetReport(id: number) {
        const editedRound = displayData.filter((data) => data.id !== round.id);
        put('reports/reset/' + id, {});
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
          {reports && (
            <>
              <button onClick={() => resetReport(reports.id)}>
                <Refresh className="hover:text-blue-500" />
              </button>
              {ReportDetail.map(({ type, detail }) => (
                <p key={type}>
                  {detail}: {reports?.[type]}
                </p>
              ))}
            </>
          )}
        </pre>
      );
    },
    [displayData]
  );

  return (
    <Table
      renderRowSubComponent={renderRowSubComponent}
      columns={columns}
      data={displayData}
      fetchData={fetchData}
      maxPage={maxPage}
    />
  );
}
