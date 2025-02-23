import React from 'react';
import { AppBar, styled, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background:rgb(230, 230, 184);
    color: #000;
`;

const StyledToolbar = styled(Toolbar)`
    position: relative;
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 20px;
`;

const NavLinks = styled('div')`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;

    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        font-weight: 450;
        transition: color 0.3s ease-in-out;
        position: relative;

        &:hover {
            color: #c04f4f;
        }

        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px; /* Positions the line just below the text */
            height: 2px;
            width: 0;
            background: #c04f4f;
            transition: width 0.3s ease-in-out;
        }

        &:hover:after {
            width: 100%;
        }
    }
`;

const Logo = styled('img')`
    height: 30px;
    width: auto;
    transform: scale(1.5);
    transform-origin: left center;  
    background: transparent;
    mix-blend-mode: multiply; /* Blends white parts with the header's black background */
`;

function Header() {
  return (
    <Component position="fixed">
      <StyledToolbar>
        <Link to={'/'}>
          <Logo src="ThinkSyncLogo.png" alt="ThinkSync Logo" />
        </Link>
        <NavLinks>
          <Link to={'/'}>HOME</Link>
          <Link to={'/about'}>ABOUT</Link>
          <Link to={'/contact'}>CONTACT</Link>
          <Link to={'/login'}>LOGOUT</Link>
        </NavLinks>
      </StyledToolbar>
    </Component>
  );
}

export default Header;
