import { Difficulties, GetGame, GetGames } from '@squiz/shared';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Spinner from 'src/components/Spinner';
import { ActionsCell, CellProps, DropDownCell, EditableCell, Table } from 'src/components/Table';

import RequestErrors from '../components/RequestErrors';
import { get, put, remove } from '../tools/WrappedFetch';

export default function Rounds() {
  return <></>;
}
