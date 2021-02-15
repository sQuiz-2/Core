import userBasicInfoState from '@Src/global/userBasicInfos';
import useListener from '@Src/utils/hooks/useListener';
import { GameEvent } from '@squiz/shared';
import { useRecoilState } from 'recoil';

export default function useGameEndPlayerInfosListener() {
  useListener(GameEvent.GameEndPlayerInfos, updatePlayerInfos);
  const [userBasicInfo, setUserBasicInfo] = useRecoilState(userBasicInfoState);

  function updatePlayerInfos({ experience }: { experience: number }) {
    if (!userBasicInfo) return;
    setUserBasicInfo({ ...userBasicInfo, experience: userBasicInfo.experience + experience });
  }
}
