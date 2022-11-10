/** @format */

import styled from "@emotion/styled";
import axios from "axios";
import { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
import { useSteteProvider } from "../utils/StateProvider";

interface trackType {
    id: string;
    name: string;
    artists: string;
    image: string;
    duration: any;
    album: string;
    context_uri: string;
    track_number: number;
    }

    type BodyProps = {
    headerBackground: string;
    };

    const Body = (props: BodyProps) => {
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
        useSteteProvider();

    useEffect(() => {
        const getInitailPlayList = async () => {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
            {
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
            },
            }
        );
        const selectedPlaylist = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
            image: response.data.images[0].url,
            tracks: response.data.tracks.items.map(({ track }: any) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist: any) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
            })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
        };
        getInitailPlayList();
    }, [token, dispatch, selectedPlaylistId]);

    const msToMinutesAndSeconds = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds: number = Number(((ms % 60000) / 1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };


    const playTrack = async(id:string,name:string,artist:string,image:string,context_uri:string,track_number:number) =>{
        const response =await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                context_uri,
                offset:{
                    position:track_number-1,
                },
                position_ms:0,
            },
            {
                headers:
                {
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token,
            },
        }
    );
    if(response.status === 204){
        const currentPlaying = {
            id,name,artist,image
        }
        dispatch({
                type:reducerCases.SET_PLAYING, 
                currentPlaying
            });
        dispatch({
                type:reducerCases.SET_PLAYER_STATE, 
                playerState:true
            });
        }
        else {
        dispatch({
                type:reducerCases.SET_PLAYER_STATE, 
                playerState:true
            });
    }
    }
    return (
        <Container headerBackground={props.headerBackground}>
        {selectedPlaylist && (
            <>
            <div className="playlist">
                <div className="image">
                <img src={selectedPlaylist.image} alt="selectedPlaylist" />
                </div>
                <div className="details">
                <span className="type">PLAYLIST</span>
                <h1 className="title">{selectedPlaylist.name}</h1>
                <p className="description">{selectedPlaylist.description}</p>
                </div>
            </div>
            <div className="list">
                <div className="header_row">
                <div className="col">
                    <span>#</span>
                </div>
                <div className="col">
                    <span>TITLE</span>
                </div>
                <div className="col">
                    <span>ALBUM</span>
                </div>
                <div className="col">
                    <span>
                    <AiFillClockCircle />
                    </span>
                </div>
                </div>
                <div className="tracks">
                {selectedPlaylist.tracks.map(
                    (
                    {
                        id,
                        name,
                        artists,
                        image,
                        duration,
                        album,
                        context_uri,
                        track_number,
                    }: trackType,
                    index: number
                    ) => {
                    return (
                        <div className="row" key={id} onClick={()=> playTrack(id,name,artists,image,context_uri,track_number)}>
                        <div className="col">
                            <span>{index + 1}</span>
                        </div>
                        <div className="col detail">
                            <div className="image">
                            <img src={image} alt="track" />
                            </div>
                            <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists}</span>
                            </div>
                        </div>
                        <div className="col">
                            <span>{album}</span>
                        </div>
                        <div className="col">
                            <span>{msToMinutesAndSeconds(duration)} </span>
                        </div>
                        </div>
                    );
                    }
                )}
                </div>
            </div>
            </>
        )}
        </Container>
    );
    };

    export default Body;

    const Container = styled.section<{ headerBackground: string }>`
    .playlist {
        margin: 0 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        .image {
        img {
            height: 15rem;
            box-shadow: rgba(0, 0, 0 0.25) 0px 25px 50px -12px;
        }
        }
        .details {
        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
        color: #e0dede;
        .title {
            color: #fff;
            font-size: 4rem;
        }
        }
    }
    .list {
        .header_row {
        display: grid;
        grid-template-columns: 0.3fr 3fr 2.3fr 0.1fr;
        color: #dddcdc;
        margin: 1rem 0 0 0;
        position: sticky;
        top: 15vh;
        padding: 1rem 3rem;
        transition: 0.3s ease-in-out;
        background-color: ${(props) =>
            props.headerBackground ? "#000000dc" : "none"};
        }
        .tracks {
        margin: 0 2rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 5rem;
        .row {
            padding: 0.5rem 1rem;
            display: grid;
            grid-template-columns: 0.3fr 3.1fr 2.1fr 0.1fr;
            cursor: pointer;
            &:hover {
            background-color: rgba(0, 0, 0, 0.7);
            }
            .col {
            display: flex;
            align-items: center;
            color: #dddcdc;
            img {
                height: 40px;
            }
            }
            .detail {
            display: flex;
            gap: 1rem;
            .info {
                display: flex;
                flex-direction: column;
            }
            }
        }
        }
    }
    `;
