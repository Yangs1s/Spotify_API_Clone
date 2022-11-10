import React from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useSteteProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';


const Volume = () => {
    const [{token}] = useSteteProvider();
    const setVolume = async(e:React.ChangeEvent<HTMLInputElement>) => {
        await axios.put(
           `https://api.spotify.com/v1/me/player/volume`, 
            {

            }
        ,{
        params:{
                volume_percent:parseInt(e.target.value),
            },
            headers:
            {
            Authorization: "Bearer " + token,
            "Content-Type":"application/json",
        },
    }
    );

    // dispatch({type:reducerCases.SET_PLAYER_STATE, playerState});
}

    return (
        <Container>
            <input type="range" min={0} max={100} onMouseUp={((e:any)=>setVolume(e))} />
        </Container>
    );
};

export default Volume;


const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    input{
        width: 15rem;
        border-radius: 2rem;
        height: 0.5rem;
    }
`