import CssBaseline from '@material-ui/core/CssBaseline';
import { RecoilRoot } from 'recoil';

import MainRouter from './router/Main';

export default function App() {
  return (
    <>
      <RecoilRoot>
        <CssBaseline />
        <MainRouter />
      </RecoilRoot>
    </>
  );
}
