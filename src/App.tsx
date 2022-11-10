import React, { useEffect } from 'react';
import Login from './components/Login';
import Spotify from './components/Spotify';
import { reducerCases } from './utils/Constants';
import { useSteteProvider } from './utils/StateProvider';

const App = () => {

  const [{token},dispatch] = useSteteProvider();
  useEffect(()=>{
    const hash = window.location.hash; // accessToken 위치을 알수 있음
    if(hash){
      const token = hash.substring(1).split('&')[0].split('=')[1] // accessToken만 출력
      dispatch({type:reducerCases.SET_TOKEN, token})
    }
  },[token,dispatch])
  return (
    <main>
      {
        token ? <Spotify/>
        : <Login/>
      }
    </main>
  );
};

export default App;

