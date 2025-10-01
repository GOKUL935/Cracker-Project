import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';


export default function UserLogin(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const nav = useNavigate();


    const submit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            nav('/');
        } catch (err) { alert(err.response?.data?.msg || 'Login failed'); }
    };

    return (
        <div className="card" style={{maxWidth:420}}>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
                <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    );
}