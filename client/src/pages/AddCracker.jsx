import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';


export default function AddCracker(){
    const [form, setForm] = useState({ name:'', sku:'', price:'', stock:'', description:'' });
    const nav = useNavigate();


    const change = e => setForm({...form, [e.target.name]: e.target.value});


    const submit = async e => {
        e.preventDefault();
        try {
            await API.post('/crackers', { ...form, price: Number(form.price), stock: Number(form.stock) });
            alert('Added');
            nav('/crackers');
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to add');
        }
    };

    return (
        <div className="card" style={{maxWidth:640}}>
            <h2>Add Cracker (Admin)</h2>
            <form onSubmit={submit}>
                <input className="input" name="name" placeholder="Name" value={form.name} onChange={change} required />
                <input className="input" name="sku" placeholder="SKU (optional)" value={form.sku} onChange={change} />
                <input className="input" name="price" placeholder="Price" value={form.price} onChange={change} required />
                <input className="input" name="stock" placeholder="Stock" value={form.stock} onChange={change} required />
                <textarea className="input" name="description" placeholder="Description" value={form.description} onChange={change} />
                <button className="btn" type="submit">Save</button>
            </form>
        </div>
    );
}