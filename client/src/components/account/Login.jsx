import {Box,TextField,Button,styled,Typography} from '@mui/material'
import { useState } from 'react';
import { API } from '../../services/api.js';
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

const signupInitialValues = {
    name:'',
    username:'',
    email:'',
    password:''
};
const Error = styled(Typography) `
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight: 600;
`





const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account,setAccount] = useState('login');
    const [signup,setSignup] = useState(signupInitialValues);
    const [error,setError] = useState('');
    const toggleSignup = () => {
        account === 'login' ? setAccount('signup') : setAccount('login');
    }
    const onInputChange = (e) => {
        // setSignup(e.target.name,e.target.value);
        // we dont want to override values of fields, rather we need to append so instead of line 65 use 67
        setSignup({...signup,[e.target.name]:e.target.value});

    }

    const signupUser = async () => {
        const response = await API.userSignup(signup)
        console.log(response);
        if(response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleSignup('login');
        } else {
            setError('Something went wrong !!!');

        }

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
                        {error && <Error>{error}</Error>}
                        <LoginButton variant='contained'>Login</LoginButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                    </Wrapper>
                    : 
                    <Wrapper>
                        <TextField variant="standard" 
                        onChange={(e) => onInputChange(e)}
                        label="Enter name"
                        name='name'/>
                        <TextField variant="standard" 
                        onChange={(e) => onInputChange(e)}
                        label="Enter username"
                        name='username'/>
                        <TextField variant="standard"
                        onChange={(e) => onInputChange(e)}
                        label="Enter email"
                        name='email'/>
                        <TextField variant="standard" 
                        onChange={(e) => onInputChange(e)}
                        label="Enter password"
                        name='password'/>
                        {/* <p></p> or use Typography of material UI*/}

                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;