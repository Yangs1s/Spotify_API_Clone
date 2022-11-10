import styled from '@emotion/styled';
import axios from 'axios';
import React from 'react';
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { reducerCases } from '../utils/Constants';
import { useSteteProvider } from '../utils/StateProvider';
const PlayerControls = () => {
    const [{ token,playerState }, dispatch] = useSteteProvider();

    const changeState = async() =>{
        const state =playerState ? "pause" : "play";
        console.log(state)
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers:
                {
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token,
            },
        }
    );
    dispatch({
            type:reducerCases.SET_PLAYER_STATE, 
            playerState:!playerState
        });
    }


    const changeTrack = async(type:string) =>{
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`, 
            {

            }
        ,{
            headers:
            {
            Authorization: "Bearer " + token,
            "Content-Type":"application/json",
        },
    }
    );

    dispatch({type:reducerCases.SET_PLAYER_STATE, playerState});

    const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers:
            {
            Authorization: "Bearer " + token,
            "Content-Type":"application/json",
        },
    }
    );

    if(response.data !== ""){
        const {item } = response.data
        const currentPlaying = {
            id:item.id,
            name:item.name,
            artists:item.artists.map((artist:any) => artist.name),
            image:item.album.images[2].url,
        }
        dispatch({type:reducerCases.SET_PLAYING, currentPlaying});
    }else {
        dispatch({type:reducerCases.SET_PLAYING, currentPlaying:null})
    }
    
};


    return (
        <Container>
            <div className="shuffle">
                <BsShuffle/>
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={()=> changeTrack("previous")}/>
            </div>
            <div className="state">
                {playerState ? (<BsFillPauseCircleFill onClick={changeState}/>) :(<BsFillPlayCircleFill onClick={changeState}/>)}
            </div>
            <div className="next" onClick={()=> changeTrack("next")}>
                <CgPlayTrackNext/>
            </div>
            <div className="repeat">
                <FiRepeat/>
            </div>
        </Container>
    );
};

export default PlayerControls;

const Container =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    svg{
        color: #b3b3b3;
        transition:  0.2s ease-in-out;
        &:hover{
            color:#fff;
        }
    }
    .state{
        svg{
            color: #fff;
        }
    }
    .previous,.next,.state{
        font-size: 2.3rem;
    }

`