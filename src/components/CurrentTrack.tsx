import styled from '@emotion/styled';
import axios from 'axios';
import React,{useEffect} from 'react';
import { reducerCases } from '../utils/Constants';
import { useSteteProvider } from '../utils/StateProvider';

const CurrentTrack = () => {
    const [{ token,currentlyPlaying }, dispatch] = useSteteProvider()
    console.log("component",currentlyPlaying)
    useEffect(()=>{
        const getCurrentTrack = async () =>{
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
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
          }
        }
        getCurrentTrack();
    },[token,dispatch])


    return (
        <Container>
            {currentlyPlaying &&
            (
                <div className="track">
                    <div className="track__image">
                        <img src={currentlyPlaying.image} alt="currentlyPlaying" />
                    </div>
                    <div className="track__info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
            }
        </Container>
    );
};

export default CurrentTrack;
const Container =styled.div`
    .track{
        display: flex;
        align-items: center;
        gap: 1rem;
        &__info{
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            cursor: pointer;
            h4{
                color:#fff;
            }
            h6{
                color:#b3b3b3
            }

        }
    }
`