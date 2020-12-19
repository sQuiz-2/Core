import homeSocketState from '@Src/global/homeSocket';
import { RoomEvent } from '@squiz/shared';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHomeSocketError() {
  const homeSocket = useRecoilValue(homeSocketState);
  const [error, setError] = useState<null | string>(null);

  function listenError() {
    homeSocket!.on(RoomEvent.CustomError, (err: string) => {
      setError(err);
    });
    homeSocket!.on(RoomEvent.Error, (err: string) => {
      setError(err);
    });
  }

  useEffect(() => {
    if (!homeSocket) return;
    listenError();
  }, [homeSocket]);

  return error;
}
