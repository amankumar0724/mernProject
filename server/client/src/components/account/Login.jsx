import { 
    Box, TextField, Button, styled, Typography, CircularProgress, InputAdornment, IconButton 
} from '@mui/material';
import { useState, useContext } from 'react';
import { API } from '../../services/api.js';
import { DataContext } from '../../contextAPI/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styling Components
const Component = styled(Box)`
    width: 400px;
    margin: auto;
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

const Loader = styled(Box)`
    display:flex;
    justify-content:center;
    align-items: center;
    min-height : 100vh;
`;

// Initial Values
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
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);
    const [showPassword, setShowPassword] = useState(false);
    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        setLoading(true);
        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleSignup();
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError("Something went wrong!");
        }
        setLoading(false);
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        setLoading(true);
        try {
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
            } 
        } catch (error) {
            console.log(error)
            if (error.code === 503) {
                setError('Something went wrong, check your internet connection');
            } else {
                setError('Wrong credentials!!!');
            }
        }
        setLoading(false);
    };

    const toggleSignup = () => {
        account === 'login' ? toggleAccount('signup') : toggleAccount('login');
    };

    return (
        <>
            {loading ? (
                <Loader>
                    <CircularProgress sx={{ color: '#c04f4f' }} />
                </Loader>
            ) : (
                <Component>
                    <Box>
                        <Image src={imageURL} alt="login" />
                        {account === 'login' ? (
                            <Wrapper>
                                <TextField
                                    variant="standard"
                                    value={login.usernameOrEmail || ''}
                                    onChange={onValueChange}
                                    name='usernameOrEmail'
                                    label="Enter username or email"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircleIcon fontSize="small" sx={{ color: 'gray' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    variant="standard"
                                    value={login.password}
                                    onChange={onValueChange}
                                    name='password'
                                    label="Enter password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOff fontSize="small" sx={{ color: 'gray' }} /> : <Visibility fontSize="small" sx={{ color: 'gray' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { paddingRight: '4px' }
                                    }}
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
                                    onChange={onInputChange}
                                    label="Enter name"
                                    name='name'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonIcon fontSize="small" sx={{ color: 'gray' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    variant="standard"
                                    value={signup.username || ''}
                                    onChange={onInputChange}
                                    label="Enter username"
                                    name='username'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircleIcon fontSize="small" sx={{ color: 'gray' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    variant="standard"
                                    value={signup.email || ''}
                                    onChange={onInputChange}
                                    label="Enter email"
                                    name='email'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <EmailIcon fontSize="small" sx={{ color: 'gray' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    variant="standard"
                                    value={signup.password || ''}
                                    onChange={onInputChange}
                                    label="Enter password"
                                    name='password'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end" >
                                                    {showPassword ? <VisibilityOff fontSize="small" sx={{ color: 'gray' }} /> : <Visibility fontSize="small"  sx={{ color: 'gray' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { paddingRight: '4px' }
                                    }}
                                />
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
            )}
        </>
    );
};

export default Login;
