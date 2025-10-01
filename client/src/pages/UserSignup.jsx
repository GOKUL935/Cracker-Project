import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function UserSignup(){
    const [form, setForm] = useState({ name:'', email:'', password:'' });
    const nav = useNavigate();

    const change = e => setForm({...form, [e.target.name]: e.target.value});

    const submit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/signup', form);
            if(res.data.success){
                alert("Registration Success ✅");
                nav('/login');
            } else {
                alert(res.data.message || "Registration Failed ❌");
            }
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed ❌');
        }
    };

    return (
        <div className="card" style={{maxWidth:480}}>
            <h2>Customer Signup</h2>
            <form onSubmit={submit}>
                <input className="input" name="name" placeholder="Name" value={form.name} onChange={change} required />
                <input className="input" name="email" placeholder="Email" value={form.email} onChange={change} required />
                <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={change} required />
                <button className="btn" type="submit">Sign up</button>
            </form>
        </div>
    );
}
