import {Box,TextField,Button,styled,Typography, useScrollTrigger} from '@mui/material'
import { useState } from 'react';
// handling css 
const Component = styled(Box)`
    width: 400px;
    margin: auto;//to do center align
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6)
`
// const Image = styled(img)//img is not a mui material , so error
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0  0',
})
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div,& > button,& > p {
        margin-top: 20px
    }
`
const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px
`;
const SignupButton = styled(Button)`
    text-transform: none;
    background: #ffffff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Text = styled(Typography) `
    color: #878787;
    font-size: 15px;
`

const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account,setAccount] = useState('login');
    const toggleSignup = () => {
        account === 'login' ? setAccount('signup') : setAccount('login');
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    account === 'login' ?
                    <Wrapper>
                        <TextField variant="standard" label="Enter username or email"/>
                        <TextField variant="standard" label="Enter password"/>
                        <LoginButton variant='contained'>Login</LoginButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                    </Wrapper>
                    : 
                    <Wrapper>
                        <TextField variant="standard" label="Enter name"/>
                        <TextField variant="standard" label="Enter username"/>
                        <TextField variant="standard" label="Enter email"/>
                        <TextField variant="standard" label="Enter password"/>
                        {/* <p></p> or use Typography of material UI*/}
                        <SignupButton>Sign Up</SignupButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;