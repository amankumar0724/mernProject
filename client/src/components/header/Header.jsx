import React, { useContext, useState } from 'react';
import { AppBar, styled, Toolbar, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../contextAPI/DataProvider';

const Component = styled(AppBar)`
    background: rgb(230, 230, 184);
    color: #000;
`;

const StyledToolbar = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
            bottom: -2px;
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
    mix-blend-mode: multiply;
`;

const AccountContainer = styled('div')`
    display: flex;
    align-items: center;
    gap: 15px;
`;

// Styled Avatar for better visibility and UI
const StyledAvatar = styled(Avatar)`
    width: 45px;
    height: 45px;
    border: 2px solid #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #FFA500;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
        border-color:#c04f4f;
    }
`;

function Header({ setIsUserAuthenticated }) {
    const { account, setAccount } = useContext(DataContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        setAccount(null);
        setIsUserAuthenticated(false);
        navigate('/login'); // Redirect to login page
        handleClose();
    };

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
                </NavLinks>
                <AccountContainer>
                    {account?.username ? (
                        <>
                            <IconButton onClick={handleClick}>
                                <StyledAvatar src={account.profilePic || ''}>
                                    {!account.profilePic && account.username[0].toUpperCase()}
                                </StyledAvatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={logoutUser}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link to={'/login'}>
                            <IconButton>
                                <StyledAvatar />
                            </IconButton>
                        </Link>
                    )}
                </AccountContainer>
            </StyledToolbar>
        </Component>
    );
}

export default Header;
