import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { API } from '../../services/api.js';
import { DataContext } from '../../contextAPI/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

// handling css 
const Component = styled(Box)`
    width: 400px;
    margin: auto; /* to center align */
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #ffffff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 15px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const Image = styled('img')({
    width: 150,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0',
});

const signupInitialValues = {
    name: '',
    username: '',
    email: '',
    password: ''
};

const loginInitialValues = {
    usernameOrEmail: '',
    password: ''
};

const Login = ({ setIsUserAuthenticated }) => {
    const imageURL = '/ThinkSyncLogo.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);
    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        try {
            console.log("Signup Data:", signup);
            console.log("API.userSignup:", API.userSignup);
            const response = await API.userSignup(signup);
            console.log(response);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleSignup();
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError(error.response?.data?.msg || "Something went wrong!");
        }
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        const response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({
                username: response.data.username,
                name: response.data.name,
                email: response.data.email
            });
            setIsUserAuthenticated(true);
            navigate('/');
        } else {
            setError('Something went wrong !!!');
        }
    };

    const toggleSignup = () => {
        account === 'login' ? toggleAccount('signup') : toggleAccount('login');
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {account === 'login' ? (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={login.usernameOrEmail || ''}
                            onChange={(e) => onValueChange(e)}
                            name='usernameOrEmail'
                            label="Enter username or email"
                        />
                        <TextField
                            type="password" // password field hidden by dots
                            variant="standard"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name='password'
                            label="Enter password"
                        />

                        {error && <Error>{error}</Error>}
                        <LoginButton variant='contained' onClick={loginUser}>
                            Login
                        </LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={toggleSignup}>
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={signup.name || ''}
                            onChange={(e) => onInputChange(e)}
                            label="Enter name"
                            name='name'
                        />
                        <TextField
                            variant="standard"
                            value={signup.username || ''}
                            onChange={(e) => onInputChange(e)}
                            label="Enter username"
                            name='username'
                        />
                        <TextField
                            variant="standard"
                            value={signup.email || ''}
                            onChange={(e) => onInputChange(e)}
                            label="Enter email"
                            name='email'
                        />
                        <TextField
                            type="password" // password field hidden by dots
                            variant="standard"
                            value={signup.password || ''}
                            onChange={(e) => onInputChange(e)}
                            label="Enter password"
                            name='password'
                        />

                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={signupUser}>
                            Sign Up
                        </SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant='contained' onClick={toggleSignup}>
                            Already have an account
                        </LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;
