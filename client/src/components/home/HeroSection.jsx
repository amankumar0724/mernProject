import React, { useContext } from 'react';
import { styled, Box, Typography } from '@mui/material';
import { DataContext } from '../../contextAPI/DataProvider'; // Make sure this path is correct

const Image = styled(Box)`
    width: 100%;
    background: 
      linear-gradient(rgba(0, 0, 12, 0.5), rgba(47, 88, 109, 0.5)),
      url(hero2.jpg) center/55% no-repeat;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    background: linear-gradient(45deg, #FF0000, #FFA500, #FFFF00);
    line-height: 1;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
    background: linear-gradient(45deg, rgb(192, 79, 79), rgb(194, 150, 68), rgb(200, 200, 88));
    color: #FFFFFF;
    padding: 0 20px; // Apply padding only to left and right
    border-radius: 7px;
`;

const UserName = styled(Typography)`
    font-size: 30px;
    background: linear-gradient(45deg, #FF0000, #FFA500, #FFFF00);
    line-height: 1;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`;

const HeroSection = () => {
    // const { account } = useContext(DataContext);

    return (
        <Image>
            <Heading>ThinkSync</Heading>
            <SubHeading>Think Write Sync</SubHeading>
            {/* {account?.name && (
                <UserName>Welcome {account.name}</UserName> 
            )} */}
        </Image>
    );
};

export default HeroSection;
