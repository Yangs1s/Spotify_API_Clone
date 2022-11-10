
import styled from '@emotion/styled';
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import { useSteteProvider } from '../utils/StateProvider';

interface NavBarType{
    navBackgroundColor:any
}
const NavBar = (props:NavBarType) => {
    const [{userInfo}]=useSteteProvider();
    return (
        <Container navBackground={props.navBackgroundColor}>
            <div className="search__bar">
                <FaSearch/>
                <input type="text" placeholder='Artists, songs, or podcasts' />
            </div>
            <div className="avatar">
                <a href="#">
                    <CgProfile/>
                    <span>{userInfo?.userName}</span>
                </a>
            </div>
        </Container>
    );
};

export default NavBar;


const Container = styled.nav<{navBackground:string|number}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:2rem;
    height: 15vh;
    position: sticky;
    top:0;
    transition: 0.3s ease-in-out;
    background-color: ${(props) =>props.navBackground ? "rgba(0,0,0,0.7)":"none" };
    .search__bar{
        background-color: #fff;
        width: 30%;
        padding: 0.4rem 1rem;
        border-radius: 2rem;
        display:flex;
        align-items: center;
        gap:0.5rem;
        input{
            border:none;
            height: 2rem;
            width: 100%;
            &:focus{
                outline: none;
            }
        };
    }
        .avatar{
            background-color: #000;
            padding: 0.3rem 0.4rem;
            padding-right: 1rem;
            border-radius:2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
                text-decoration: none;
                color:#fff;
                font-weight: bold;
                svg{
                    font-size: 1.3rem;
                    background-color: #282828;
                    padding: 0.2rem;
                    border-radius: 1rem;

                    color:#c7c5c5
                }
            }
        };
    
`