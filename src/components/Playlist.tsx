import { useEffect } from "react";
import { useSteteProvider } from "../utils/StateProvider";
import axios from 'axios'
import { reducerCases } from "../utils/Constants";
import styled from "@emotion/styled";



const Playlist = () => {
    const [{token,playlists},dispatch] = useSteteProvider();

    useEffect(()=>{
        const getPlayListData = async () =>{
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists',
            {
                headers:
                {
                Authorization: "Bearer " + token,
                "Content-Type":"application/json",
            },
        }
        );
        const {items} = response.data
        const playlists = items.map(({name,id}:{name:string, id:string})=>{
            return { name , id}
        })
        dispatch({type:reducerCases.SET_PLAYLISTS, playlists});
        }
        getPlayListData();
    },[token,dispatch])

    const changeCurrentPlaylist = (selectedPlaylistId:string) =>{
        dispatch({
            type:reducerCases.SET_PLAYLIST_ID, 
            selectedPlaylistId
        });
        console.log(selectedPlaylistId)
    }


    return (
        <Conatiner> 
            <ul>
                {
                    playlists.map(({name,id}:{name:string, id:string})=>{
                        return (
                            <li key={id} onClick={() => changeCurrentPlaylist(id)}> {name} </li>
                        )
                    })
                }
            
            </ul>
        </Conatiner>
    );
};

export default Playlist;

const Conatiner = styled.div`
    height: 100%;
    overflow: hidden;
    ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding:1rem;
        height: 52vh;
        max-height: 100%;
        overflow: auto;

        &::-webkit-scrollbar{
            width: 0.7rem;
            &-thumb{
                background-color: rgba(255,255,255,0.6);
                /* 스크롤바 배경 */
            }
        }
        li{
            display: flex;
            gap: 1rem;
            cursor:pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                color:#fff;
            }
        }
    }
`