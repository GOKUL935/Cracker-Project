import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';


export default function PlaceOrder(){
    const { id } = useParams();
    const nav = useNavigate();
    const [cracker, setCracker] = useState(null);
    const [qty, setQty] = useState(1);
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');


    useEffect(()=>{ if(!id) return; API.get(`/crackers/${id}`).then(r=>setCracker(r.data)).catch(e=>console.error(e)); }, [id]);


    const place = async () => {
        if(!address || !mobile) return alert('Provide address and mobile');
        try {
            const body = { crackersList: [{ cracker: id, qty }], customerAddress: address, customerMobileNo: mobile };
            await API.post('/orders', body);
            alert('Order placed');
            nav('/');
        } catch (err) { alert(err.response?.data?.msg || 'Failed to place order'); }
    };


    if(!cracker) return <div>Loading...</div>;
    return (
        <div className="card" style={{maxWidth:640}}>
            <h2>Order: {cracker.name}</h2>
            <p>Price: ₹{cracker.price}</p>
            <p>Available: {cracker.stock}</p>
            <div>
                <label>Quantity</label>
                <input type="number" min="1" max={cracker.stock} value={qty} onChange={e=>setQty(Number(e.target.value))} className="input" />
            </div>
            <input className="input" placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} />
            <input className="input" placeholder="Mobile number" value={mobile} onChange={e=>setMobile(e.target.value)} />
            <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={place}>Place Order</button>
                <button className="btn" onClick={()=>nav(-1)}>Cancel</button>
            </div>
        </div>
    );
}