import React from "react";
import styled from "@emotion/styled";


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const Login = () => {
  const handleClickEvent = () => {


    const clientID = process.env.REACT_APP_CLIENT_ID;
    const redirectURI = "http://localhost:3000/";
    const apiURL = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=http://localhost:3000/&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
  };

  return (
    <Container>
      <ImgLogo
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
      />
      <button onClick={handleClickEvent}> Connect Spotify</button>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: #000;
    color: #49f585;
    font-size: 1.4rem;

    cursor: pointer;
  }
`;

const ImgLogo = styled.img`
  height: 20vh;
`;
