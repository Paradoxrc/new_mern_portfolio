import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/rootSlice';

function Login() {
    const login = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/admin-login', user);
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                localStorage.setItem('token', response.data);
                window.location.reload();
            }
            else{
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());

        }

    }

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const dispatch =useDispatch();
  return (
    <div>
        <h1>Login</h1>
        <input type="text" placeholder='username' onChange={(e) => setUser({...user, username: e.target.value})} />
        <input type="password" placeholder='password' onChange={(e) => setUser({...user, password: e.target.value})} />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login