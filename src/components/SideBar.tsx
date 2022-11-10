/** @format */

import React from "react";
import styled from "@emotion/styled";
import { IoLibrary } from 'react-icons/io5'
import { MdHomeFilled, MdSearch} from 'react-icons/md'
import Playlist from "./Playlist";
const SideBar = () => {
  return (
    <Container>
      <div className="top__list">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify"
          />
        </div>
        <ul>
            <li>
                <MdHomeFilled/>
                <span>Home</span>
            </li>
            <li>
                <MdSearch/>
                <span>Search</span>
            </li>
            <li>
                <IoLibrary/>
                <span>Your Library</span>
            </li>
        </ul>
      </div>
      <Playlist/>
    </Container>
  );
};

export default SideBar;

const Container = styled.section`
  background-color: #000;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__list{
    display: flex;
    flex-direction: column;
    .logo{
        text-align: center;
        margin: 1rem 0;
        img{
            max-inline-size: 80%;
            block-size: auto;
        }
    }
    ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding:1rem;
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
  }
`;
